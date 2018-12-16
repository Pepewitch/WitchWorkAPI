import express from 'express';
import cors from 'cors';
import api from './router';

const app = express();
app.use(cors());
app.use('/api' , api);

export default app;
