import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseService } from 'src/modules/database/database.service';
import { PageDto } from 'src/shared/@types';

import { UserEntity } from './entities';

@Injectable()
export class UsersService {
    constructor(
        private readonly db: DatabaseService,
    ) { }

    async create(createUserDto: Prisma.UsuarioCreateArgs) {
        try {
            const usuario = await this.db.usuario.create(createUserDto);

            return usuario;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                switch (error.code) {
                    case 'P2002':
                        // Violação de campo único
                        const fields = (error.meta?.target as string[])?.join(', ') || 'campos únicos';
                        throw new ConflictException({
                            message: `Já existe um usuário com o(s) seguinte(s) dado(s) duplicado(s): ${fields}.`,
                            success: false,
                            statusCode: 409,
                            error: 'Conflict',
                        });

                    case 'P2003':
                        // Chave estrangeira inválida
                        throw new BadRequestException({
                            message: 'Chave estrangeira inválida: um dos IDs fornecidos não existe.',
                            success: false,
                            statusCode: 400,
                            error: 'BadRequest',
                        });

                    case 'P2009':
                        // Dados inválidos enviados
                        throw new BadRequestException({
                            message: 'Dados inválidos enviados para o banco.',
                            success: false,
                            statusCode: 400,
                            error: 'BadRequest',
                        });

                    default:
                        throw new InternalServerErrorException({
                            message: 'Erro desconhecido ao criar usuário.',
                            success: false,
                            statusCode: 500,
                            error: 'InternalServerError',
                        });
                }
            }

            // Erros fora do Prisma
            console.log(error);
            throw new InternalServerErrorException({
                message: 'Erro interno do servidor.',
                success: false,
                statusCode: 500,
                error: 'InternalServerError',
            }, error.toString());
        }
    }

    async findAll(query: Partial<UserEntity>, page: PageDto) {
        return this.db.$transaction([
            this.db.usuario.count({ where: query }),
            this.db.usuario.findMany({
                where: query,
                ...page,
                orderBy: { createdAt: 'desc' },
                omit: { senha: true },
                include: {
                    tipo_perfil: true,
                    escritorio: true,
                }
            })
        ])
    }

    async findFirst(args: Prisma.UsuarioFindFirstArgs) {
        return this.db.usuario.findFirst(args);

    }

    async findUnique(args: Prisma.UsuarioFindUniqueArgs) {
        return this.db.usuario.findUnique(args);
    }

    async update(updateUserDto: Prisma.UsuarioUpdateArgs) {
        try {
            const updatedUsuario = await this.db.usuario.update(updateUserDto);

            return updatedUsuario;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException({
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

    async delete(id: string) {
        try {
            await this.db.usuario.delete({
                where: { id },
            });

            return { message: 'Usuário deletado com sucesso.' };

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Usuário não encontrado para exclusão.',
                    success: false,
                    statusCode: 404,
                    error: 'NotFound',
                });
            }

            throw error;
        }
    }
}
