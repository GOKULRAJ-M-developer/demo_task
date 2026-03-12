import { User } from '../model/user.js';
import { Artist } from '../model/artist.js';
import { generateUserId } from '../utils/useridgen.js';
import {generateAccessToken} from '../utils/tokengen.js';
import bcrypt from 'bcrypt';


const registeruser = async (req,res)=>{
     try{
        const {name , email , password , type} = req.body;
        
        if(!name || !email || !password || !type){
            return res.status(400).json({message : "All fields are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }
        const hasherpassword = await bcrypt.hash(password,10);
        const userid = generateUserId();
        const newUser = new User({
            name,
            email,  
            password : hasherpassword,
            userID : userid,
            type
        });
        
        await newUser.save();
        if(type === "artist"){
            const newArtist = new Artist({
                artistid : userid,
                name
            });
            await newArtist.save();
        }
        const token = generateAccessToken(
            newUser._id,
            newUser.email,
            newUser.type
        );
        return res.status(201).json({
            message : "User registered successfully",
            token
        });

     }catch(error){
        return res.status(500).json({message : "Internal server error"});
     };
     

}

const loginuser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existmail = await User.findOne({email});
        if(!existmail){
            return res.status(401).json({message:"Email not registered"})
        }
        const userpass = await bcrypt.compare(password,existmail.password);
        if(!userpass){
            return res.status(401).json({message :"password is invalid"});
        }
        const token = generateAccessToken(
            existmail._id,
            existmail.email,
            existmail.type
        )
        return res.status(200).json({
            message:"login successful !",
            token
        })
    }catch(error){
       return res.status(500).json({ message: error.message || "Internal server error" });
    }
}

export {registeruser,loginuser};