"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    }
});
exports.default = mongoose_1.default.model('Post', postSchema);
//# sourceMappingURL=postModel.js.map