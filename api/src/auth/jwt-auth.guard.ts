import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Role } from './rbac/role.enum';
import { ROLES_KEY } from './rbac/roles.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    if (await super.canActivate(context)) {
      const { user } = context.switchToHttp().getRequest();
      return requiredRoles.some((role) => user?.roles?.includes(role));
    }

    return false;
  }
}
