// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');
 
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
    .onWrite(event => {
      // DB 에 저장되는 값을 아래와 같이 event.data.val() 로 가졍한다.
      const original = event.data.val();
      console.log('Uppercasing', event.params.pushId, original);
      const uppercase = original.toUpperCase();
      // Database 에 쓰기를 하는 경우, 반드시 Promise 를 리턴해야 한다.
      // 아래에서 .set() 은 실제로 Promise 를 리턴한다.
      return event.data.ref.parent.child('uppercase').set(uppercase);
    });

