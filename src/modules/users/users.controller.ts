import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    NotFoundException,
    Put,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { Ok } from 'src/shared/responses';
import { PageQuery, Roles } from 'src/shared/decorators';
import { createPaginatedResponse } from 'src/shared/utils';
import { PageQueryDto } from 'src/shared/@types';
import { ProfileType } from 'src/shared/enum';

import { UserEntity } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';

@Roles(ProfileType.ADMIN)
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Post()
    async create(
        @Body() createUserDto: CreateUserDto
    ) {
        const user = await this.usersService.create({
            data: {
                ...createUserDto,
                status: 2, // 1: Ativo, 0: Inativo, 2: Aguardando
                senha: createUserDto.senha || '',
                escritorio_id: createUserDto.escritorio_id || null,
                email_verificado: true,
                email_token: null,
            },
            omit: { senha: true },
        });

        return new Ok({ data: user, message: 'Usuário criado com sucesso.' });
    }

    @Get()
    async findAll(
        @PageQuery({
            caseSensitive: ['nome'],
            equals: ['cpf', 'escritorio_id', 'login', 'id']
        }) { page, query }: PageQueryDto<Partial<UserEntity>>
    ) {
        const [total, users] = await this.usersService.findAll(query, page);
        const response = createPaginatedResponse({
            data: users,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
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
            throw new NotFoundException({
                message: 'Usuário não encontrado.',
                success: false,
                statusCode: 404,
                error: 'NotFound',
            });
        }

        return new Ok({ data: user, message: 'Usuário encontrado com sucesso.' });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const user = await this.usersService.update({
            where: { id },
            data: updateUserDto,
            omit: { senha: true },
        });

        return new Ok({ data: user, message: 'Usuário atualizado com sucesso.' });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const response = await this.usersService.delete(id);
        return new Ok(response);
    }
}
