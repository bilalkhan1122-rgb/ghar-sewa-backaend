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
exports.PreferencesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notifications_service_1 = require("./notifications.service");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const update_notification_preferences_dto_1 = require("./dtos/update-notification-preferences.dto");
let PreferencesController = class PreferencesController {
    notificationsService;
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async getPreferences(userId) {
        return this.notificationsService.getPreferences(userId);
    }
    async updatePreferences(userId, dto) {
        return this.notificationsService.updatePreferences(userId, dto);
    }
};
exports.PreferencesController = PreferencesController;
__decorate([
    (0, common_1.Get)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my notification preferences' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "getPreferences", null);
__decorate([
    (0, common_1.Patch)('/'),
    (0, swagger_1.ApiOperation)({ summary: 'Update my notification preferences' }),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_notification_preferences_dto_1.UpdateNotificationPreferencesDto]),
    __metadata("design:returntype", Promise)
], PreferencesController.prototype, "updatePreferences", null);
exports.PreferencesController = PreferencesController = __decorate([
    (0, swagger_1.ApiTags)('Notifications (Preferences)'),
    (0, common_1.Controller)('notifications/preferences'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], PreferencesController);
//# sourceMappingURL=preferences.controller.js.map