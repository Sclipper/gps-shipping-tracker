import React, { Component } from 'react';
import * as firebase from 'firebase';
import MyMapComponent from './MainFragmentPureComponents/map';

class MainFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 0,
      latitude: 0,
      isMarkerShown: false,
    }
  }

  componentWillMount() {
    const rootRefLong = firebase.database().ref('Longitude');

    rootRefLong.on('value', snap => {
      console.log(snap.val());
      this.setState({
        longitude: snap.val()
      });
    });

    const rootRefLat = firebase.database().ref('Latitude');

    rootRefLat.on('value', snap => {
      console.log(snap.val());
      this.setState({
        latitude: snap.val()
      });
    });

    this.delayedShowMarker()

  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }


  render() {
    return (
      <div className="App">

        <h1> The truck starting from: {this.state.latitude} and ending at: {this.state.longitude} "Another location" is currently here.</h1>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
          Longitude = {this.state.longitude}
          Latitude = {this.state.latitude}
        />
      </div>
    );
  }
}

export default MainFragment;
