import { Router } from 'express';
import { firestore, realtime_database } from '../firebase';
const api = Router();

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

api.get('/embedded', async (req, res) => {
  try {
    const snapshot = await realtime_database.ref('embedded').once('value');
    const dict = snapshot.val();
    const items = [];
    for (const key in dict) {
      if (dict.hasOwnProperty(key)) {
        const element = dict[key];
        items.push(element);
      }
    }
    res.status(200).send({ items });
  } catch (error) {
    res.status(500).send({ error });
  }
});

api.post('/embedded/open/:doorID', async (req, res) => {
  const doorID = req.params['doorID'];
  try {
    await realtime_database.ref(`embedded/${doorID}`).update({
      status: 'open',
      action: 'wait',
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

api.post('/embedded/close/:doorID', async (req, res) => {
  const doorID = req.params['doorID'];
  try {
    await realtime_database.ref(`embedded/${doorID}`).update({
      status: 'close',
      action: 'wait',
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
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
