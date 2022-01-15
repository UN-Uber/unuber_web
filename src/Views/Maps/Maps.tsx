import React, { useState } from 'react';
import { GoogleMap, LoadScript , DirectionsService} from '@react-google-maps/api';


interface ITravel{
    response : string | null;
    origin: string;
    destination: string;
}


const Maps: React.FC = () => {
    
    const [travel, setTravel] = useState<ITravel>({
        response : null, origin : '' ,destination : ''
    })

    /*
    const directionCallBack = (response) => {
        console.log(response);
    }

    const onClick = (origin:string, destination:string) => {
        if (travel.origin !== '' && travel.destination !== '') {
            setTravel({...travel,  })
            }
    }

    const onMapClick =  (args) => {
        console.log('onClick args: ', args)
    }*/


    return (
        <div>
            <div> Map Selector</div>
            <div className='row'>
                <div className='col-md-6 col-lg-4'>
                    <div className='form-group'>
                        <label htmlFor="ORIGIN">Origin</label> <br/>
                        <input type="text" className='form-control' id='ORIGIN' value={travel.origin} />
                    </div>
                </div>

                <div className='col-md-6 col-lg-4'>
                    <div className='form-group'>
                        <label htmlFor='DESTINATION'>Destination</label><br/>
                        <input id='DESTINATION' className='form-control' type='text' value={travel.destination}/>
                    </div>
                </div>
            </div> 


            <LoadScript googleMapsApiKey='AIzaSyByZ4vjE0H-WVKko4mDSSUPgmS4Ez5jSQ4'>
                <GoogleMap zoom={25} id='service' options={{streetViewControl: false}}  mapContainerStyle={{height: '400px',width: '35%'}} center={{lat: 4.637865,lng: -74.084634}}> 
                </GoogleMap>
            </LoadScript> 
        </div>
    );
}

export default Maps;