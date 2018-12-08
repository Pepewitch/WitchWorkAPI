import * as admin from 'firebase-admin';
import { Firestore } from '@google-cloud/firestore';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const firestore = new Firestore();
firestore.settings({ timestampsInSnapshots: true });
export default firestore;