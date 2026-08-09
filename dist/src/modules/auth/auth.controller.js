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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const refresh_token_guard_1 = require("../../common/guards/refresh-token.guard");
const get_user_decorator_1 = require("../../common/decorators/get-user.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const customer_register_dto_1 = require("./dtos/customer-register.dto");
const provider_register_dto_1 = require("./dtos/provider-register.dto");
const login_dto_1 = require("./dtos/login.dto");
const throttler_1 = require("@nestjs/throttler");
const cookie_config_1 = require("../../common/constants/cookie.config");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async registerCustomer(dto, req, res) {
        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
        const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] ||
            req.ip ||
            'Unknown IP';
        const data = await this.authService.registerCustomer(dto, deviceInfo, ipAddress);
        res.cookie(cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.name, data.accessToken, cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.options);
        res.cookie(cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.name, data.refreshToken, cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.options);
        return {
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    }
    async registerProvider(dto, req, res) {
        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
        const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] ||
            req.ip ||
            'Unknown IP';
        const data = await this.authService.registerProvider(dto, deviceInfo, ipAddress);
        res.cookie(cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.name, data.accessToken, cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.options);
        res.cookie(cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.name, data.refreshToken, cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.options);
        return {
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    }
    async login(loginDto, req, res) {
        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
        const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] ||
            req.ip ||
            'Unknown IP';
        const data = await this.authService.login(loginDto, deviceInfo, ipAddress);
        res.cookie(cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.name, data.accessToken, cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.options);
        res.cookie(cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.name, data.refreshToken, cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.options);
        return {
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        };
    }
    async refreshToken(userId, req, res) {
        const rt = req.cookies['refreshToken'];
        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
        const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] ||
            req.ip ||
            'Unknown IP';
        const { accessToken, refreshToken } = await this.authService.refreshToken(userId, rt, deviceInfo, ipAddress);
        res.cookie(cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.name, accessToken, cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.options);
        res.cookie(cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.name, refreshToken, cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.options);
        return {
            message: 'Tokens refreshed successfully',
        };
    }
    async logout(userId, req, res) {
        const rt = req.cookies['refreshToken'];
        await this.authService.logout(userId, rt);
        res.clearCookie(cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.name, cookie_config_1.COOKIE_CONFIG.ACCESS_TOKEN.options);
        res.clearCookie(cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.name, cookie_config_1.COOKIE_CONFIG.REFRESH_TOKEN.options);
        return {
            message: 'Logged out successfully',
        };
    }
    async getMe(userId) {
        return this.authService.getMe(userId);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, throttler_1.Throttle)({ strict: { ttl: 60000, limit: 3 } }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/customer/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customer_register_dto_1.CustomerRegisterDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerCustomer", null);
__decorate([
    (0, throttler_1.Throttle)({ strict: { ttl: 60000, limit: 3 } }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/provider/register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_register_dto_1.ProviderRegisterDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerProvider", null);
__decorate([
    (0, throttler_1.Throttle)({ strict: { ttl: 60000, limit: 5 } }),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, throttler_1.Throttle)({ default: { ttl: 60000, limit: 10 } }),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.Post)('/refresh'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(refresh_token_guard_1.RefreshTokenGuard),
    (0, common_1.Post)('/logout'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, throttler_1.SkipThrottle)(),
    (0, common_1.Get)('/me'),
    __param(0, (0, get_user_decorator_1.GetUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map