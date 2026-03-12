import mongoose from "mongoose";

const artist = new mongoose.Schema({
    artistid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true

    }
}, {
    timestamps: true
}) 

export const Artist = mongoose.model("Artist",artist);