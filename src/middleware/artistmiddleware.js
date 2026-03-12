import { Artist } from "../model/artist.js";
import { User } from "../model/user.js";

export const isartist = async (req, res, next) => {
    if (req.user.type !== "artist") {
        return res.status(400).json({ message: "only artist can upload" });
    }
    const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User account not found" });
        }   
    const existartist = await Artist.findOne({ artistid: user.userID });
    if (!existartist) {
        return res.status(401).json({ message: "artist not found" });
    }
    req.artistid = user.userID;
    next();
}


