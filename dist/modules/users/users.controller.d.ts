import { UsersService } from './users.service';
import { Ok } from 'src/shared/responses';
import { PageQueryDto } from 'src/shared/@types';
import { UserEntity } from './entities';
import { CreateUserDto, UpdateUserDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<Ok>;
    findAll({ page, query }: PageQueryDto<Partial<UserEntity>>): Promise<Ok>;
    findOne(id: string): Promise<Ok>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Ok>;
    delete(id: string): Promise<Ok>;
}
