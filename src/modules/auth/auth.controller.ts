import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Query,
    Res
} from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';

import { Public } from 'src/shared/decorators';
import { Ok } from 'src/shared/responses';
import { sendEmail } from 'src/shared/utils';

import {
    RegisterIndividualDto,
    SignInDto,
    SignUpDto,
} from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @HttpCode(200)
    @Post('login')
    async login(
        @Body() signInDto: SignInDto
    ) {
        const { accessToken } = await this.authService.signIn(signInDto);
        const data = { accessToken };

        return new Ok({ data, message: 'Login realizado com sucesso.' });
    }

    @Public()
    @Post('activate')
    async activate(
        @Body() signUpDto: SignUpDto
    ) {
        const { accessToken } = await this.authService.activate(signUpDto);
        const data = { accessToken };

        return new Ok({ data, message: 'Usuário registrado com sucesso.' });
    }

    @Public()
    @Get('validate-email')
    async validateEmail(
        @Query('token') token: string,
        @Res() res: Response
    ) {
        const { accessToken } = await this.authService.validateEmail(token);
        return res.redirect(302, `http://localhost:5173/?token=${accessToken}`);
    }

    @Public()
    @Post('register/individual')
    async registerIndividual(
        @Body() signUpDto: RegisterIndividualDto,
    ) {
        const { user, token, newTimeString } = await this.authService.registerIndividual(signUpDto);
        const link = process.env.VALIDATE_EMAIL_LINK + token;

        await sendEmail({
            to: user.email,
            subject: 'Confirmação de Email',
            html: `
            <p>Clique no link para verificar seu e-mail:</p><br>
            <p><a href="${link}">${link}</a></p><br>
            <p>Link válido até ${newTimeString}.</p>
            `
        })

        return new Ok({
            message: 'Usuário registrado com sucesso. Verifique seu e-mail para ativar sua conta.',
        })
    }

    @Public()
    @Post('register/partner')
    async registerPartner() {

    }
}
