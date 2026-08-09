"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.isPublic = void 0;
const common_1 = require("@nestjs/common");
exports.isPublic = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.isPublic, true);
exports.Public = Public;
//# sourceMappingURL=public.decorator.js.map