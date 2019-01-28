import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDquBB_qzbecZwiOST9L8uIzLa_9iAbOhM",
    authDomain: "gps-shipping-tracker.firebaseapp.com",
    databaseURL: "https://gps-shipping-tracker.firebaseio.com",
    projectId: "gps-shipping-tracker",
    storageBucket: "gps-shipping-tracker.appspot.com",
    messagingSenderId: "810335518069"
  };

   firebase.initializeApp(config);


ReactDOM.render(<App />, document.getElementById('root'));