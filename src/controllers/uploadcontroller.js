import { uploadtoimakit } from "../utils/uploadtoimgkit.js";
import { Songs } from "../model/songs.js";

export const uploadsong = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: "song name is must" });
        }
        if (!req.file) {
            return res.status(400).json({
                message: "Audio file required"
            });
        }
        const result = await uploadtoimakit(req.file.path,req.file.filename);
        
       const newSong = await Songs.create({
            title,
            fileurl: result.url,
            artistid: req.artistid
        })
        console.log("new song details",newSong);
        return res.status(201).json({
            message:"song uploaded",
            newSong
        })

    } catch (error) {
        return res.status(500).json({ messasge: "internal server error at last" });
    }
}