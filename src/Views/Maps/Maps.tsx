import React from 'react'
import { GoogleMap, LoadScript} from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 4.637865,
  lng: -74.084634
};

const options ={
    streetViewControl: false
};


const Maps:React.FC = () => {

    function onLoad(){
        console.log("Se ha cargado el hp mapa");
    }

    return(
        <LoadScript googleMapsApiKey="AIzaSyDPCiexFmQYEsMsRne5RlWnNQ0qgABxBWk">
            <GoogleMap options={options} onLoad={onLoad} mapContainerStyle={containerStyle} center={center} zoom={10}> 
        
            </GoogleMap>
        </LoadScript>
        ); 
}

export default Maps;