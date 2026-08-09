"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const fsPromises = __importStar(require("fs/promises"));
let FileUploadService = class FileUploadService {
    uploadsDir;
    maxFileSize = 5 * 1024 * 1024;
    allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
    ];
    maxEvidenceFileSize = 10 * 1024 * 1024;
    allowedEvidenceMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'application/pdf',
    ];
    dirsEnsured = false;
    constructor() {
        this.uploadsDir = path.join(process.cwd(), 'uploads');
        this.ensureUploadsDirSync();
    }
    ensureUploadsDirSync() {
        if (this.dirsEnsured)
            return;
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
        }
        catch {
            this.dirsEnsured = true;
        }
    }
    validateFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Invalid file type. Allowed types: ${this.allowedMimeTypes.join(', ')}`);
        }
        if (file.size > this.maxFileSize) {
            throw new common_1.BadRequestException(`File too large. Maximum size: ${this.maxFileSize / 1024 / 1024}MB`);
        }
    }
    async uploadProfilePhoto(file) {
        this.validateFile(file);
        return this.saveFile(file, 'profiles');
    }
    async uploadGalleryImage(file) {
        this.validateFile(file);
        return this.saveFile(file, 'gallery');
    }
    async uploadFacePhoto(file) {
        this.validateFile(file);
        return this.saveFile(file, 'faces');
    }
    async uploadCnicImage(file) {
        this.validateFile(file);
        return this.saveFile(file, 'cnic');
    }
    async uploadChatImage(file) {
        this.validateFile(file);
        return this.saveFile(file, 'chat');
    }
    validateEvidenceFile(file) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        if (!this.allowedEvidenceMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Invalid file type. Allowed types: ${this.allowedEvidenceMimeTypes.join(', ')}`);
        }
        if (file.size > this.maxEvidenceFileSize) {
            throw new common_1.BadRequestException(`File too large. Maximum size: ${this.maxEvidenceFileSize / 1024 / 1024}MB`);
        }
    }
    async uploadEvidenceFile(file) {
        this.validateEvidenceFile(file);
        return this.saveFile(file, 'evidence');
    }
    async uploadAppealFile(file) {
        this.validateEvidenceFile(file);
        return this.saveFile(file, 'appeals');
    }
    async uploadTopUpProof(file) {
        this.validateEvidenceFile(file);
        return this.saveFile(file, 'topups');
    }
    async saveFile(file, subDir) {
        const ext = path.extname(file.originalname) || '.jpg';
        const filename = `${(0, crypto_1.randomUUID)()}${ext}`;
        const dir = path.join(this.uploadsDir, subDir);
        const filePath = path.join(dir, filename);
        await fsPromises.writeFile(filePath, file.buffer);
        return `/uploads/${subDir}/${filename}`;
    }
    async deleteFile(fileUrl) {
        if (!fileUrl || !fileUrl.startsWith('/uploads/')) {
            return;
        }
        const relativePath = fileUrl.replace('/uploads/', '');
        const filePath = path.join(this.uploadsDir, relativePath);
        try {
            await fsPromises.unlink(filePath);
        }
        catch {
        }
    }
    async replaceFile(oldFileUrl, newFile, subDir) {
        if (oldFileUrl) {
            await this.deleteFile(oldFileUrl);
        }
        return this.saveFile(newFile, subDir);
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map