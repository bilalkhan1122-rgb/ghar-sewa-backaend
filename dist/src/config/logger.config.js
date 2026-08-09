"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerConfig = void 0;
exports.loggerConfig = {
    pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                    singleLine: false,
                    messageFormat: '[{context}] {msg}',
                },
            }
            : undefined,
        customProps: (req) => {
            const request = req;
            return {
                correlationId: request.correlationId,
            };
        },
        customLogLevel: (_req, res, err) => {
            if (res.statusCode >= 500 || err) {
                return 'error';
            }
            if (res.statusCode >= 400) {
                return 'warn';
            }
            return 'info';
        },
        customSuccessMessage: (req, res) => {
            return `${req.method} ${req.url} - ${res.statusCode}`;
        },
        customErrorMessage: (req, res, err) => {
            return `${req.method} ${req.url} - ${res.statusCode} - ${err.message}`;
        },
        redact: {
            paths: [
                'req.headers.authorization',
                'req.headers.cookie',
                'req.body.password',
                'res.headers["set-cookie"]',
            ],
            censor: '[REDACTED]',
        },
        serializers: {
            req: (req) => ({
                id: req.id,
                method: req.method,
                url: req.url,
                query: req.query,
                params: req.params,
                headers: {
                    'user-agent': req.headers['user-agent'],
                    'content-type': req.headers['content-type'],
                },
                remoteAddress: req.remoteAddress,
                remotePort: req.remotePort,
            }),
            res: (res) => ({
                statusCode: res.statusCode,
                headers: {
                    'content-type': res.headers['content-type'],
                },
            }),
        },
        level: process.env.LOG_LEVEL || 'info',
        autoLogging: {
            ignore: (req) => req.url === '/health' || req.url === '/api/v1/health',
        },
    },
};
//# sourceMappingURL=logger.config.js.map