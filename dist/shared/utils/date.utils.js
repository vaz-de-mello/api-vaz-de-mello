"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormatted = void 0;
const dateFormatted = (dt) => {
    const date = dt ? new Date(dt) : new Date();
    const dia = String(date.getUTCDate()).padStart(2, '0');
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
    const ano = date.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
};
exports.dateFormatted = dateFormatted;
