import { ChartsService } from './charts.service';
import { UserWithoutPassword } from '../users/entities';
import { Ok } from 'src/shared/responses';
export declare class ChartsController {
    private readonly chartsService;
    constructor(chartsService: ChartsService);
    getCharts({ id, tipo_perfil_id }: UserWithoutPassword, officeId: string): Promise<Ok>;
    getBiggest(year: string, officeId: string, { id, tipo_perfil_id }: UserWithoutPassword): Promise<Ok>;
}
