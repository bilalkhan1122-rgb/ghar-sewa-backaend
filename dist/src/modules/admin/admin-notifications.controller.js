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
exports.AdminNotificationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_notifications_service_1 = require("./admin-notifications.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const client_1 = require("../../../generated/prisma/client");
const send_notification_dto_1 = require("./dtos/send-notification.dto");
let AdminNotificationsController = class AdminNotificationsController {
    adminNotificationsService;
    constructor(adminNotificationsService) {
        this.adminNotificationsService = adminNotificationsService;
    }
    async sendToUser(adminId, dto) {
        return this.adminNotificationsService.sendToUser(adminId, dto);
    }
    async sendToRole(adminId, dto) {
        return this.adminNotificationsService.sendToRole(adminId, dto);
    }
    async broadcast(adminId, dto) {
        return this.adminNotificationsService.broadcast(adminId, dto);
    }
};
exports.AdminNotificationsController = AdminNotificationsController;
__decorate([
    (0, permissions_decorator_1.Permissions)('notifications.send'),
    (0, common_1.Post)('/send'),
    (0, swagger_1.ApiOperation)({ summary: 'Send a notification to a single user' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, send_notification_dto_1.SendUserNotificationDto]),
    __metadata("design:returntype", Promise)
], AdminNotificationsController.prototype, "sendToUser", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('notifications.send'),
    (0, common_1.Post)('/send/role'),
    (0, swagger_1.ApiOperation)({
        summary: 'Send a notification to all customers or providers',
    }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, send_notification_dto_1.SendRoleNotificationDto]),
    __metadata("design:returntype", Promise)
], AdminNotificationsController.prototype, "sendToRole", null);
__decorate([
    (0, permissions_decorator_1.Permissions)('notifications.broadcast'),
    (0, common_1.Post)('/broadcast'),
    (0, swagger_1.ApiOperation)({ summary: 'Broadcast a notification to every active user' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, send_notification_dto_1.SendBroadcastNotificationDto]),
    __metadata("design:returntype", Promise)
], AdminNotificationsController.prototype, "broadcast", null);
exports.AdminNotificationsController = AdminNotificationsController = __decorate([
    (0, swagger_1.ApiTags)('Admin Notifications'),
    (0, common_1.Controller)('admin/notifications'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [admin_notifications_service_1.AdminNotificationsService])
], AdminNotificationsController);
//# sourceMappingURL=admin-notifications.controller.js.map