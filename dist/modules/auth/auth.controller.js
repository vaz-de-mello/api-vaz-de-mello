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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const decorators_1 = require("../../shared/decorators");
const responses_1 = require("../../shared/responses");
const utils_1 = require("../../shared/utils");
const dto_1 = require("./dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(signInDto) {
        const data = await this.authService.signIn(signInDto);
        const message = (data === null || data === void 0 ? void 0 : data.message) || 'Login realizado com sucesso.';
        return new responses_1.Ok({ data, message });
    }
    async activate(activateDto) {
        const { accessToken } = await this.authService.activate(activateDto);
        const data = { accessToken };
        return new responses_1.Ok({ data, message: 'Usuário ativado com sucesso.' });
    }
    async validateEmail(token, res) {
        const { accessToken } = await this.authService.validateEmail(token);
        return res.redirect(302, `http://localhost:5173/?token=${accessToken}`);
    }
    async registerIndividual(signUpDto) {
        const { user, token, newTimeString } = await this.authService.registerIndividual(signUpDto);
        const link = process.env.VALIDATE_EMAIL_LINK + token;
        await (0, utils_1.sendEmail)({
            to: user.email,
            subject: 'Confirmação de Email',
            html: `
            <p>Clique no link para verificar seu e-mail:</p><br>
            <p><a href="${link}">${link}</a></p><br>
            <p>Link válido até ${newTimeString}.</p>
            `
        });
        return new responses_1.Ok({
            message: 'Usuário registrado com sucesso. Verifique seu e-mail para ativar sua conta.',
        });
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('activate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ActivateDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activate", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('validate-email'),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateEmail", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterIndividualDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerIndividual", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map