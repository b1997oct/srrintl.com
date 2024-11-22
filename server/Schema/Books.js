const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    sno: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    yop: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    image: String
}, { timestamps: true });

module.exports = model("Books", userSchema);
