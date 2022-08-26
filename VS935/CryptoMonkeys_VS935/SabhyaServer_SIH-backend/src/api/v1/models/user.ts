import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDoc extends Document {
    name: String;
    hash?: String;
    email: string;
    tokens?: [String];
    prove: Object;
    insititute: Object;
    img: String;
    subscriptionInsti: [mongoose.Schema.Types.ObjectId];
    subscriptionContent: [mongoose.Schema.Types.ObjectId];
    addressEth: String;
    tags: [String];
}
const user = new mongoose.Schema(
    {
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
            type: mongoose.Schema.Types.ObjectId,
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
            default:
                'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='
        },
        subscriptionInsti: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Institute'
            }
        ],

        subscriptionContent: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Resource'
            }
        ],
        addressEth: String,
        tags: [String]
    },
    {
        timestamps: true
    }
);

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

export const UserModel = mongoose.model<UserDoc>('User', user);
