import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Role } from './rbac';
import { ROLES_KEY } from './rbac/roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context, status): any {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (
      !user &&
      requiredRoles &&
      requiredRoles.some((role) => role === Role.Guest)
    ) {
      return true;
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (await super.canActivate(context)) {
      const { user } = context.switchToHttp().getRequest();

      if (!requiredRoles) {
        return true;
      }
      if (requiredRoles.some((role) => role === Role.Guest)) {
        return true;
      }
      const hasRole = requiredRoles.some((role) => user?.roles?.includes(role));
      if (!hasRole) {
        throw new ForbiddenException();
      }
      return true;
    }

    return false;
  }
}
