"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ok = void 0;
class Ok {
    constructor({ data, message, }) {
        this.success = true;
        this.message = message || 'OK';
        data && (this.data = data);
    }
}
exports.Ok = Ok;
//# sourceMappingURL=ok.js.map