import { Controller, Get, Param } from '@nestjs/common';
import { ChartsService } from './charts.service';

import { Roles, User } from 'src/shared/decorators';
import { ProfileType } from 'src/shared/enum';

import { UserWithoutPassword } from '../users/entities';
import { Ok } from 'src/shared/responses';

@Roles(ProfileType.ADMIN, ProfileType.BROKER)
@Controller('charts')
export class ChartsController {
    constructor(
        private readonly chartsService: ChartsService
    ) { }

    @Get('/:officeId')
    async getCharts(
        @User() { id, tipo_perfil_id }: UserWithoutPassword,
        @Param('officeId') officeId: string,
    ) {
        const where = tipo_perfil_id === 1
            ? { escritorio_id: officeId }
            : { usuario_id: id }

        const [biggestPrecatories, totalRestituition, getTotalByStatus] = await Promise.all([
            this.chartsService.getBiggestPrecatories(where),
            this.chartsService.getTotalRestituition(where),
            this.chartsService.getTotalByStatus(where),
        ]);

        const totalByStatusObj = {
            1: { count: 0 },
            2: { count: 0 },
            3: { count: 0 },
            4: { count: 0 },
            5: { count: 0 },
            6: { count: 0 },
        };

        getTotalByStatus.forEach(({ status, _count }) => totalByStatusObj[status].count = _count.id);

        const data = {
            biggestPrecatories,
            totalRestituition,
            getTotalByStatus: totalByStatusObj,
        }

        return new Ok({ data, message: 'Resultados encontrados para o seu gráfico.' })
    }

    @Get('biggest/:officeId/:year')
    async getBiggest(
        @Param('year') year: string,
        @Param('officeId') officeId: string,
        @User() { id, tipo_perfil_id }: UserWithoutPassword,
    ) {
        const query = tipo_perfil_id === 1
            ? { officeId, year }
            : { officeId, year, userId: id, }

        const data = await this.chartsService.getPrecatoriesByYearAndUser(query);

        const totalByStatusObj = {
            'jan': { value: 0, total_rows: 0 },
            'feb': { value: 0, total_rows: 0 },
            'mar': { value: 0, total_rows: 0 },
            'apr': { value: 0, total_rows: 0 },
            'may': { value: 0, total_rows: 0 },
            'jun': { value: 0, total_rows: 0 },
            'jul': { value: 0, total_rows: 0 },
            'aug': { value: 0, total_rows: 0 },
            'sep': { value: 0, total_rows: 0 },
            'oct': { value: 0, total_rows: 0 },
            'nov': { value: 0, total_rows: 0 },
            'dec': { value: 0, total_rows: 0 },
        };

        data.forEach(({ amount, mon, total_rows }) => {
            totalByStatusObj[mon].value = amount;
            if (amount > 0) totalByStatusObj[mon].total_rows = total_rows;
        })

        return new Ok({ data: totalByStatusObj, message: `Resultados para o ano de ${year}` })
    }
}
