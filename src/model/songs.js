import mongoose from "mongoose";
const songs = new mongoose.Schema({
    title: {
        type:String,
        required : true
    },
    fileurl:{
        type:String,
        required:true,

    },
    artistid:{
        type:String,
        required: true
    }
},{
    timestamps:true
})

export const Songs = mongoose.model("Songs",songs);