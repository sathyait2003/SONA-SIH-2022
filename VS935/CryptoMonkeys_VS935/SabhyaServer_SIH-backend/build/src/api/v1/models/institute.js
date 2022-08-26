"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituteModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const institute = new mongoose_1.default.Schema({
    name: String,
    hash: {
        type: String
        // required: true
    },
    tokens: [String],
    email: {
        type: String
        // required: true
    },
    instiID: String,
    pin: Number,
    details: String,
    img: {
        type: String,
        default: 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='
    },
    Wei: {
        type: Number,
        default: 0
    },
    addressEth: String,
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
    ],
    subscriptionInsti: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Institute'
        }
    ],
    subscriptionContent: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Resource'
        }
    ],
    tags: [String]
}, {
    timestamps: true
});
// institute.pre('save', async function (next: mongoose.HookNextFunction) {
//     let insti = this as InstitueDoc;
//     if (!insti.isModified('hash')) return next();
//     if (insti.hash == undefined) {
//         throw new Error('hash is undefined');
//     }
//     const hash = await bcrypt.hashSync(insti.hash.toString(), 8);
//     insti.hash = hash;
//     return next();
// });
exports.InstituteModel = mongoose_1.default.model('Institute', institute);
