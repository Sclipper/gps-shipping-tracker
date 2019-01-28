import React from 'react';
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './css/Authenticate.css';

class Authenticate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
    };
  }

  handleClose = () => {
    this.setState({ open: false });


  };

  handleLogIn = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);

    /**
     * Catches imput errors by the user like badly formatted email etc...
     * This is the worst way to deal with a problem, but due time issues it had to be done
     * **/
    //TODO Add Redux To The Project
    promise
      .catch(e => {alert(e.message); window.location.reload();});

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        localStorage.setItem('user', firebaseUser.email);
        alert('Log In successful');
      }
      else
        console.log('Could nto sign in');
    });

    this.handleClose();
  }

  handleSignIn = () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);

    /**
     * Catches imput errors by the user like badly formatted email etc...
     * This is the worst way to deal with a problem, but due time issues it had to be done
     * **/
    //TODO Add Redux To The Project
    promise
      .catch(e => {alert(e.message); window.location.reload();});

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
        console.log(firebaseUser);
        localStorage.setItem('user', firebaseUser.email);
        alert('SignIn successful');
      }
      else
        console.log('Could nto sign in');
    });

    this.handleClose();
  }

  render() {
    return (
      <div>
          <h1 id="form-dialog-title">Log In</h1>
            <p>
              Log in or Sign In with email and password.
            </p>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogIn} color="primary">
              Log In
            </Button>
            <Button onClick={this.handleSignIn} color="primary">
              Sign In
            </Button>
      </div>
    );
  }
}
export default Authenticate;
