import { Router } from 'express';
import { firestore, realtime_database } from '../firebase';
import moment from 'moment-timezone';

const fs = firestore.collection('embedded');
const embedded = Router();

const getTime = time => {
  return time.hour() * 3600 + time.minute() * 60 + time.second();
};

const checkWhitelist = condition => {
  if (condition.whitelist) {
    return true;
  } else if (condition.from && condition.to) {
    const current = moment().tz('Asia/Bangkok');
    const from = moment(new Date(condition.from)).tz('Asia/Bangkok');
    const to = moment(new Date(condition.to)).tz('Asia/Bangkok');
    return getTime(current) < getTime(to) && getTime(current) > getTime(from);
  } else {
    return false;
  }
};

embedded.get('/', async (req, res) => {
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

embedded.post('/open/:doorID', async (req, res) => {
  const doorID = req.params['doorID'];
  try {
    const condition = (await fs.doc(doorID).get()).data();
    console.log(condition);
    const update_value = checkWhitelist(condition)
      ? {
          status: 'open',
          action: 'dismiss',
        }
      : {
          status: 'open',
          action: 'wait',
        };
    console.log(update_value);
    const update_status = realtime_database
      .ref(`embedded/${doorID}`)
      .update(update_value);
    const update_transaction = realtime_database
      .ref(`embedded_transactions/${doorID}`)
      .push({
        doorID,
        ...update_value,
        createdAt: new Date().toISOString(),
        from: 'Embedded system',
      });
    await Promise.all([update_status, update_transaction]);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

embedded.post('/close/:doorID', async (req, res) => {
  const doorID = req.params['doorID'];
  try {
    const condition = (await fs.doc(doorID).get()).data();
    const update_value = checkWhitelist(condition)
      ? {
          status: 'close',
          action: 'dismiss',
        }
      : {
          status: 'close',
          action: 'wait',
        };
    const update_status = realtime_database.ref(`embedded/${doorID}`).update(update_value);
    const update_transaction = realtime_database
      .ref(`embedded_transactions/${doorID}`)
      .push({
        doorID,
        ...update_value,
        createdAt: new Date().toISOString(),
        from: 'Embedded system',
      });
    await Promise.all([update_status, update_transaction]);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default embedded;
