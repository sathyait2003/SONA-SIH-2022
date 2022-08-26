"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resource = new mongoose_1.default.Schema({
    intiId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Institute'
    },
    idEth: String,
    name: String,
    desc: String,
    file: String,
    fileIdx: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
        default: 'https://readersend.com/wp-content/uploads/2018/04/book-sample_preview-1.png'
    },
    author: [String],
    keyWords: [String],
    interests: [String],
    minumunContribution: {
        type: Number,
        default: 0
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
    subscriberInsti: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Institute'
        }
    ],
    subscriberUser: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});
exports.ResourceModel = mongoose_1.default.model('Resource', resource);
