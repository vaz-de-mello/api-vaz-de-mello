import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest().user;
    return user;
})