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
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';

import { Ok } from 'src/shared/responses';
import { PageQuery, Roles } from 'src/shared/decorators';
import { createPaginatedResponse, sendEmail } from 'src/shared/utils';
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
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(createUserDto.senha || randomPassword, 10);

        createUserDto.senha = hashedPassword;

        const user = await this.usersService.create({
            data: {
                ...createUserDto,
                status: 1, // 1: Ativo, 0: Inativo, 2: Aguardando
                senha: createUserDto.senha || randomPassword,
                escritorio_id: createUserDto.escritorio_id || null,
                email_verificado: true,
                email_token: null,
            },
            omit: { senha: true },
        });

        // await sendEmail({
        //     to: user.email,
        //     subject: 'Registro realizado em querorestituIR!',
        //     html: `
        //     <p>Bem-vindo ao querorestituIR!</p>
        //     <p>Segue abaixo sua senha provisória:</p><br>
        //     <p>${randomPassword}</p><br>
        //     <p>Faço o primeiro login utilizando esta senha e depois troque para outra.</p>
        //     `
        // })

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

    // este método tem apenas o propósito de encontrar o ID do admin do sistema para enviar notificações
    @Roles(ProfileType.ADMIN, ProfileType.BROKER)
    @Get('admin/id')
    async findAdminId() {
        const adminUser = await this.usersService.findFirst({
            where: { tipo_perfil_id: ProfileType.ADMIN },
            select: { id: true },
        });

        return new Ok({ data: adminUser, message: 'Admin encontrado com sucesso.' });
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
