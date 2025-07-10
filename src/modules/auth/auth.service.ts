import {
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { SignInDto, SignUpDto, RegisterDto } from './dto';

import { UserEntity } from '../users/entities';
import { ProfileType, UserStatus } from 'src/shared/enum';

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

        if (!user) throw new UnauthorizedException('Login ou senha inválidos.');
        if (user.status !== 1) throw new UnauthorizedException('Usuário não está ativo.');

        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid) throw new UnauthorizedException('Login ou senha inválidos.');

        return this.generateJwtToken(user);
    }

    async activate(signUpDto: SignUpDto) {
        const hashedPassword = await bcrypt.hash(signUpDto.senha, 10);
        signUpDto.senha = hashedPassword;

        try {
            const user = await this.usersService.update({
                where: { login: signUpDto.login },
                data: { senha: hashedPassword, status: UserStatus.ACTIVE },
                omit: { senha: true },
            });

            return this.generateJwtToken(user);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao ativar usuário.', error);
        }
    }

    async validateEmail(token: string) {
        if (!token) throw new UnauthorizedException('Token de validação não fornecido.');

        try {
            const user = await this.usersService.findFirst({
                where: { email_token: token },
            });
            if (!user) throw new UnauthorizedException('Token de validação inválido ou expirado.');

            const isTokenValid = await this.jwtService.verifyAsync(token);
            if (!isTokenValid) throw new UnauthorizedException('Token de validação inválido ou expirado.');

            await this.usersService.update({
                where: { id: user.id },
                data: { status: UserStatus.ACTIVE, email_token: null, email_verificado: true },
            });

            return this.generateJwtToken(user);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao validar email.', error);
        }
    }

    async register(registerDto: RegisterDto) {
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
                status: 2, // 1: Ativo, 0: Inativo, 2: Aguardando
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
        return { accessToken };
    }
}
