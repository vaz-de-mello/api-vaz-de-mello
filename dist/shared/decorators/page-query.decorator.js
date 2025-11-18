"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageQuery = void 0;
const common_1 = require("@nestjs/common");
exports.PageQuery = (0, common_1.createParamDecorator)((options, context) => {
    const whereContainsQuery = {};
    const { query } = context.switchToHttp().getRequest();
    if (options.enumValidator) {
        const invalidEnumKey = [];
        options.enumValidator.forEach(({ key, enum: enumValues }) => {
            if (query[key] && !Object.values(enumValues).includes(query[key])) {
                invalidEnumKey.push({ key, values: Object.values(enumValues) });
            }
        });
        if (invalidEnumKey.length) {
            throw new common_1.BadRequestException({
                success: false,
                statusCode: 400,
                message: `Valor inválido para os seguintes enums: ${invalidEnumKey.map(({ key }) => key).join(', ')}`,
                validValues: invalidEnumKey.map(({ key, values }) => ({ [key]: values })),
                error: 'BadRequest',
            });
        }
    }
    const pageQuery = Number((query === null || query === void 0 ? void 0 : query.page) || 1);
    const take = Number((query === null || query === void 0 ? void 0 : query.take) || 20);
    ;
    const skip = isNaN(pageQuery) ? 0 : (take * (pageQuery - 1));
    const page = { skip, take };
    delete query.page;
    const queryValues = Object.values(query);
    const queryKeys = Object.keys(query);
    queryKeys.forEach((key, index) => {
        var _a, _b, _c;
        const value = queryValues[index];
        if ((_a = options.excludes) === null || _a === void 0 ? void 0 : _a.includes(key))
            return;
        whereContainsQuery[key] = {};
        if ((_b = options.equals) === null || _b === void 0 ? void 0 : _b.includes(key))
            whereContainsQuery[key].equals = value;
        else
            whereContainsQuery[key].contains = value;
        if ((_c = options.caseSensitive) === null || _c === void 0 ? void 0 : _c.includes(key))
            whereContainsQuery[key].mode = 'insensitive';
    });
    return { query: whereContainsQuery, page, rawQuery: query };
});
//# sourceMappingURL=page-query.decorator.js.map