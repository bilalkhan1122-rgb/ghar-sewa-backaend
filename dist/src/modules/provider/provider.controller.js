"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicProviderController = exports.ProviderController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const provider_service_1 = require("./provider.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const complete_provider_profile_dto_1 = require("./dtos/complete-provider-profile.dto");
const update_provider_profile_dto_1 = require("./dtos/update-provider-profile.dto");
let ProviderController = class ProviderController {
    providerService;
    constructor(providerService) {
        this.providerService = providerService;
    }
    async completeProfile(userId, dto) {
        return this.providerService.completeProfile(userId, dto);
    }
    async getProfile(userId) {
        return this.providerService.getProviderProfile(userId);
    }
    async updateProfile(userId, dto) {
        return this.providerService.updateProviderProfile(userId, dto);
    }
    async getCompletionProgress(userId) {
        return this.providerService.getCompletionProgress(userId);
    }
    async uploadFacePhoto(userId, file) {
        return this.providerService.uploadFacePhoto(userId, file);
    }
    async uploadCnicFront(userId, file) {
        return this.providerService.uploadCnicFront(userId, file);
    }
    async uploadCnicBack(userId, file) {
        return this.providerService.uploadCnicBack(userId, file);
    }
    async submitForVerification(userId) {
        return this.providerService.submitForVerification(userId);
    }
    async addGalleryImage(userId, file) {
        return this.providerService.addGalleryImage(userId, file);
    }
    async removeGalleryImage(userId, imageId) {
        return this.providerService.removeGalleryImage(userId, imageId);
    }
    async listGalleryImages(userId) {
        return this.providerService.listGalleryImages(userId);
    }
    async getDashboardSummary(userId) {
        return this.providerService.getDashboardSummary(userId);
    }
    async uploadProfilePhoto(userId, file) {
        return this.providerService.uploadProfilePhoto(userId, file);
    }
};
exports.ProviderController = ProviderController;
__decorate([
    (0, common_1.Post)('/profile/complete'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, complete_provider_profile_dto_1.CompleteProviderProfileDto]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "completeProfile", null);
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('/profile'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_provider_profile_dto_1.UpdateProviderProfileDto]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('/profile/completion'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getCompletionProgress", null);
__decorate([
    (0, common_1.Post)('/upload/face-photo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "uploadFacePhoto", null);
__decorate([
    (0, common_1.Post)('/upload/cnic-front'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "uploadCnicFront", null);
__decorate([
    (0, common_1.Post)('/upload/cnic-back'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "uploadCnicBack", null);
__decorate([
    (0, common_1.Post)('/profile/submit-verification'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "submitForVerification", null);
__decorate([
    (0, common_1.Post)('/gallery'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "addGalleryImage", null);
__decorate([
    (0, common_1.Delete)('/gallery/:imageId'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "removeGalleryImage", null);
__decorate([
    (0, common_1.Get)('/gallery'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "listGalleryImages", null);
__decorate([
    (0, common_1.Get)('/dashboard'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getDashboardSummary", null);
__decorate([
    (0, common_1.Post)('/upload/profile-photo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "uploadProfilePhoto", null);
exports.ProviderController = ProviderController = __decorate([
    (0, swagger_1.ApiTags)('Provider'),
    (0, common_1.Controller)('provider'),
    __metadata("design:paramtypes", [provider_service_1.ProviderService])
], ProviderController);
let PublicProviderController = class PublicProviderController {
    providerService;
    constructor(providerService) {
        this.providerService = providerService;
    }
    async getPublicProfile(id) {
        return this.providerService.getPublicProfile(id);
    }
};
exports.PublicProviderController = PublicProviderController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('/provider/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicProviderController.prototype, "getPublicProfile", null);
exports.PublicProviderController = PublicProviderController = __decorate([
    (0, swagger_1.ApiTags)('Provider (Public)'),
    (0, common_1.Controller)('public'),
    __metadata("design:paramtypes", [provider_service_1.ProviderService])
], PublicProviderController);
//# sourceMappingURL=provider.controller.js.map