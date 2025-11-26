import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    NotFoundException,
    Query,
} from '@nestjs/common';
import { HonorariosDestacados, Prisma } from '@prisma/client';

import { PrecatoriesService } from './precatories.service';
import { CalculatorService } from '../calculator/calculator.service';
import { ClientsService } from '../clients/clients.service';

import { Ok } from 'src/shared/responses';
import { PageQuery, User } from 'src/shared/decorators';
import { PageQueryDto } from 'src/shared/@types';
import { createPaginatedResponse, dateFormatted, selicCalculator } from 'src/shared/utils';
import { MONTHS_STRING_SHORT } from 'src/shared/constants';

import { CreatePrecatoryDto, UpdatePrecatoryClientDto, UpdatePrecatoryDto } from './dto';
import { PrecatoryEntity } from './entities';
import { UserWithoutPassword } from '../users/entities';

@Controller('precatories')
export class PrecatoriesController {
    constructor(
        private readonly precatoriesService: PrecatoriesService,
        private readonly calculatorService: CalculatorService,
        private readonly clientsService: ClientsService,
    ) { }

    @Post()
    async create(
        @Body() createPrecatorioDto: CreatePrecatoryDto,
        @User() user: UserWithoutPassword,
    ) {
        let counter: number = 1;
        const lastPrecatory = await this.precatoriesService.findFirst({
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                contador: true,
            }
        })

        if (lastPrecatory) counter = lastPrecatory.contador + 1;

        const precatory = await this.precatoriesService.create({
            data: {
                status: 1,
                numero_card: this.precatoriesService.cardNumberGenerator(counter),
                usuario: { connect: { id: user.id } },
                escritorio: { connect: { id: user.escritorio_id } },
                cliente: { connect: { id: createPrecatorioDto.cliente_id } },
                comprovante_pdf: createPrecatorioDto.comprovante_pdf,
                data_base: createPrecatorioDto.data_base,
                data_levantamento: createPrecatorioDto.data_levantamento,
                doenca_grave: createPrecatorioDto.doenca_grave,
                honorarios_destacados: createPrecatorioDto.honorarios_destacados,
                oficio_pdf: createPrecatorioDto.oficio_pdf,
                percentual_honorario: createPrecatorioDto.percentual_honorario,
                precatorio_derivado: createPrecatorioDto.precatorio_derivado,
                processo_origem: createPrecatorioDto.processo_origem,
                rra_meses: createPrecatorioDto.rra_meses,
                tese_aplicada: createPrecatorioDto.tese_aplicada,
                tipo_verba: createPrecatorioDto.tipo_verba,
                tribunal_pagador: createPrecatorioDto.tribunal_pagador,
                valor_bruto: createPrecatorioDto.valor_bruto,
                valor_honorario: createPrecatorioDto.valor_honorario,
                valor_irrf_retido: createPrecatorioDto.valor_irrf_retido,
                valor_restituicao: createPrecatorioDto.valor_restituicao,
                doenca: createPrecatorioDto.doenca,
                valor_simulador_RRA: createPrecatorioDto.valor_simulador_RRA,
                valor_corrigido_SELIC: createPrecatorioDto.valor_corrigido_SELIC
            }
        });

        return new Ok({ data: precatory, message: 'Precatório criado com sucesso.' });
    }

    @Get()
    async findAll(
        @PageQuery({
            caseSensitive: ['tribunal_pagador'],
            equals: ['id', 'escritorio_id', 'usuario_id', 'cliente_id', 'numero_card'],
            enumValidator: [
                { key: 'honorarios_destacados', enum: HonorariosDestacados },
            ],
            excludes: ['status', 'sort'],
        }) { page, query }: PageQueryDto<Partial<PrecatoryEntity>>,
        @User() user: UserWithoutPassword,
        @Query('status') status?: string,
        @Query('sort') sort?: string,
    ) {
        if (status) query.status = +status;
        if (user.tipo_perfil_id !== 1) query.escritorio_id = user.escritorio_id

        let orderBy: Prisma.PrecatorioOrderByWithRelationInput = { createdAt: 'desc' };
        if (sort) {
            const [column, sortOrder] = sort.split('|');
            orderBy = { [column]: sortOrder } as Prisma.PrecatorioOrderByWithRelationInput;
        }

        const [total, preactories] = await this.precatoriesService.findAll(query, page, orderBy);
        const response = createPaginatedResponse({
            data: preactories,
            total,
            page,
        })

        return new Ok(response);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string
    ) {
        const precatory = await this.precatoriesService.findUnique({
            where: { id },
            include: {
                cliente: true,
                escritorio: true,
                usuario: true,
            },
        });
        if (!precatory) throw new NotFoundException({
            message: 'Precatório não encontrado.',
            success: false,
            statusCode: 404,
            error: 'NotFound',
        });

        return new Ok({ data: precatory, message: 'Precatório encontrado com sucesso.' });
    }

    @Get('rra-calculator/:id')
    async calculateRRA(
        @Param('id') id: string,
    ) {
        const precatory = await this.precatoriesService.findUnique({ where: { id } });
        if (!precatory) throw new NotFoundException({
            message: 'Precatório não encontrado.',
            success: false,
            statusCode: 404,
            error: 'NotFound',
        });

        const year = precatory.data_levantamento.getFullYear();
        const month = precatory.data_levantamento.getMonth() + 1;

        const { totalRRA } = this.calculatorService.calculateRRA(0, {
            ano: year,
            mes: MONTHS_STRING_SHORT[month],
            numeroMeses: precatory.rra_meses,
            rendimentoTotal: +precatory.valor_bruto
        });

        const irSelicFixed = await selicCalculator({
            endDate: dateFormatted(),
            startDate: dateFormatted(precatory.data_levantamento),
            value: totalRRA,
        })

        return new Ok({
            data: {
                irSelicFixed,
                totalRRA,
                precatorio: precatory,
            },
            message: 'Cálculo de RRA realizado com sucesso.',
        })
    }

    @Post('find')
    async findByCardNumber(
        @Body('search') search: string,
        @User() user: UserWithoutPassword,
        @PageQuery() { page }: PageQueryDto<Partial<any>>,
    ) {
        let query: Record<string, any> = {};
        if (user.tipo_perfil_id !== 1) {
            query = {
                AND: [
                    {
                        OR: [
                            { numero_card: search },
                            { numero_processo: search },
                            {
                                cliente: {
                                    OR: [
                                        { cpf: search },
                                        { nome: { contains: search, mode: 'insensitive' } }
                                    ]
                                },
                            }
                        ]
                    },
                    {
                        escritorio_id: user.escritorio_id,
                    }
                ]
            }
        } else {
            query = {
                OR: [
                    { numero_card: search },
                    { numero_processo: search },
                    {
                        cliente: {
                            OR: [
                                { cpf: search },
                                { nome: { contains: search, mode: 'insensitive' } }
                            ]
                        }
                    },
                ]
            }
        }

        const [total, data] = await this.precatoriesService.findAll(query, page);
        const response = createPaginatedResponse({
            data,
            total,
            page,
        })

        return new Ok(response);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePrecatorioDto: UpdatePrecatoryDto
    ) {
        const precatory = await this.precatoriesService.update({
            where: { id },
            data: updatePrecatorioDto,
        });

        return new Ok({ data: precatory, message: 'Precatório atualizado com sucesso.' });
    }

    @Put(':id/client/:clientId')
    async updateClient(
        @Param('id') id: string,
        @Param('clientId') clientId: string,
        @Body() updateClient: UpdatePrecatoryClientDto,
    ) {
        const clientWithSameCpf = await this.clientsService.findUnique({
            where: { cpf: updateClient.cpf }
        });

        if (clientWithSameCpf) {
            await this.clientsService.update({
                where: { id: clientWithSameCpf.id },
                data: {
                    nome: updateClient.nome,
                    data_nascimento: updateClient.data_nascimento,
                }
            });

            const precatory = (clientWithSameCpf.id !== clientId) ? await this.precatoriesService.update({
                where: { id },
                data: {
                    cliente: { connect: { id: clientWithSameCpf.id } }
                },
                include: { cliente: true }
            }) : await this.precatoriesService.findUnique({ where: { id }, include: { cliente: true } });

            return new Ok({ message: 'Dados do cliente atualizado com sucesso.', data: precatory });
        } else {
            const { id: newClientId } = await this.clientsService.create({
                data: {
                    cpf: updateClient.cpf,
                    nome: updateClient.nome,
                    data_nascimento: updateClient.data_nascimento,
                },
                select: { id: true }
            });

            const precatory = await this.precatoriesService.update({
                where: { id },
                data: {
                    cliente: { connect: { id: newClientId } }
                },
                include: { cliente: true }
            });

            return new Ok({ message: 'Dados do cliente atualizado com sucesso.', data: precatory });
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const { message } = await this.precatoriesService.delete(id);
        return new Ok({ message });
    }
}
