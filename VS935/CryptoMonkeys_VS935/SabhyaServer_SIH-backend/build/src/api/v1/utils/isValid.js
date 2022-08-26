"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = void 0;
const isValid = (data) => {
    if (data === '' || data === undefined || data === null) {
        return true;
    }
    return false;
};
exports.isValid = isValid;
