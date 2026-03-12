import express from 'express';
import { uploadAudio } from '../utils/multer.js';
import { isartist } from '../middleware/artistmiddleware.js';
import { isverified } from '../middleware/authmiddleware.js';
import { uploadsong } from '../controllers/uploadcontroller.js';

const routes = express.Router();
routes.post("/song", isverified, uploadAudio.single("song"), isartist, uploadsong);

export default routes;
