"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user = new mongoose_1.default.Schema({
    name: {
        type: String
        // required: true
    },
    email: {
        type: String
        // required: true
    },
    hash: {
        type: String
        // required: true
    },
    tokens: [String],
    prove: {
        status: Boolean,
        id: String,
        default: false
    },
    insititute: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Intitute'
    },
    //when subscription or both model required
    // subscription: [
    //     {
    //         type: [mongoose.Schema.Types.ObjectId],
    //         refPath: 'docModel'
    //     }
    // ],
    // docModel: {
    //     type: String,
    //     enum: ['Institute', 'Resource']
    // },
    img: {
        type: String,
        default: 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='
    },
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
    addressEth: String,
    tags: [String]
}, {
    timestamps: true
});
// user.pre('save', async function (next: mongoose.HookNextFunction) {
//     let insti = this as UserDoc;
//     if (!insti.isModified('hash')) return next();
//     if (insti.hash == undefined) {
//         throw new Error('hash is undefined');
//     }
//     const hash = await bcrypt.hashSync(insti.hash.toString(), 8);
//     insti.hash = hash;
//     return next();
// });
exports.UserModel = mongoose_1.default.model('User', user);
