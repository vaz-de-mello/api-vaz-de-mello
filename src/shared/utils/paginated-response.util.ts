import { PageDto } from "../@types";

interface CreatePaginatedResponseDto {
    total: number;
    page: PageDto;
    data: any[];
}

export function createPaginatedResponse({
    data,
    total,
    page,
}: CreatePaginatedResponseDto) {
    const totalPages = Math.ceil(total / page.take);

    const message = total === 1
        ? "1 resultado encontrado."
        : `${total} resultados encontrados.`;

    return {
        data: {
            rows: data,
            total,
            totalPages,
        },
        message,
    }
}