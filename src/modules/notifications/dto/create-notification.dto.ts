import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNotificationDto {
    @IsUUID(undefined, { message: '`usuario_id` deve ser um UUID válido.' })
    usuario_id: string;

    @IsString({ message: '`mensagem` deve ser uma string.' })
    mensagem: string;

    @IsString({ message: '`goTo` deve ser uma string.' })
    @IsOptional()
    goTo?: string;
}
