import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export interface PageQueryOptions {
    equals?: string[];
    caseSensitive?: string[];
    excludes?: string[];
}

export const PageQuery = createParamDecorator((options: PageQueryOptions, context: ExecutionContext) => {
    const whereContainsQuery = {};

    const { query } = context.switchToHttp().getRequest();
    const pageQuery = Number(query?.page || 1);

    const take = Number(query?.take || 20);;
    const skip = isNaN(pageQuery) ? 0 : (take * (pageQuery - 1));

    const page = { skip, take };

    delete query.page;

    const queryValues = Object.values(query);
    const queryKeys = Object.keys(query);

    queryKeys.forEach((key, index) => {
        const value = queryValues[index];
        whereContainsQuery[key] = {};

        // Se o parametro estiver dentro de excludes, não adiciona à query do Prisma
        if (options.excludes?.includes(key)) return;

        if (options.equals?.includes(key)) whereContainsQuery[key].equals = value;
        else whereContainsQuery[key].contains = value;

        if (options.caseSensitive?.includes(key)) whereContainsQuery[key].mode = 'insensitive';
        else whereContainsQuery[key].mode = 'default';
    })
    return { query: whereContainsQuery, page }
})