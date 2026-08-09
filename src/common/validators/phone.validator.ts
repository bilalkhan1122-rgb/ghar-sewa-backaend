import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPakistaniPhoneConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    if (typeof value !== 'string') return false;

    // Pakistani mobile formats:
    // +923001234567 (international)
    // 03001234567 (local)
    // 923001234567 (without +)
    const pakistaniPhoneRegex = /^(\+92|0|92)?3\d{9}$/;
    return pakistaniPhoneRegex.test(value.replace(/\s/g, ''));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid Pakistani phone number (e.g., +923001234567 or 03001234567)`;
  }
}

export function IsPakistaniPhone(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isPakistaniPhone',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsPakistaniPhoneConstraint,
    });
  };
}
