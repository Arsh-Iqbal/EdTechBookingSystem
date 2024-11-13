// db.js
const admin = require('firebase-admin');
const serviceAccount = require('../edtechbooking-firebase-adminsdk-3qmzs-bcb4a787f4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
