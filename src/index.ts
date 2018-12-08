import * as functions from 'firebase-functions';
import firestore from './firestore';
import express from 'express';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//


const app = express();

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

export const witchwork = functions.https.onRequest(app);
