import React from 'react'
import { GoogleMap, LoadScript , Autocomplete, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import { useState } from 'react';
import { Button, Container } from "react-bootstrap";

interface iTravel{
    origin: string;
    destination:string;
    travelMode: string;
};

const options ={
    streetViewControl: false
};

interface Loading{
    travel: boolean;
    account: boolean;
}

interface iResponse{
    response: object
};

function useForceUpdate(){
    const [value, setValue] = useState(0); 
    return () => setValue(value => value + 1); 
}

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

const AditionalMap:React.FC = () => {

    const [center, setCenter] = useState<iCenter>({
        lat: 4.637865,
        lng: -74.084634
    })

    const onLoad = ref => {
        console.log("Se ha cargado el mapa");
        setMap(ref);
    }

    const [map, setMap] = useState(null);
    const [searchBoxOrigin, setSearchBoxOrigin] = useState(null);
    const [searchBoxDes, setSearchBoxDes] = useState(null);
    const [status, setStatus] = useState<Loading>({travel : false, account :false})


    const [travel, setTravel] = useState<iTravel>({
        travelMode: 'DRIVING',
        origin: '',
        destination: ''
    });

    const [responseM, setResponse] = useState<iResponse>({
        response:{}
    })

    const onLoadOrigin = ref => {setSearchBoxOrigin(ref)}

    const onLoadDes = ref => {setSearchBoxDes(ref)}

    const directionsCallback = (response) => {
        if(response !== null){
            if(response.status === 'OK'){
                setResponse({...responseM, response:response});
            }
        }
    }

    const forceUpdate = useForceUpdate();

    const  onPlacesChangedOrigin = () => {
        const placeO = searchBoxOrigin.getPlace();
        travel.origin = placeO.name;
        forceUpdate();
    };
  
    const  onPlacesChangedDes = () => {
        const placeD = searchBoxDes.getPlace();
        travel.destination = placeD.name;
        forceUpdate();
    };

    function travelButt(){
        setStatus({...status, travel: true});
    }

    return(
        <>
            <h1>Mapas adicionales</h1>
            <div className='map'>
                <LoadScript googleMapsApiKey="AIzaSyDPCiexFmQYEsMsRne5RlWnNQ0qgABxBWk" libraries={["places"]}>
                <Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlacesChangedOrigin}>
                    <input type="text" placeholder="Origin" style={inputSyle}   />
                </Autocomplete>
                <Autocomplete  onLoad={onLoadDes} onPlaceChanged={onPlacesChangedDes}>
                    <input type="text" placeholder="Destination" style={inputSyle} />
                </Autocomplete>
                <Button type="button" className="btn btn-primary col-lg" onClick={travelButt}>Start</Button>
                {(travel.origin !== '' && travel.destination !== '' && status.travel) && (
                    <GoogleMap options={options} onLoad={onLoad} mapContainerStyle={{
                        height: '500px',
                        width: '65%'
                    }}>
                        <DirectionsService options={travel} callback={directionsCallback} />
                        {responseM.response  && (
                        <DirectionsRenderer  options={{directions:responseM.response}}/>
                        )}
                    </GoogleMap>
                )}
                </LoadScript>
            </div>       
        </>
    );

}

export default AditionalMap;
