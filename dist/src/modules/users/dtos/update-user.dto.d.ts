import { UpdateProfileDto } from './update-profile.dto';
import { UserRole } from 'generated/prisma/enums';
export declare class UpdateUserDto extends UpdateProfileDto {
    role?: UserRole;
    isActive?: boolean;
}
