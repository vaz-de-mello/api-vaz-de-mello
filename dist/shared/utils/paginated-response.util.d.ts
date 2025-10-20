import { PageDto } from "../@types";
interface CreatePaginatedResponseDto {
    total: number;
    page: PageDto;
    data: any[];
}
export declare function createPaginatedResponse({ data, total, page, }: CreatePaginatedResponseDto): {
    data: {
        rows: any[];
        total: number;
        totalPages: number;
    };
    message: string;
};
export {};
