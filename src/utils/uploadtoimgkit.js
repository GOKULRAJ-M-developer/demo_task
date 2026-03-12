import { imagekit } from "../config/imagekit.js";
import fs from 'fs';

export const uploadtoimakit = async (filepath, filename) => {
    const filebuf = fs.readFileSync(filepath);
    const response = await imagekit.upload({
        file: filebuf,
        fileName: filename
    });
    fs.unlinkSync(filepath);
    return response;
}