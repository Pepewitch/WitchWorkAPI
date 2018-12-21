import express from 'express';
import cors from 'cors';
import api from './router';
import morgan = require('morgan');

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use('/api', api);

export default app;
