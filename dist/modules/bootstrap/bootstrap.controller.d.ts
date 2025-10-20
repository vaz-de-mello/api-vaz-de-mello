import { BootstrapService } from './bootstrap.service';
import { Ok } from 'src/shared/responses';
export declare class BootstrapController {
    private readonly bootstrapService;
    constructor(bootstrapService: BootstrapService);
    bootstrap(): Promise<Ok>;
}
