import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface InstitueDoc extends Document {
    name: String;
    hash?: String;
    tokens?: [String];
    email: String;
    instiID: String;
    pin: Number;
    details: String;
    img: String;
    Wei: Number;
    addressEth: String;
    subscriberInsti: [Object];
    subscriberUser: [Object];
    subscriptionInsti: [Object];
    subscriptionContent: [Object];
    subscribtion: Number;
    tags: [String];
}

const institute = new mongoose.Schema(
    {
        name: String,
        hash: {
            type: String,
            required: true
        },
        tokens: [String],
        email: {
            type: String,
            required: true
        },
        instiID: String,
        pin: Number,
        details: String,
        img: {
            type: String,
            default:
                'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='
        },
        Wei: {
            type: Number,
            default: 0
        },
        addressEth: String,
        subscriberInsti: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Institute'
            }
        ],

        subscriberUser: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

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

        tags: [String]
    },
    {
        timestamps: true
    }
);

institute.pre('save', async function (next: mongoose.HookNextFunction) {
    let insti = this as InstitueDoc;

    if (!insti.isModified('hash')) return next();

    if (insti.hash == undefined) {
        throw new Error('hash is undefined');
    }

    const hash = await bcrypt.hashSync(insti.hash.toString(), 8);

    insti.hash = hash;
    return next();
});

export const InstituteModel = mongoose.model<InstitueDoc>('Institute', institute);
