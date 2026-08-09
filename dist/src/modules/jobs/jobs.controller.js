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
exports.AdminJobsController = exports.ProviderJobsController = exports.JobsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const jobs_service_1 = require("./jobs.service");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const action_reason_dto_1 = require("../../common/dtos/action-reason.dto");
const create_job_dto_1 = require("./dtos/create-job.dto");
const update_job_dto_1 = require("./dtos/update-job.dto");
const job_query_dto_1 = require("./dtos/job-query.dto");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("../../../generated/prisma/client");
let JobsController = class JobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async createJob(userId, dto) {
        return this.jobsService.createJob(userId, dto);
    }
    async listMyJobs(userId, query) {
        return this.jobsService.listMyJobs(userId, query);
    }
    async getJobById(userId, id) {
        return this.jobsService.getJobById(userId, id);
    }
    async updateJob(userId, id, dto) {
        return this.jobsService.updateJob(userId, id, dto);
    }
    async deleteJob(userId, id) {
        return this.jobsService.deleteJob(userId, id);
    }
    async cancelJob(userId, id) {
        return this.jobsService.cancelJob(userId, id);
    }
    async repostJob(userId, id) {
        return this.jobsService.repostJob(userId, id);
    }
    async uploadJobImage(userId, id, file) {
        return this.jobsService.uploadJobImage(userId, id, file);
    }
    async listJobImages(id) {
        return this.jobsService.listJobImages(id);
    }
    async deleteJobImage(userId, jobId, imageId) {
        return this.jobsService.deleteJobImage(userId, jobId, imageId);
    }
};
exports.JobsController = JobsController;
__decorate([
    (0, common_1.Post)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new job (customer only)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_job_dto_1.CreateJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'List own jobs with filters and pagination' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, job_query_dto_1.JobQueryDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "listMyJobs", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single job by ID' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "getJobById", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a job (only before acceptance)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_job_dto_1.UpdateJobDto]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a job (only before acceptance)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "deleteJob", null);
__decorate([
    (0, common_1.Post)('/:id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a pending job' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "cancelJob", null);
__decorate([
    (0, common_1.Post)('/:id/repost'),
    (0, swagger_1.ApiOperation)({ summary: 'Repost an expired job' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "repostJob", null);
__decorate([
    (0, common_1.Post)('/:id/images'),
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
    (0, swagger_1.ApiOperation)({ summary: 'Upload an image for a job' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: /(jpg|jpeg|png|webp|gif)$/ }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "uploadJobImage", null);
__decorate([
    (0, common_1.Get)('/:id/images'),
    (0, swagger_1.ApiOperation)({ summary: 'List all images for a job' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "listJobImages", null);
__decorate([
    (0, common_1.Delete)('/:jobId/images/:imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an image from a job' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('jobId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Param)('imageId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], JobsController.prototype, "deleteJobImage", null);
exports.JobsController = JobsController = __decorate([
    (0, swagger_1.ApiTags)('Jobs (Customer)'),
    (0, common_1.Controller)('jobs'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.CUSTOMER),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], JobsController);
let ProviderJobsController = class ProviderJobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async getJobFeed(userId, query) {
        return this.jobsService.getProviderJobFeed(userId, query);
    }
    async getJobById(userId, id) {
        return this.jobsService.getJobForProvider(userId, id);
    }
};
exports.ProviderJobsController = ProviderJobsController;
__decorate([
    (0, common_1.Get)('/feed'),
    (0, swagger_1.ApiOperation)({
        summary: 'View matching available jobs (approved providers only)',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, job_query_dto_1.JobQueryDto]),
    __metadata("design:returntype", Promise)
], ProviderJobsController.prototype, "getJobFeed", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View a single job from the feed' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProviderJobsController.prototype, "getJobById", null);
exports.ProviderJobsController = ProviderJobsController = __decorate([
    (0, swagger_1.ApiTags)('Jobs (Provider)'),
    (0, common_1.Controller)('provider/jobs'),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], ProviderJobsController);
let AdminJobsController = class AdminJobsController {
    jobsService;
    constructor(jobsService) {
        this.jobsService = jobsService;
    }
    async listAllJobs(query) {
        return this.jobsService.adminListJobs(query);
    }
    async getJobStats() {
        return this.jobsService.getJobStats();
    }
    async getJobDetail(id) {
        return this.jobsService.adminGetJobDetail(id);
    }
    async getJobTimeline(id) {
        return this.jobsService.adminGetJobTimeline(id);
    }
    async cancelJob(adminId, id, dto) {
        return this.jobsService.adminCancelJob(adminId, id, dto.reason);
    }
    async forceCloseJob(adminId, id, dto) {
        return this.jobsService.adminForceCloseJob(adminId, id, dto.reason);
    }
    async expireOverdueJobs() {
        const count = await this.jobsService.expireOverdueJobs();
        return { message: `Expired ${count} overdue jobs` };
    }
};
exports.AdminJobsController = AdminJobsController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'List all jobs with search/filters (admin)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_query_dto_1.JobQueryDto]),
    __metadata("design:returntype", Promise)
], AdminJobsController.prototype, "listAllJobs", null);
__decorate([
    (0, common_1.Get)('/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get job statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminJobsController.prototype, "getJobStats", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'View full job details (bids, bookings, timeline)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminJobsController.prototype, "getJobDetail", null);
__decorate([
    (0, common_1.Get)('/:id/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'View a job timeline' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminJobsController.prototype, "getJobTimeline", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('jobs.cancel'),
    (0, permissions_decorator_1.Permissions)('jobs.cancel'),
    (0, common_1.Post)('/:id/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a pending job (reason required)' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, action_reason_dto_1.ActionReasonDto]),
    __metadata("design:returntype", Promise)
], AdminJobsController.prototype, "cancelJob", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('jobs.cancel'),
    (0, common_1.Post)('/:id/force-close'),
    (0, swagger_1.ApiOperation)({ summary: 'Force close a job in any non-terminal state' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, action_reason_dto_1.ActionReasonDto]),
    __metadata("design:returntype", Promise)
], AdminJobsController.prototype, "forceCloseJob", null);
__decorate([
    (0, common_1.Post)('/expire-overdue'),
    (0, swagger_1.ApiOperation)({ summary: 'Manually trigger expiration of overdue jobs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminJobsController.prototype, "expireOverdueJobs", null);
exports.AdminJobsController = AdminJobsController = __decorate([
    (0, swagger_1.ApiTags)('Jobs (Admin)'),
    (0, common_1.Controller)('admin/jobs'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [jobs_service_1.JobsService])
], AdminJobsController);
//# sourceMappingURL=jobs.controller.js.map