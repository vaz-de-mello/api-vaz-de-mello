import {
    BadRequestException,
    ExecutionContext,
    createParamDecorator,
} from "@nestjs/common";

interface EnumValidator {
    key: string;
    enum: any;
}

export interface PageQueryOptions {
    equals?: string[];
    caseSensitive?: string[];
    excludes?: string[];
    enumValidator?: EnumValidator[];
}

export const PageQuery = createParamDecorator((options: PageQueryOptions, context: ExecutionContext) => {
    const whereContainsQuery = {};

    const { query } = context.switchToHttp().getRequest();

    if (options?.enumValidator) {
        const invalidEnumKey = [];

        options.enumValidator.forEach(({ key, enum: enumValues }) => {
            if (query[key] && !Object.values(enumValues).includes(query[key])) {
                invalidEnumKey.push({ key, values: Object.values(enumValues) });
            }
        });

        if (invalidEnumKey.length) {
            throw new BadRequestException({
                success: false,
                statusCode: 400,
                message: `Valor inválido para os seguintes enums: ${invalidEnumKey.map(({ key }) => key).join(', ')}`,
                validValues: invalidEnumKey.map(({ key, values }) => ({ [key]: values })),
                error: 'BadRequest',
            });
        }
    }

    const pageQuery = Number(query?.page || 1);

    const take = Number(query?.take || 20);;
    const skip = isNaN(pageQuery) ? 0 : (take * (pageQuery - 1));

    const page = { skip, take };

    delete query.page;

    const queryValues = Object.values(query);
    const queryKeys = Object.keys(query);

    queryKeys.forEach((key, index) => {
        const value = queryValues[index];
        // Se o parametro estiver dentro de excludes, não adiciona à query do Prisma
        if (options.excludes?.includes(key)) return;

        whereContainsQuery[key] = {};

        if (options.equals?.includes(key)) whereContainsQuery[key].equals = value;
        else whereContainsQuery[key].contains = value;

        if (options.caseSensitive?.includes(key)) whereContainsQuery[key].mode = 'insensitive';
    })
    return { query: whereContainsQuery, page, rawQuery: query };
})