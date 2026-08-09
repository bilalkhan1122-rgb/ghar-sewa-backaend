import { Injectable, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { put, del } from '@vercel/blob';

@Injectable()
export class FileUploadService {
  /**
   * Serverless filesystems are read-only and ephemeral, so uploads go to
   * Vercel Blob whenever a store is configured (BLOB_READ_WRITE_TOKEN is
   * injected automatically by Vercel). Without it — local development — files
   * are written to ./uploads and served from /uploads/ as before.
   */
  private readonly blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  private get usesBlobStorage(): boolean {
    return Boolean(this.blobToken);
  }

  private readonly uploadsDir: string;
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
  ];
  // Evidence & appeal files may be images, videos or documents (up to 10MB)
  private readonly maxEvidenceFileSize = 10 * 1024 * 1024; // 10MB
  private readonly allowedEvidenceMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime',
    'application/pdf',
  ];
  private dirsEnsured = false;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), 'uploads');
    if (!this.usesBlobStorage) {
      this.ensureUploadsDirSync();
    }
  }

  private ensureUploadsDirSync() {
    if (this.dirsEnsured) return;
    try {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, 'profiles'), { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, 'gallery'), { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, 'cnic'), { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, 'faces'), { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, 'chat'), { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, 'evidence'), { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, 'appeals'), { recursive: true });
      fs.mkdirSync(path.join(this.uploadsDir, 'topups'), { recursive: true });
      this.dirsEnsured = true;
    } catch {
      // Directories already exist
      this.dirsEnsured = true;
    }
  }

  validateFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    if (file.size > this.maxFileSize) {
      throw new BadRequestException(
        `File too large. Maximum size: ${this.maxFileSize / 1024 / 1024}MB`,
      );
    }
  }

  async uploadProfilePhoto(file: Express.Multer.File): Promise<string> {
    this.validateFile(file);
    return this.saveFile(file, 'profiles');
  }

  async uploadGalleryImage(file: Express.Multer.File): Promise<string> {
    this.validateFile(file);
    return this.saveFile(file, 'gallery');
  }

  async uploadFacePhoto(file: Express.Multer.File): Promise<string> {
    this.validateFile(file);
    return this.saveFile(file, 'faces');
  }

  async uploadCnicImage(file: Express.Multer.File): Promise<string> {
    this.validateFile(file);
    return this.saveFile(file, 'cnic');
  }

  async uploadChatImage(file: Express.Multer.File): Promise<string> {
    this.validateFile(file);
    return this.saveFile(file, 'chat');
  }

  /**
   * Validate a file against the evidence rules (images / videos / PDFs,
   * up to 10MB). Used for dispute evidence and appeal supporting files.
   */
  validateEvidenceFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!this.allowedEvidenceMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${this.allowedEvidenceMimeTypes.join(', ')}`,
      );
    }

    if (file.size > this.maxEvidenceFileSize) {
      throw new BadRequestException(
        `File too large. Maximum size: ${this.maxEvidenceFileSize / 1024 / 1024}MB`,
      );
    }
  }

  async uploadEvidenceFile(file: Express.Multer.File): Promise<string> {
    this.validateEvidenceFile(file);
    return this.saveFile(file, 'evidence');
  }

  async uploadAppealFile(file: Express.Multer.File): Promise<string> {
    this.validateEvidenceFile(file);
    return this.saveFile(file, 'appeals');
  }

  async uploadTopUpProof(file: Express.Multer.File): Promise<string> {
    this.validateEvidenceFile(file);
    return this.saveFile(file, 'topups');
  }

  /**
   * Returns an absolute URL when using blob storage, or a `/uploads/...` path
   * when writing locally. Both are stored as-is; the app resolves a relative
   * path against the API origin and passes an absolute URL straight through.
   */
  private async saveFile(
    file: Express.Multer.File,
    subDir: string,
  ): Promise<string> {
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `${randomUUID()}${ext}`;

    if (this.usesBlobStorage) {
      const blob = await put(`${subDir}/${filename}`, file.buffer, {
        access: 'public',
        contentType: file.mimetype,
        token: this.blobToken,
        // The filename is already a UUID; a second random suffix would only
        // make the stored path differ from the one we return.
        addRandomSuffix: false,
      });
      return blob.url;
    }

    const dir = path.join(this.uploadsDir, subDir);
    const filePath = path.join(dir, filename);

    await fsPromises.writeFile(filePath, file.buffer);

    return `/uploads/${subDir}/${filename}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    if (!fileUrl) return;

    if (/^https?:\/\//.test(fileUrl)) {
      try {
        await del(fileUrl, { token: this.blobToken });
      } catch {
        // Already gone, or stored before blob storage was configured — the
        // caller only cares that it is no longer referenced.
      }
      return;
    }

    if (!fileUrl.startsWith('/uploads/')) {
      return;
    }

    const relativePath = fileUrl.replace('/uploads/', '');
    const filePath = path.join(this.uploadsDir, relativePath);

    try {
      await fsPromises.unlink(filePath);
    } catch {
      // File doesn't exist - ignore
    }
  }

  async replaceFile(
    oldFileUrl: string | null,
    newFile: Express.Multer.File,
    subDir: string,
  ): Promise<string> {
    if (oldFileUrl) {
      await this.deleteFile(oldFileUrl);
    }
    return this.saveFile(newFile, subDir);
  }
}
