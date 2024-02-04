import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const createInventory = functions.https.onRequest(async (req, res) => {
  try {
    const data = req.body;
    const result = await db.collection('inventory').add(data);
    return res.status(201).json({ id: result.id });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export const updateInventory = functions.https.onRequest(async (req, res) => {
  try {
    const { id, data } = req.body;
    await db.collection('inventory').doc(id).update(data);
    return res.status(200).send('Inventory updated successfully');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export const getInventory = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await db.collection('inventory').get();
    const inventory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export const deleteInventory = functions.https.onRequest(async (req, res) => {
  try {
    const id = req.params.id;
    await db.collection('inventory').doc(id).delete();
    return res.status(200).send('Inventory deleted successfully');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
