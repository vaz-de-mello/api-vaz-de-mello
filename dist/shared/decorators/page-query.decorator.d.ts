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
export declare const PageQuery: (...dataOrPipes: (PageQueryOptions | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export {};
