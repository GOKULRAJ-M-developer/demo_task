import jwt from 'jsonwebtoken';

export const isverified = (req,res,next)=>{
    let token = req.headers.authorization;
    token = token && token.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"access not permited"});
    }
console.log("raw token",token);
    try{
    const decode = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
    req.user = decode;
    next();
    }catch(error){
        console.log(error.message);
        return res.status(401).json({message:error.message || "Invalid token"});
    }
}
