"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOfficeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_office_dto_1 = require("./create-office.dto");
class UpdateOfficeDto extends (0, mapped_types_1.PartialType)(create_office_dto_1.CreateOfficeDto) {
}
exports.UpdateOfficeDto = UpdateOfficeDto;
//# sourceMappingURL=update-office.dto.js.map