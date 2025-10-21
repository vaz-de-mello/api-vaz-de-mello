import { IsString, IsUUID, Length } from "class-validator";

export class CreateConversationDto {
    @IsString()
    @Length(1, 5000)
    texto: string;

    @IsUUID()
    precatorio_id: string;
}
