import firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyDDviAUQwSpgHRA4LwA6AB9Ot36lbXk-sA",
    authDomain: "manchaster-city.firebaseapp.com",
    databaseURL: "https://manchaster-city.firebaseio.com",
    projectId: "manchaster-city",
    storageBucket: "manchaster-city.appspot.com",
    messagingSenderId: "536590644520",
    appId: "1:536590644520:web:14234649221e26d065cc1d"
};
firebase.initializeApp(firebaseConfig);

const firebaseDatabse = firebase.database()
const matches = firebaseDatabse.ref('matches')
const promotions = firebaseDatabse.ref('promotions')
const firebaseTeams = firebaseDatabse.ref('teams')
const firebasePlayers = firebaseDatabse.ref('players')

export {
    firebase, matches, promotions, firebaseTeams, firebaseDatabse, firebasePlayers
}
