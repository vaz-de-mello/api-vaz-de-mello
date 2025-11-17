import { DatabaseService } from '../database/database.service';
import { OfficesService } from '../offices/offices.service';
import { UsersService } from '../users/users.service';
export declare class BootstrapService {
    private readonly db;
    private readonly officesService;
    private readonly usersService;
    constructor(db: DatabaseService, officesService: OfficesService, usersService: UsersService);
    private createOffice;
    private createUserProfiles;
    private createAdmin;
    bootstrap(): Promise<boolean>;
}
