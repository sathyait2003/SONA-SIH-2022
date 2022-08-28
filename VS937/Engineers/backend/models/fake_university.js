const mongoose = require("mongoose");
const { Schema } = mongoose;
const FakeUniv_Schema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

const Fake_Univ = mongoose.model(
    "Fake-University",
    FakeUniv_Schema
);
module.exports = Fake_Univ;
