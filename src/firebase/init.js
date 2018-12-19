// npm install firebase
import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDroEN3-nzNmuiTVX9XEGZ1gx-6gvK16Jc",
    authDomain: "spotify-playlist-designer.firebaseapp.com",
    databaseURL: "https://spotify-playlist-designer.firebaseio.com",
    projectId: "spotify-playlist-designer",
    storageBucket: "spotify-playlist-designer.appspot.com",
    messagingSenderId: "1076322881860"
  };
  const firebaseApp = firebase.initializeApp(config)
  // firebaseApp.firestore().settings({ timestampInSnapshots: true })


  const firestoreApp = firebaseApp.firestore();
  const settings = { timestampsInSnapshots: true};
  firestoreApp.settings(settings);


  // initializing firestore (export firebase database)
  export default firestoreApp
