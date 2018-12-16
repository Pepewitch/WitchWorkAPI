import * as admin from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://myworkspace-4ef9e.firebaseio.com'
});

const firestore = new Firestore();
firestore.settings({ timestampsInSnapshots: true });
export { firestore };

const realtime_database = admin.database();
export { realtime_database };

export { admin };