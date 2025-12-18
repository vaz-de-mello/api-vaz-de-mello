import { UsersService } from './users.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { UserEntity, UserWithoutPassword } from './entities';
import { CreateUserDto, UpdateUserDto, UpdateUserPasswordDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<UserEntity>>): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    findAdminId(): Promise<Ok>;
    findAllAdminIds(): Promise<Ok>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Ok>;
    updatePassword({ id }: UserWithoutPassword, { password }: UpdateUserPasswordDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
