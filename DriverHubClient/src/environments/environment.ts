import { domain, clientId } from '../../auth_config.json';

export const environment = {
  baseUrl: 'http://localhost:5270',
  production: false,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
  },
};


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD_bx6H7qBP7aL20LK157B2dFyHvJHWthM",
//   authDomain: "driver-hub-comp584.firebaseapp.com",
//   projectId: "driver-hub-comp584",
//   storageBucket: "driver-hub-comp584.firebasestorage.app",
//   messagingSenderId: "889314023537",
//   appId: "1:889314023537:web:9c13eba750da29d1d8a3d0",
//   measurementId: "G-HQJ1YR0B62"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);