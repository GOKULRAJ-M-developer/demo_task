import jwt from 'jsonwebtoken';

export const generateAccessToken = (id,email,type)=>{
    return jwt.sign({id,email,type},process.env.JWT_ACCESS_SECRET,{expiresIn :'30d'});
}