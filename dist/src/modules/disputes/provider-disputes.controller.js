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
exports.ProviderDisputesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const disputes_service_1 = require("./disputes.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const dispute_query_dto_1 = require("./dtos/dispute-query.dto");
const respond_dispute_dto_1 = require("./dtos/respond-dispute.dto");
let ProviderDisputesController = class ProviderDisputesController {
    disputesService;
    constructor(disputesService) {
        this.disputesService = disputesService;
    }
    async list(userId, query) {
        return this.disputesService.listMyDisputes(userId, query);
    }
    async get(userId, id) {
        return this.disputesService.getDispute(userId, id);
    }
    async getHistory(userId, id) {
        return this.disputesService.getDisputeHistory(userId, id);
    }
    async uploadEvidence(userId, id, file) {
        return this.disputesService.uploadEvidence(userId, id, file);
    }
    async respond(userId, id, dto) {
        return this.disputesService.respond(userId, id, dto);
    }
};
exports.ProviderDisputesController = ProviderDisputesController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'View disputes I am involved in (paginated)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dispute_query_dto_1.DisputeQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderDisputesController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a dispute' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderDisputesController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('/:id/history'),
    (0, swagger_1.ApiOperation)({ summary: 'View the dispute timeline' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderDisputesController.prototype, "getHistory", null);
__decorate([
    (0, common_1.Post)('/:id/evidence'),
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
    (0, swagger_1.ApiOperation)({
        summary: 'Upload dispute evidence (images/videos/PDF, max 10MB)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp|gif|mp4|webm|mov|pdf)$/,
            }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProviderDisputesController.prototype, "uploadEvidence", null);
__decorate([
    (0, common_1.Post)('/:id/response'),
    (0, swagger_1.ApiOperation)({ summary: 'Respond with an explanation' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, respond_dispute_dto_1.RespondDisputeDto]),
    __metadata("design:returntype", Promise)
], ProviderDisputesController.prototype, "respond", null);
exports.ProviderDisputesController = ProviderDisputesController = __decorate([
    (0, swagger_1.ApiTags)('Disputes (Provider)'),
    (0, common_1.Controller)('provider/disputes'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.PROVIDER),
    __metadata("design:paramtypes", [disputes_service_1.DisputesService])
], ProviderDisputesController);
//# sourceMappingURL=provider-disputes.controller.js.map