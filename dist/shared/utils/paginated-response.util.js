"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginatedResponse = void 0;
function createPaginatedResponse({ data, total, page, }) {
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
    };
}
exports.createPaginatedResponse = createPaginatedResponse;
//# sourceMappingURL=paginated-response.util.js.map