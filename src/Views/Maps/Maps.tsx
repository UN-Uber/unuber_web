import React from 'react'
import { GoogleMap, LoadScript , Autocomplete, DirectionsService, DirectionsRenderer, Marker} from '@react-google-maps/api';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import UberCar from '../../assets/UberX.png';
import mapStyle from './MapStyle.json';

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
  streetViewControl: false,
  fullscreenControl:false,
  mapTypeControl: false,
  styles: mapStyle,
};

const cardStyle = {
  display: 'flex',
  direction: "row",
  justifyContent: "space-around",
  alignItems:"stretch",
  bgcolor: '#F3F3F3',
  my: 1.5,
  transition: '0.3s',
  "&:hover": {
    bgcolor: "#E3E3E3",
    cursor: 'pointer'
  }
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
      <Box
        sx={{
          width: '98.9vw',
          height: '90vh',
          overflow: 'hidden',
          position: "relavite"
        }}
      >
        <CssBaseline />
        <LoadScript googleMapsApiKey="AIzaSyDPCiexFmQYEsMsRne5RlWnNQ0qgABxBWk" libraries={["places"]}>
          <GoogleMap options={options} onLoad={onLoad} mapContainerStyle={{
            height: '100%',
            width: '100%'
          }} center={center} zoom={15}> 

            {/* Pone marcadores donde no debería  */}
            {/*originPo.lat && (
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
              )*/}

            {(travel.origin !== '' && travel.destination !== '') && (
              <DirectionsService options={travel} callback={directionsCallback} />
            )}
            {responseM.response  && (
              <DirectionsRenderer  options={{directions:responseM.response}}/>
            )}

          </GoogleMap>
          <Box
            component="form"
            sx={{
              px: 6,
              mr: 4,
              bgcolor: '#FFFFFF',
              position: 'absolute',
              top: 110,
              right: 10,
              width: '380px',
              height: '65%',
              overflow: 'scroll',
              overflowX: 'hidden'
            }}
          >
            <Autocomplete onLoad={onLoadOrigin} onPlaceChanged={onPlacesChangedOrigin} >
              <TextField fullWidth sx={{mt: 6}} margin="normal" type="text" label="Origen" />
            </Autocomplete>

            <Autocomplete onLoad={onLoadDes} onPlaceChanged={onPlacesChangedDes} >
              <TextField fullWidth margin="normal" type="text" label="Destino" />
            </Autocomplete>

            <Grid 
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {/* Cambiar por un map() cuando se implemente la query sobre los costos según el 
                  tipo de Uber */}
              <Grid item sx={{width: '100%'}}>
                <Card sx={cardStyle} onClick={() => alert("Hola")}>
                  <CardMedia sx={{p: 1}}>
                    <img className="uber-car" src={UberCar}/>
                  </CardMedia>
                  <CardContent>
                    <Typography sx={{pt: 1, fontSize: 16, fontWeight: 500}}>
                      UberX
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography sx={{pt: 1, fontSize: 16, fontWeight: 700}}>
                      $20.000
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item sx={{width: '100%'}}>
                <Card sx={cardStyle}>
                  <CardMedia sx={{p: 1}}>
                    <img className="uber-car" src={UberCar}/>
                  </CardMedia>
                  <CardContent>
                    <Typography sx={{pt: 1, fontSize: 16, fontWeight: 500}}>
                      UberX
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography sx={{pt: 1, fontSize: 16, fontWeight: 700}}>
                      $20.000
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item sx={{width: '100%'}}>
                <Card sx={cardStyle}>
                  <CardMedia sx={{p: 1}}>
                    <img className="uber-car" src={UberCar}/>
                  </CardMedia>
                  <CardContent>
                    <Typography sx={{pt: 1, fontSize: 16, fontWeight: 500}}>
                      UberX
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography sx={{pt: 1, fontSize: 16, fontWeight: 700}}>
                      $20.000
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item sx={{width: '100%'}}>
                <Card sx={cardStyle}>
                  <CardMedia sx={{p: 1}}>
                    <img className="uber-car" src={UberCar}/>
                  </CardMedia>
                  <CardContent>
                    <Typography sx={{pt: 1, fontSize: 16, fontWeight: 500}}>
                      UberX
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography sx={{pt: 1, fontSize: 16, fontWeight: 700}}>
                      $20.000
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Button 
              fullWidth
              onClick={() => {}}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Pedir viaje
            </Button>
          </Box>
        </LoadScript>      
      </Box>
    ); 
}

export default Maps;