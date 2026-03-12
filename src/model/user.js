import mongoose  from "mongoose";

const user = new mongoose.Schema({
    name:{
        type: String,
        required : true,
        trim : true
    },
    userID:{
        type: String,
        required : true,
        unique : true
    },
    email:{
        type: String,
        required : true,
        unique : true
    },
    password:{
      type:String,
      required : true
    },
    type:{
        type:String,
        enum:["listener","artist"],
        default : "listener"
    }
},{
    timestamps:true
});

export const User = mongoose.model("User",user);