import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { ProfileType, UserStatus } from 'src/shared/enum';

import {
    SignInDto,
    RegisterIndividualDto,
    ActivateDto,
} from './dto';

import { UserEntity } from '../users/entities';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async signIn({ login, senha }: SignInDto) {
        const user = await this.usersService.findUnique({
            where: { login },
        });

        if (!user) throw new UnauthorizedException({
            message: 'Login ou senha inválidos.',
            success: false,
            statusCode: 401,
            error: 'Unauthorized',
        });

        if (user.status === 0) throw new UnauthorizedException({
            message: 'Usuário não está ativo.',
            success: false,
            statusCode: 401,
            error: 'Unauthorized',
        })

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) throw new UnauthorizedException({
            message: 'Login ou senha inválidos.',
            success: false,
            statusCode: 401,
            error: 'Unauthorized',
        });

        if (user.status === 2) return ({
            accessToken: null,
            message: 'Por favor, crie uma senha para ativar seu usuário.',
        })

        return this.generateJwtToken(user);
    }

    async activate(signUpDto: ActivateDto) {
        const hashedPassword = await bcrypt.hash(signUpDto.novaSenha, 10);
        signUpDto.senha = hashedPassword;

        try {
            const user = await this.usersService.update({
                where: { login: signUpDto.login },
                data: { senha: hashedPassword, status: UserStatus.ACTIVE },
                omit: { senha: true },
            });

            return this.generateJwtToken(user);
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Erro ao ativar usuário.',
                success: false,
                statusCode: 500,
                error: 'InternalServerError',
            }, error);
        }
    }

    async validateEmail(token: string) {
        if (!token) throw new UnauthorizedException({
            message: 'Token de validação não fornecido.',
            success: false,
            statusCode: 401,
            error: 'Unauthorized',
        });

        try {
            const user = await this.usersService.findFirst({
                where: { email_token: token },
            });
            if (!user) throw new UnauthorizedException({
                message: 'Token de validação inválido ou expirado.',
                success: false,
                statusCode: 401,
                error: 'Unauthorized',
            });

            const isTokenValid = await this.jwtService.verifyAsync(token);
            if (!isTokenValid) throw new UnauthorizedException({
                message: 'Token de validação inválido ou expirado.',
                success: false,
                statusCode: 401,
                error: 'Unauthorized',
            });

            await this.usersService.update({
                where: { id: user.id },
                data: { status: UserStatus.ACTIVE, email_token: null, email_verificado: true },
            });

            return this.generateJwtToken(user);
        } catch (error) {
            throw new InternalServerErrorException({
                message: 'Erro ao validar email.',
                success: false,
                statusCode: 500,
                error: 'InternalServerError',
            }, error);
        }
    }

    async registerIndividual(registerDto: RegisterIndividualDto) {
        const token = await this.jwtService.signAsync({ email: registerDto.email }, { expiresIn: '1h' });

        const now = new Date();
        const oneHour = 60 * 60 * 1000;
        const newTime = new Date(now.getTime() + oneHour);

        const newTimeString = newTime.toLocaleString('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false,
        });

        const hashedPassword = await bcrypt.hash(registerDto.senha, 10);
        registerDto.senha = hashedPassword;

        const user = await this.usersService.create({
            data: {
                ...registerDto,
                status: 1, // 1: Ativo, 0: Inativo, 2: Aguardando
                senha: registerDto.senha,
                escritorio_id: null,
                email_verificado: false,
                email_token: token,
                tipo_perfil_id: ProfileType.CLIENTE_INDIVIDUAL,
            },
            omit: { senha: true },
        });

        return { user, token, newTimeString };
    }

    private async generateJwtToken(user: UserEntity) {
        delete user.senha;
        const payload = { sub: user.id, ...user };

        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME,
        });
        return { accessToken, message: null };
    }
}
