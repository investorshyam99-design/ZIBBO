import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { products } from './src/data';
import firebaseConfig from './firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function seed() {
  console.log('Seeding products...');
  for (const product of products) {
    try {
      await setDoc(doc(db, 'products', product.id), product);
      console.log(`Seeded ${product.id}`);
    } catch (err) {
      console.error(`Failed to seed ${product.id}`, err);
    }
  }
  console.log('Seeding complete.');
  process.exit(0);
}

seed();
