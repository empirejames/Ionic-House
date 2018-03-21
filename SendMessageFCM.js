var admin = require('firebase-admin');

var serviceAccount = require('D:\\IonicProject\\devdactic-simpleLogin\\SDK.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ionichouse.firebaseio.com'
});

var registrationToken = 'd4z_JFbcTcE:APA91bH781ZuUIagmy7DRBm6mZ2WNNi7w57HoELM3OGVCOp2-y8KCKvfgWWjPAwsP7qUoQKixS3VTkkSSkxuGtsVgRYBFesyMeGD_bVAUD-V0JXTfNFnj0bgOv_sezvQ2F3_UsjaH7nC';

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