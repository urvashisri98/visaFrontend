
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC98JlkARfdvl7JMQYqgx_MkKCLmWoQSBg",
  authDomain: "visaapp-74745.firebaseapp.com",
  projectId: "visaapp-74745",
  storageBucket: "visaapp-74745.appspot.com",
  messagingSenderId: "414938608691",
  appId: "1:414938608691:web:cad2219b6060c45ac39f46"
};


const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setFcmToken) => {
  return getToken(messaging, {vapidKey: 'BLW9806BX6xtQeXPKH9kV-2FVr7rWEg-YahRMrGQ3j05OPzBJPpCVLTtxHzy9rcN7UypKmg9y-HDd3AAdU87RNw'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setFcmToken(currentToken);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setFcmToken(null);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});