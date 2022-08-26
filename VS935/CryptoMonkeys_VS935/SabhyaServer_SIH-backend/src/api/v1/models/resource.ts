import mongoose, { Document } from 'mongoose';

export interface ResourceDoc extends Document {
    intiId: String;
    idEth: String;
    name: String;
    desc: String;
    file: String;
    fileIdx: Number;
    thumbnail: String;
    author: [String];
    keyWords: [String];
    interests: [String];
    minumunContribution: Number;
    downloadCount: Number;
    viewCount: Number;
    subscriberInsti: [mongoose.Schema.Types.ObjectId];
    subscriberUser: [mongoose.Schema.Types.ObjectId];
}

const resource = new mongoose.Schema({
    intiId: {
        type: mongoose.Schema.Types.ObjectId,
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
    keyWords: [String], //extract from description
    interests: [String], // will be given by the autor
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
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Institute'
        }
    ],

    subscriberUser: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

export const ResourceModel = mongoose.model<ResourceDoc>('Resource', resource);
