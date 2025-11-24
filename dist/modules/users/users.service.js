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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const database_service_1 = require("../database/database.service");
let UsersService = class UsersService {
    constructor(db) {
        this.db = db;
    }
    async create(createUserDto) {
        var _a, _b;
        try {
            const usuario = await this.db.usuario.create(createUserDto);
            return usuario;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        const fields = ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.join(', ')) || 'campos únicos';
                        throw new common_1.ConflictException({
                            message: `Já existe um usuário com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
                            success: false,
                            statusCode: 409,
                            error: 'Conflict',
                        });
                    case 'P2003':
                        throw new common_1.BadRequestException({
                            message: 'Chave estrangeira inválida: um dos IDs fornecidos não existe.',
                            success: false,
                            statusCode: 400,
                            error: 'BadRequest',
                        });
                    case 'P2009':
                        throw new common_1.BadRequestException({
                            message: 'Dados inválidos enviados para o banco.',
                            success: false,
                            statusCode: 400,
                            error: 'BadRequest',
                        });
                    default:
                        throw new common_1.InternalServerErrorException({
                            message: 'Erro desconhecido ao criar usuário.',
                            success: false,
                            statusCode: 500,
                            error: 'InternalServerError',
                        });
                }
            }
            console.log(error);
            throw new common_1.InternalServerErrorException({
                message: 'Erro interno do servidor.',
                success: false,
                statusCode: 500,
                error: 'InternalServerError',
            }, error.toString());
        }
    }
    async findAllPaginated(query, page) {
        return this.db.$transaction([
            this.db.usuario.count({ where: query }),
            this.db.usuario.findMany(Object.assign(Object.assign({ where: query }, page), { orderBy: { createdAt: 'desc' }, omit: { senha: true }, include: {
                    tipo_perfil: true,
                    escritorio: true,
                } }))
        ]);
    }
    async findAll(args) {
        return this.db.usuario.findMany(args);
    }
    async findFirst(args) {
        return this.db.usuario.findFirst(args);
    }
    async findUnique(args) {
        return this.db.usuario.findUnique(args);
    }
    async update(updateUserDto) {
        try {
            const updatedUsuario = await this.db.usuario.update(updateUserDto);
            return updatedUsuario;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException({
                        message: 'Usuário não encontrado para atualização.',
                        success: false,
                        statusCode: 404,
                        error: 'NotFound',
                    });
                }
            }
            throw error;
        }
    }
    async delete(id) {
        try {
            await this.db.usuario.delete({
                where: { id },
            });
            return { message: 'Usuário deletado com sucesso.' };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new common_1.NotFoundException({
                    message: 'Usuário não encontrado para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }
            throw error;
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map