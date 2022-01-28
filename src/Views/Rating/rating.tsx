import { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
  1: 'Pésimo',
  2: 'Malo',
  3: 'Regular',
  4: 'Bueno',
  5: 'Excelente',
};

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app";

function updateUserCalif(inputValue:number){
    return axios.post(uriGraphql, {
        query:` mutation UserCalifInput($input: UserCalifInput) {
            createUserCalif(input: $input)
            } `,
        variables:{
            idnput: inputValue,
        },
    }, {
        headers:{
            'Content-Type': 'application/json',
        }
    });
}

   
const rating: React.FC = () => {
    const [currentValue, setCurrentValue] = useState<number>(3);
    const [hoverValue, setHoverValue] = useState(-1);
  
    return (
      <Box
        sx={{
            width: '98.9vw',
            height: '100vh',
            overflow: 'hidden'
        }}
      >
        <Container component="main" maxWidth="xs" sx={{marginTop: 8, py: 6}}>
          <CssBaseline />
          <Box
            sx={{
                px: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="inherit">Calificación</Typography>
            <Typography component="h4" variant="subtitle1" sx={{mt: 2}}>
              Por favor selecciona una calificación en la escala de 1 a 5 estrellas.
            </Typography>
            <Rating
              sx={{mt: 2}}
              value={currentValue}
              precision={1}
              size="large"
              onChange={(event, newValue) => {
                newValue !== null
                ? setCurrentValue(newValue)
                : setCurrentValue(3)
              }}
              onChangeActive={(event, newHover) => {
                setHoverValue(newHover);
              }}
              icon={<StarIcon sx={{fontSize: 40, color: "#ff9933"}} />}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} sx={{fontSize: 40}} />}
            />
            
            {currentValue !== null && (
              <Box sx={{ ml: 2, mt: 2, mb: 4 }}>{labels[hoverValue !== -1 ? hoverValue : currentValue]}</Box>
            )}
      
            <Button variant="contained" fullWidth onClick={() => updateUserCalif(currentValue)}>
              Enviar calificación
            </Button>

          </Box>
        </Container>
      </Box>
    );
}

export default rating;
