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
import { JwtService } from '@nestjs/jwt';

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
        private readonly jwtService: JwtService,
    ) { }

    @Post()
    async create(
        @Body() createUserDto: CreateUserDto
    ) {
        const data = await this.usersService.create({
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

        return new Ok({ data, message: 'Usuário criado com sucesso.' });
    }

    @Get()
    async findAll(
        @PageQuery() { page, query }: PageQueryDto<Partial<UserEntity>>
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
        const data = await this.usersService.findUnique({ where: { id } });
        if (!data) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        return new Ok({ data, message: 'Usuário encontrado com sucesso.' });
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const data = await this.usersService.update({
            where: { id },
            data: updateUserDto,
        });

        return new Ok({ data, message: 'Usuário atualizado com sucesso.' });
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const response = await this.usersService.delete(id);
        return new Ok(response);
    }
}
