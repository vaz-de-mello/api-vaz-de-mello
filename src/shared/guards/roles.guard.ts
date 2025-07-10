import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ProfileType } from "../enum";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { UserEntity } from "src/modules/users/entities";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<ProfileType[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredRoles) return true; // If no roles are required, allow access

        const req = context.switchToHttp().getRequest();
        const user = req.user as UserEntity;

        return requiredRoles.some(role =>
            user.tipo_perfil_id === ProfileType.ADMIN ||
            user?.tipo_perfil_id === role
        );
    }
}