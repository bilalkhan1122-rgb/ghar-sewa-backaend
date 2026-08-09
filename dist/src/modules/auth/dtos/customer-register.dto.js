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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRegisterDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const password_validator_1 = require("../../../common/validators/password.validator");
const phone_validator_1 = require("../../../common/validators/phone.validator");
class CustomerRegisterDto {
    fullName;
    phone;
    email;
    password;
    cityId;
    address;
    acceptTerms;
}
exports.CustomerRegisterDto = CustomerRegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Full name of the customer',
        example: 'John Doe',
        minLength: 2,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CustomerRegisterDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pakistani mobile number',
        example: '+923001234567',
    }),
    (0, class_validator_1.IsString)(),
    (0, phone_validator_1.IsPakistaniPhone)(),
    __metadata("design:type", String)
], CustomerRegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address',
        example: 'customer@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CustomerRegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Strong password (min 8 chars, uppercase, lowercase, number, special char)',
        example: 'Customer@123',
        minLength: 8,
    }),
    (0, class_validator_1.IsString)(),
    (0, password_validator_1.IsStrongPassword)(),
    __metadata("design:type", String)
], CustomerRegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the city',
        example: 'city-lahore',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], CustomerRegisterDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Street address',
        example: '123 Main Street, Lahore',
        minLength: 3,
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CustomerRegisterDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Must accept terms and conditions',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.Equals)(true, { message: 'You must accept the terms and conditions' }),
    __metadata("design:type", Boolean)
], CustomerRegisterDto.prototype, "acceptTerms", void 0);
//# sourceMappingURL=customer-register.dto.js.map