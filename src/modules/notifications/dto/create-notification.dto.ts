import { IsString, IsUUID } from "class-validator";

export class CreateNotificationDto {
    @IsUUID(undefined, { message: '`usuario_id` deve ser um UUID válido.' })
    usuario_id: string;

    @IsString({ message: '`mensagem` deve ser uma string.' })
    mensagem: string;
}
