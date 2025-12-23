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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const users_service_1 = require("./users.service");
const responses_1 = require("../../shared/responses");
const decorators_1 = require("../../shared/decorators");
const utils_1 = require("../../shared/utils");
const _types_1 = require("../../shared/@types");
const enum_1 = require("../../shared/enum");
const dto_1 = require("./dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(createUserDto.senha || randomPassword, 10);
        createUserDto.senha = hashedPassword;
        const user = await this.usersService.create({
            data: Object.assign(Object.assign({}, createUserDto), { data_nascimento: createUserDto.data_nascimento || new Date().toISOString(), status: 1, senha: createUserDto.senha || randomPassword, escritorio_id: createUserDto.escritorio_id || null, email_verificado: true, email_token: null }),
            omit: { senha: true },
        });
        return new responses_1.Ok({ data: user, message: 'Usuário criado com sucesso.' });
    }
    async findAll({ page, query }) {
        const [total, users] = await this.usersService.findAllPaginated(query, page);
        const response = (0, utils_1.createPaginatedResponse)({
            data: users,
            total,
            page,
        });
        return new responses_1.Ok(response);
    }
    async findOne(id) {
        const user = await this.usersService.findUnique({
            where: { id },
            omit: { senha: true },
            include: {
                escritorio: true,
                precatorio: true,
                tipo_perfil: true,
            }
        });
        if (!user) {
            throw new common_1.NotFoundException({
                message: 'Usuário não encontrado.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        }
        return new responses_1.Ok({ data: user, message: 'Usuário encontrado com sucesso.' });
    }
    async findAdminId() {
        const adminUser = await this.usersService.findFirst({
            where: { tipo_perfil_id: enum_1.ProfileType.ADMIN },
            select: { id: true, nome: true },
        });
        return new responses_1.Ok({ data: adminUser, message: 'Admin encontrado com sucesso.' });
    }
    async findAllAdminIds() {
        const adminUser = await this.usersService.findAll({
            where: { tipo_perfil_id: enum_1.ProfileType.ADMIN },
            select: { id: true, nome: true },
        });
        return new responses_1.Ok({ data: adminUser, message: 'Admins encontrados com sucesso.' });
    }
    async update(id, updateUserDto) {
        const user = await this.usersService.update({
            where: { id },
            data: updateUserDto,
            omit: { senha: true },
        });
        return new responses_1.Ok({ data: user, message: 'Usuário atualizado com sucesso.' });
    }
    async updatePassword({ id }, { password }) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.usersService.update({
            where: { id },
            data: { senha: hashedPassword },
        });
        return new responses_1.Ok({ message: 'Senha atualizada com sucesso.' });
    }
    async delete(id) {
        const response = await this.usersService.delete(id);
        return new responses_1.Ok(response);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorators_1.PageQuery)({
        caseSensitive: ['nome'],
        equals: ['cpf', 'escritorio_id', 'login', 'id']
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_types_1.PageQueryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, decorators_1.Roles)(enum_1.ProfileType.ADMIN, enum_1.ProfileType.BROKER),
    (0, common_1.Get)('admin/id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAdminId", null);
__decorate([
    (0, decorators_1.Roles)(enum_1.ProfileType.ADMIN, enum_1.ProfileType.BROKER),
    (0, common_1.Get)('admin/id/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllAdminIds", null);
__decorate([
    (0, decorators_1.Roles)(enum_1.ProfileType.ADMIN, enum_1.ProfileType.BROKER),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, decorators_1.Roles)(enum_1.ProfileType.ADMIN, enum_1.ProfileType.BROKER),
    (0, common_1.Put)('profile/password'),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateUserPasswordDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    (0, decorators_1.Roles)(enum_1.ProfileType.ADMIN),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map