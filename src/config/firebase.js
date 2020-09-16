import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB9YDAwa4qGJWjkcGoithEARpBBKmMhNo4",
    authDomain: "lempermas-d58f1.firebaseapp.com",
    databaseURL: "https://lempermas-d58f1.firebaseio.com",
    projectId: "lempermas-d58f1",
    storageBucket: "lempermas-d58f1.appspot.com",
    messagingSenderId: "237576786203",
    appId: "1:237576786203:web:51db33ba964257ca5bc3be",
    measurementId: "G-TT8X9TFPRJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)


const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()



export { db, auth, storage }