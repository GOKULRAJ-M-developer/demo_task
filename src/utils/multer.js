import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "public/audiofiles"));
    },

    filename: function (req, file, cb) {
        const fname =
            crypto.randomBytes(12).toString("hex") +
            path.extname(file.originalname);

        cb(null, fname);
    }
});

export const uploadAudio = multer({
    storage: storage,
});