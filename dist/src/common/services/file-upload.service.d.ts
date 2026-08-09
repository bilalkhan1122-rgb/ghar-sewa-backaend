export declare class FileUploadService {
    private readonly uploadsDir;
    private readonly maxFileSize;
    private readonly allowedMimeTypes;
    private readonly maxEvidenceFileSize;
    private readonly allowedEvidenceMimeTypes;
    private dirsEnsured;
    constructor();
    private ensureUploadsDirSync;
    validateFile(file: Express.Multer.File): void;
    uploadProfilePhoto(file: Express.Multer.File): Promise<string>;
    uploadGalleryImage(file: Express.Multer.File): Promise<string>;
    uploadFacePhoto(file: Express.Multer.File): Promise<string>;
    uploadCnicImage(file: Express.Multer.File): Promise<string>;
    uploadChatImage(file: Express.Multer.File): Promise<string>;
    validateEvidenceFile(file: Express.Multer.File): void;
    uploadEvidenceFile(file: Express.Multer.File): Promise<string>;
    uploadAppealFile(file: Express.Multer.File): Promise<string>;
    uploadTopUpProof(file: Express.Multer.File): Promise<string>;
    private saveFile;
    deleteFile(fileUrl: string): Promise<void>;
    replaceFile(oldFileUrl: string | null, newFile: Express.Multer.File, subDir: string): Promise<string>;
}
