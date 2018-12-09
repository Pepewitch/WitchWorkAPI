import express from 'express';
import firestore from './firestore';

const app = express();

app.get('/api/ping', (req, res) => {
  return res.status(200).send({ message: 'PONG' });
});

app.get('/api', (req, res) => {
  return res.status(200).send({ message: 'Hello World' });
});

app.post('/api', (req, res) => {
  console.log(req.query);
  console.log(req.body.t1);
  return res.sendStatus(200);
});

app.get('/api/db', async (req, res) => {
  const test = firestore.collection('test');
  (await test.get()).forEach(e => {
    console.log(e.data());
  });
  return res.status(200).send({ message: 'GET snapshot' });
});

app.post('/api/db', async (req, res) => {
  const test = firestore.collection('test');
  const result = await test.add({ a: req.query || Math.random() });
  console.log(result);
  return res.sendStatus(200);
});
export default app;
