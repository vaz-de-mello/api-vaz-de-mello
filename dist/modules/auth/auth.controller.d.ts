import { Response } from 'express';
import { AuthService } from './auth.service';
import { Ok } from 'src/shared/responses';
import { ActivateDto, RegisterIndividualDto, SignInDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(signInDto: SignInDto): Promise<Ok>;
    activate(activateDto: ActivateDto): Promise<Ok>;
    validateEmail(token: string, res: Response): Promise<void>;
    registerIndividual(signUpDto: RegisterIndividualDto): Promise<Ok>;
}
