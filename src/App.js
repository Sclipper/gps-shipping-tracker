import React, { Component } from 'react';
import './App.css';
import MainFragment from './Components/MainFragment/MainFragment'
import Authenticate from './Components/Authenticate/Authenticate'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    return (
      <div className="App">
      {/*<MainFragment/>*/}
      <Authenticate/>
      </div>
    );
  }
}

export default App;
