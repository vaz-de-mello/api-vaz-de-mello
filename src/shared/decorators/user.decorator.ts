import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserWithoutPassword } from "src/modules/users/entities";

export const User = createParamDecorator((_, ctx: ExecutionContext): UserWithoutPassword => {
    const user = ctx.switchToHttp().getRequest().user;
    return user as UserWithoutPassword;
})