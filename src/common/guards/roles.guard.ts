import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "generated/prisma/enums";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { tokenRoles } from "../roles";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      user?: { role?: UserRole; roles?: UserRole[] };
    }>();
    const { user } = request;
    if (!user) {
      throw new UnauthorizedException("User not found in request");
    }

    // Asked of what the account *may* do, not the mode it is currently in.
    // A dual-role user switching sides keeps their existing access token for
    // up to its lifetime, and guarding on the active mode would reject their
    // first few requests on the other side.
    const held = tokenRoles(user);
    if (!requiredRoles.some((role) => held.includes(role))) {
      throw new ForbiddenException("Insufficient role to access this resource");
    }

    return true;
  }
}
