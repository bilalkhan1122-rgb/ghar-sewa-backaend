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
exports.ProviderPenaltiesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const penalties_service_1 = require("./penalties.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
const create_appeal_dto_1 = require("./dtos/create-appeal.dto");
const penalty_query_dto_1 = require("./dtos/penalty-query.dto");
let ProviderPenaltiesController = class ProviderPenaltiesController {
    penaltiesService;
    constructor(penaltiesService) {
        this.penaltiesService = penaltiesService;
    }
    async listPenalties(userId, query) {
        return this.penaltiesService.listProviderPenalties(userId, query);
    }
    async getActivePenalties(userId) {
        return this.penaltiesService.getActivePenalties(userId);
    }
    async listCancellations(userId, query) {
        return this.penaltiesService.listProviderCancellations(userId, query);
    }
    async createAppeal(userId, dto, file) {
        return this.penaltiesService.createAppeal(userId, dto, file);
    }
    async listAppeals(userId, query) {
        return this.penaltiesService.listMyAppeals(userId, query);
    }
    async getAppeal(userId, id) {
        return this.penaltiesService.getMyAppeal(userId, id);
    }
};
exports.ProviderPenaltiesController = ProviderPenaltiesController;
__decorate([
    (0, common_1.Get)('/penalties'),
    (0, swagger_1.ApiOperation)({
        summary: 'View my penalty history (warnings, suspensions, bans)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, penalty_query_dto_1.PenaltyQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderPenaltiesController.prototype, "listPenalties", null);
__decorate([
    (0, common_1.Get)('/penalties/active'),
    (0, swagger_1.ApiOperation)({ summary: 'View my active penalties' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProviderPenaltiesController.prototype, "getActivePenalties", null);
__decorate([
    (0, common_1.Get)('/cancellations'),
    (0, swagger_1.ApiOperation)({ summary: 'View my previous cancellations' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, penalty_query_dto_1.PenaltyQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderPenaltiesController.prototype, "listCancellations", null);
__decorate([
    (0, common_1.Post)('/penalties/appeals'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.memoryStorage)() })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                penaltyId: { type: 'string', format: 'uuid' },
                explanation: { type: 'string' },
                file: { type: 'string', format: 'binary' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Submit an appeal against a penalty (optional file)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp|gif|mp4|webm|mov|pdf)$/,
            }),
        ],
        fileIsRequired: false,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_appeal_dto_1.CreateAppealDto, Object]),
    __metadata("design:returntype", Promise)
], ProviderPenaltiesController.prototype, "createAppeal", null);
__decorate([
    (0, common_1.Get)('/penalties/appeals'),
    (0, swagger_1.ApiOperation)({ summary: 'View my appeals' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, penalty_query_dto_1.AppealQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderPenaltiesController.prototype, "listAppeals", null);
__decorate([
    (0, common_1.Get)('/penalties/appeals/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a single appeal of mine' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderPenaltiesController.prototype, "getAppeal", null);
exports.ProviderPenaltiesController = ProviderPenaltiesController = __decorate([
    (0, swagger_1.ApiTags)('Penalties (Provider)'),
    (0, common_1.Controller)('provider'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.PROVIDER),
    __metadata("design:paramtypes", [penalties_service_1.PenaltiesService])
], ProviderPenaltiesController);
//# sourceMappingURL=provider-penalties.controller.js.map