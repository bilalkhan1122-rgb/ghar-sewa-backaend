import { ValidationOptions, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsPakistaniPhoneConstraint implements ValidatorConstraintInterface {
    validate(value: unknown): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsPakistaniPhone(validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
