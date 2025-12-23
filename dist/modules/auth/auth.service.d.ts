import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto, RegisterIndividualDto, ActivateDto } from './dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn({ login, senha }: SignInDto): Promise<{
        accessToken: string;
        message: any;
    }>;
    activate(signUpDto: ActivateDto): Promise<{
        accessToken: string;
        message: any;
    }>;
    validateEmail(token: string): Promise<{
        accessToken: string;
        message: any;
    }>;
    registerIndividual(registerDto: RegisterIndividualDto): Promise<{
        user: {
            senha: string;
            login: string;
            id: string;
            nome: string;
            email: string;
            cpf: string;
            data_nascimento: Date;
            escritorio_id: string;
            tipo_perfil_id: number;
            createdAt: Date;
            updatedAt: Date;
            email_verificado: boolean;
            email_token: string;
            status: number;
        };
        token: string;
        newTimeString: string;
    }>;
    private generateJwtToken;
}
