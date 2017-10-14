import React from 'react';
import {Gmaps, Circle} from 'react-gmaps';

const params = {v: '3.exp', key: 'AIzaSyDmYQLTPwsDPtErGWTgiejz17QCw39MEVQ'};

class MapContainer extends React.Component {

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    const {lat, lng} = this.props

    return (
      <Gmaps
        width={'786.66667px'}
        height={'500px'}
        lat={lat}
        lng={lng}
        zoom={15}
        loadingMessage={'Be happy'}
        params={params}
        onMapCreated={this.onMapCreated}>
        <Circle
          lat={lat}
          lng={lng}
          radius={200}
          draggable={false}
          onDragEnd={this.onDragEnd} />
      </Gmaps>
    );
  }
};

export default MapContainer
