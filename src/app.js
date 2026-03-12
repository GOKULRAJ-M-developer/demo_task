import express from 'express';
import authroute from './routes/authroute.js';
import uploadroute from './routes/uploadroute.js';


const app = express();
app.use(express.json());

app.use("/api/v1/upload",uploadroute);
app.use("/api/v1/auth",authroute);
app.use("/api/v1/login",authroute);

export default app;