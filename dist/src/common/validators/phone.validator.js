"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPakistaniPhoneConstraint = void 0;
exports.IsPakistaniPhone = IsPakistaniPhone;
const class_validator_1 = require("class-validator");
let IsPakistaniPhoneConstraint = class IsPakistaniPhoneConstraint {
    validate(value) {
        if (typeof value !== 'string')
            return false;
        const pakistaniPhoneRegex = /^(\+92|0|92)?3\d{9}$/;
        return pakistaniPhoneRegex.test(value.replace(/\s/g, ''));
    }
    defaultMessage(args) {
        return `${args.property} must be a valid Pakistani phone number (e.g., +923001234567 or 03001234567)`;
    }
};
exports.IsPakistaniPhoneConstraint = IsPakistaniPhoneConstraint;
exports.IsPakistaniPhoneConstraint = IsPakistaniPhoneConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsPakistaniPhoneConstraint);
function IsPakistaniPhone(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isPakistaniPhone',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: IsPakistaniPhoneConstraint,
        });
    };
}
//# sourceMappingURL=phone.validator.js.map