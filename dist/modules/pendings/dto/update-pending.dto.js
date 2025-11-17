"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePendingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pending_dto_1 = require("./create-pending.dto");
class UpdatePendingDto extends (0, mapped_types_1.PartialType)(create_pending_dto_1.CreatePendingDto) {
}
exports.UpdatePendingDto = UpdatePendingDto;
//# sourceMappingURL=update-pending.dto.js.map