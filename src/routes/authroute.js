import express from 'express';
import { registeruser,loginuser } from '../controllers/authcontroller.js';

const routes = express.Router();

routes.post("/register",registeruser);
routes.post("/login",loginuser);

export default routes;