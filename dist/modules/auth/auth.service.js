"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const enum_1 = require("../../shared/enum");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signIn({ login, senha }) {
        const user = await this.usersService.findUnique({
            where: { login },
        });
        if (!user)
            throw new common_1.UnauthorizedException({
                message: 'Login ou senha inválidos.',
                success: false,
                statusCode: 401,
                error: 'Unauthorized',
            });
        if (user.status === 0)
            throw new common_1.UnauthorizedException({
                message: 'Usuário não está ativo.',
                success: false,
                statusCode: 401,
                error: 'Unauthorized',
            });
        const isPasswordValid = await bcrypt.compare(senha, user.senha);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException({
                message: 'Login ou senha inválidos.',
                success: false,
                statusCode: 401,
                error: 'Unauthorized',
            });
        if (user.status === 2)
            return ({
                accessToken: null,
                message: 'Por favor, crie uma senha para ativar seu usuário.',
            });
        return this.generateJwtToken(user);
    }
    async activate(signUpDto) {
        const hashedPassword = await bcrypt.hash(signUpDto.novaSenha, 10);
        signUpDto.senha = hashedPassword;
        try {
            const user = await this.usersService.update({
                where: { login: signUpDto.login },
                data: { senha: hashedPassword, status: enum_1.UserStatus.ACTIVE },
                omit: { senha: true },
            });
            return this.generateJwtToken(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                message: 'Erro ao ativar usuário.',
                success: false,
                statusCode: 500,
                error: 'InternalServerError',
            }, error);
        }
    }
    async validateEmail(token) {
        if (!token)
            throw new common_1.UnauthorizedException({
                message: 'Token de validação não fornecido.',
                success: false,
                statusCode: 401,
                error: 'Unauthorized',
            });
        try {
            const user = await this.usersService.findFirst({
                where: { email_token: token },
            });
            if (!user)
                throw new common_1.UnauthorizedException({
                    message: 'Token de validação inválido ou expirado.',
                    success: false,
                    statusCode: 401,
                    error: 'Unauthorized',
                });
            const isTokenValid = await this.jwtService.verifyAsync(token);
            if (!isTokenValid)
                throw new common_1.UnauthorizedException({
                    message: 'Token de validação inválido ou expirado.',
                    success: false,
                    statusCode: 401,
                    error: 'Unauthorized',
                });
            await this.usersService.update({
                where: { id: user.id },
                data: { status: enum_1.UserStatus.ACTIVE, email_token: null, email_verificado: true },
            });
            return this.generateJwtToken(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException({
                message: 'Erro ao validar email.',
                success: false,
                statusCode: 500,
                error: 'InternalServerError',
            }, error);
        }
    }
    async registerIndividual(registerDto) {
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
            data: Object.assign(Object.assign({}, registerDto), { status: 1, senha: registerDto.senha, escritorio_id: null, email_verificado: false, email_token: token, tipo_perfil_id: enum_1.ProfileType.CLIENTE_INDIVIDUAL }),
            omit: { senha: true },
        });
        return { user, token, newTimeString };
    }
    async generateJwtToken(user) {
        delete user.senha;
        const payload = Object.assign({ sub: user.id }, user);
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME,
        });
        return { accessToken, message: null };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map