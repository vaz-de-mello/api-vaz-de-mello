"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrecatoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_precatory_dto_1 = require("./create-precatory.dto");
class UpdatePrecatoryDto extends (0, mapped_types_1.PartialType)(create_precatory_dto_1.CreatePrecatoryDto) {
}
exports.UpdatePrecatoryDto = UpdatePrecatoryDto;
//# sourceMappingURL=update-precatory.dto.js.map