import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "isBefore", async: false })
class IsAfter implements ValidatorConstraintInterface {
    validate(propertyValue: string, args: ValidationArguments) {
        return propertyValue > args.object[args.constraints[0]];
    }

    defaultMessage(args: ValidationArguments) {
        return `"${args.property}" must be before "${args.constraints[0]}"`;
    }
}

export { IsAfter };
 