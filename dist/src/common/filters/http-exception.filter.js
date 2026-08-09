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
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
let HttpExceptionFilter = class HttpExceptionFilter {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const correlationId = request['correlationId'];
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let code = 'INTERNAL_SERVER_ERROR';
        let details = undefined;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }
            else if (typeof exceptionResponse === 'object' &&
                exceptionResponse !== null) {
                const responseObj = exceptionResponse;
                const rawMessage = responseObj.message;
                if (typeof rawMessage === 'string') {
                    message = rawMessage;
                }
                else if (Array.isArray(rawMessage) && rawMessage.length > 0) {
                    message = 'Validation failed';
                    details = rawMessage;
                }
                if (details === undefined) {
                    details = responseObj.details;
                }
            }
            code = this.getErrorCode(status, message);
        }
        else if (exception instanceof Error) {
            message = exception.message;
            code = 'INTERNAL_SERVER_ERROR';
        }
        this.logger.error({
            correlationId,
            statusCode: status,
            errorCode: code,
            message,
            details,
            path: request.url,
            method: request.method,
            stack: exception instanceof Error ? exception.stack : undefined,
        }, `Error occurred: ${message}`);
        const errorResponse = {
            success: false,
            error: {
                message,
                code,
                ...(details !== undefined && { details }),
            },
            meta: {
                correlationId,
            },
        };
        response.status(status).json(errorResponse);
    }
    getErrorCode(status, message) {
        const messageCode = message
            .toUpperCase()
            .replace(/[^A-Z0-9]+/g, '_')
            .replace(/^_|_$/g, '');
        const statusCodeMap = {
            400: 'BAD_REQUEST',
            401: 'UNAUTHORIZED',
            403: 'FORBIDDEN',
            404: 'NOT_FOUND',
            409: 'CONFLICT',
            422: 'UNPROCESSABLE_ENTITY',
            500: 'INTERNAL_SERVER_ERROR',
        };
        if (messageCode && messageCode !== statusCodeMap[status]) {
            return messageCode;
        }
        return statusCodeMap[status] || 'INTERNAL_SERVER_ERROR';
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, common_1.Inject)(nestjs_pino_1.Logger)),
    __metadata("design:paramtypes", [nestjs_pino_1.Logger])
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map