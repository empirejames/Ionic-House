var admin = require('firebase-admin');

var serviceAccount = require('D:\\IonicProject\\devdactic-simpleLogin\\SDK.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ionichouse.firebaseio.com'
});

var registrationToken = 'dwAZJ2Jn9K0:APA91bHtnTromS1l8FRmhQYgDuVWOUN6L6W-f5rn4RdS4y4oLvfR_RS9Ig9F-1DkSQntVgMGfoKRpMRkuRIKraGG15aAu7CTaOgodoUWtg2kSwBMcN_RkKoVPMBxfnJ5NTj11PlCIF3o';

// See documentation on defining a message payload.
var message = {
  data: {
     title: "Test Notification",
        body: "APP start Success",
        surveyID : "asdasdasdasdasdasdasd"
  },
  token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });