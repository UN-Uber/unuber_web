import React from 'react'
import { GoogleMap, LoadScript , Autocomplete, DirectionsService, DirectionsRenderer, Marker} from '@react-google-maps/api';
import { useState } from 'react';

interface iTravel{
  origin: string;
  destination:string;
  travelMode: string;
}

interface iCenter {
  lat: number;
  lng: number;
};

interface iResponse{
  response: object
}

function useForceUpdate(){
  const [value, setValue] = useState(0); 
  return () => setValue(value => value + 1); 
}


const options ={
    streetViewControl: false
};

const inputSyle = {
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `10px 12px 5px 5px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: "relative",
  left: "80%",
  marginLeft: "-120px"
}

const Maps:React.FC = () => {

    const onLoad = ref => {
        console.log("Se ha cargado el mapa");
        setMap(ref);
    }

    const [center, setCenter] = useState<iCenter>({
      lat: 4.637865,
      lng: -74.084634
    })

    const [originPo, setOriginPo] = useState<iCenter>({
      lat: 0,
      lng: 0
    });
    const [desPo, setDesPo] = useState<iCenter>({
      lat: 0,
      lng: 0
    });

    const [map, setMap] = useState(null);
    const [searchBoxOrigin, setSearchBoxOrigin] = useState(null);
    const [searchBoxDes, setSearchBoxDes] = useState(null);

    const [travel, setTravel] = useState<iTravel>({
      travelMode: 'DRIVING',
      origin: '',
      destination: ''
    });

    const [responseM, setResponse] = useState<iResponse>({
      response:{}
    })

    const  onPlacesChangedOrigin = () => {
      const placeO = searchBoxOrigin.getPlace();
      if(!placeO.geometry || !placeO.geometry.location){
        alert("no details for "+placeO.name);
        return;
      }
      if (placeO.geometry.viewport) {
        originPo.lat = placeO.geometry.viewport.Ab.g;
        originPo.lng = placeO.geometry.viewport.Ra.g;
        center.lat = placeO.geometry.viewport.Ab.g;
        center.lng = placeO.geometry.viewport.Ra.g;

      } else {
        originPo.lat = placeO.geometry.location.Ab.g;
        originPo.lng = placeO.geometry.location.Ra.g;
        center.lat = placeO.geometry.location.Ab.g;
        center  .lng = placeO.geometry.location.Ra.g;
      }
      travel.origin = placeO.name;
      forceUpdate();
    };

    const  onPlacesChangedDes = () => {
        const placeD = searchBoxDes.getPlace();
        if(!placeD.geometry || !placeD.geometry.location){
          alert("no details for "+placeD.name);
          return;
        }
        if (placeD.geometry.viewport) {
          desPo.lat = placeD.geometry.viewport.Ab.g;
          desPo.lng = placeD.geometry.viewport.Ra.g;
        } else {
          desPo.lat = placeD.geometry.location.Ab.g;
          desPo.lng = placeD.geometry.location.Ra.g;
        }
        travel.destination = placeD.name;
        forceUpdate();
      };

    const forceUpdate = useForceUpdate();

    const onLoadOrigin = ref => {setSearchBoxOrigin(ref)}

    const onLoadDes = ref => {setSearchBoxDes(ref)}

    const directionsCallback = (response) => {
      if(response !== null){
        if(response.status === 'OK'){
          setResponse({...responseM, response:response});
        }else{
          console.log(response);
        }
      }
    }

    return(
      <>
      <div className='map container'>
            
            <LoadScript googleMapsApiKey="AIzaSyDPCiexFmQYEsMsRne5RlWnNQ0qgABxBWk" libraries={["places"]}>
            <GoogleMap options={options} onLoad={onLoad} mapContainerStyle={{
              height: '500px',
              width: '65%'
            }} center={center} zoom={10} id='map' > 
              <Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlacesChangedOrigin} >
              <input type="text" placeholder="Origin" style={inputSyle}   />
              </Autocomplete>

              <Autocomplete  onLoad={onLoadDes} onPlaceChanged={onPlacesChangedDes} >
              <input type="text" placeholder="Destination" style={inputSyle} />
              </Autocomplete>

              {originPo.lat && (
                <div>{(originPo.lat !== 0)?(
                  <Marker position={originPo} >
                  </Marker>
                ):""}</div>
              )}
              {desPo.lat && (
                <div>{(desPo.lat !== 0)?(
                  <Marker position={desPo} >
                  </Marker>
                ):""}</div>
              )}

              {(travel.origin !== '' && travel.destination !== '') && (
                <DirectionsService options={travel} callback={directionsCallback} />
              )}
              {responseM.response  && (
                <DirectionsRenderer  options={{directions:responseM.response}}/>
              )}
            </GoogleMap>
        </LoadScript>
      
      </div>
      </>
        ); 
}

export default Maps;