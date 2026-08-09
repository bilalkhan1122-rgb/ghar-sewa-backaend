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
var PushDeliveryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushDeliveryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
let PushDeliveryService = PushDeliveryService_1 = class PushDeliveryService {
    config;
    logger = new common_1.Logger(PushDeliveryService_1.name);
    fcmInitialized = false;
    fcmAvailable = false;
    constructor(config) {
        this.config = config;
        this.initFcm();
    }
    initFcm() {
        if (this.fcmInitialized)
            return;
        this.fcmInitialized = true;
        try {
            const serviceAccountJson = this.config.get('FIREBASE_SERVICE_ACCOUNT');
            const credentialsPath = this.config.get('GOOGLE_APPLICATION_CREDENTIALS');
            if (serviceAccountJson) {
                const parsed = JSON.parse(serviceAccountJson);
                (0, app_1.initializeApp)({ credential: (0, app_1.cert)(parsed) });
                this.fcmAvailable = true;
            }
            else if (credentialsPath) {
                (0, app_1.initializeApp)({ credential: (0, app_1.cert)(credentialsPath) });
                this.fcmAvailable = true;
            }
            else {
                this.logger.warn('FCM not configured (FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS missing). ' +
                    'Push notifications will be logged as SENT without a real send.');
            }
        }
        catch (err) {
            this.logger.error(`FCM initialization failed: ${err.message}`, 'PushDeliveryService');
            this.fcmAvailable = false;
        }
    }
    async send(token, payload) {
        if (!this.fcmAvailable) {
            this.logger.log(`[PUSH-STUB] to ${token.slice(0, 12)}… : ${payload.title} — ${payload.body}`, 'PushDeliveryService');
            return { delivered: false, error: 'FCM not configured' };
        }
        try {
            const message = {
                token,
                notification: {
                    title: payload.title,
                    body: payload.body,
                },
                data: payload.data ?? {},
            };
            const response = await (0, messaging_1.getMessaging)().send(message);
            this.logger.log(`Push delivered to ${token.slice(0, 12)}… (${response})`, 'PushDeliveryService');
            return { delivered: true };
        }
        catch (err) {
            const error = err;
            if (error.code === 'messaging/registration-token-not-registered' ||
                error.code === 'messaging/invalid-registration-token') {
                this.logger.warn(`Stale device token removed: ${token.slice(0, 12)}…`, 'PushDeliveryService');
                return { delivered: false, error: 'DEVICE_UNREGISTERED' };
            }
            this.logger.error(`Push delivery failed: ${error.message ?? 'unknown error'}`, 'PushDeliveryService');
            return { delivered: false, error: error.message ?? 'PUSH_FAILED' };
        }
    }
};
exports.PushDeliveryService = PushDeliveryService;
exports.PushDeliveryService = PushDeliveryService = PushDeliveryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PushDeliveryService);
//# sourceMappingURL=push-delivery.service.js.map