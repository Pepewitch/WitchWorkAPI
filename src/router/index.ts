import { Router } from 'express';
import embedded from './embedded';

const api = Router();

api.use('/embedded' , embedded);

api.get('/ping', (req, res) => {
  return res.status(200).send({ message: 'PONG' });
});

api.get('/', (req, res) => {
  return res.status(200).send({ message: 'Hello World' });
});

api.post('/', (req, res) => {
  console.log(req.query);
  console.log(req.body.t1);
  return res.sendStatus(200);
});

// api.get('/db', async (req, res) => {
//   const test = firestore.collection('test');
//   (await test.get()).forEach(e => {
//     console.log(e.data());
//   });
//   return res.status(200).send({ message: 'GET snapshot' });
// });

// api.post('/db', async (req, res) => {
//   const test = firestore.collection('test');
//   const result = await test.add({ a: req.query || Math.random() });
//   console.log(result);
//   return res.sendStatus(200);
// });

export default api;
