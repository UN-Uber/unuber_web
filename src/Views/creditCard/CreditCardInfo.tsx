import React, { useEffect, useState }from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import  TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

interface CreditCard{
    idCard: number,
    idClient: number,
    cardNumber: string,
    dueDate: string,
    cvv: number
}

interface Loading{
    loading: boolean;
    theError: any;
}

interface Toast{
    state: boolean,
    message: string
}

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app/";
//const apiLocal = "http://localhost:4000";


function updateCreditCard(token: string, cardInfo: CreditCard){
    return axios.post(uriGraphql, {
        query: `mutation Mutation($idCard: Int!, $card: CreditCardInput!) {
            updateCard(idCard: $idCard, card: $card)
        }`,
        variables: {
            idCard: cardInfo.idCard,
            card: {
                idClient: cardInfo.idClient,
                cardNumber: cardInfo.cardNumber,
                dueDate: cardInfo.dueDate,
                cvv: cardInfo.cvv
            }
        },
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).catch(error => console.log(error));
}

function deleteCreditCard(token: string, idCard: number){
    return axios.post(uriGraphql, {
        query: `mutation Mutation($idCard: Int!) {
            deleteCard(idCard: $idCard)
        }`,
        variables: {
            idCard: idCard,
        },
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).catch(error => console.log(error));
}

const creditCardInfo: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    var token = useSelector((state:RootState) => state.auth.user) as string;
    if(location.state == null){
        useEffect(() => {
            return () => {navigate("/wallet", {replace: true});};
        });
    }
    
    const [currentCardInfo, setCardInfo] = useState<CreditCard>({
        idCard: location.state['idCard'],
        idClient: location.state['idClient'],
        cardNumber: location.state['cardNumber'],
        dueDate: location.state['dueDate'],
        cvv: location.state['cvv']
    });

    const [newDueDate, setNewDueDate] = useState(currentCardInfo.dueDate);
    const [editEnable, setEditEnable] = useState(false);

    const [toastSuccess, setToastSuccess] = useState<Toast>({
        state: false,
        message: ""
    });
    const [toastError, setToastUpdateError] = useState<Toast>({
        state: false,
        message: ""
    });
    const [status, setStatus] = useState<Loading>({loading : true, theError: []});

    function updateCard() {
        setStatus({ ...status , loading :true });
        currentCardInfo.dueDate = newDueDate;
        updateCreditCard(token, currentCardInfo).then((data) => {
            setStatus({ ...status , loading :false });
            if(data.data.data.updateCard === '200'){
                setToastSuccess({
                    state: true,
                    message: "Tarjeta actualizada"
                });
                setTimeout(() => navigate("/wallet"), 2000);
            }
            else{
                setToastUpdateError({
                    state: true,
                    message: "Error al eliminar la tarjeta"
                });
                setEditEnable(false)
            }
        });
    }

    function deleteCard() {
        setStatus({ ...status , loading :true });
        deleteCreditCard(token, currentCardInfo.idCard).then((data) => {
            setStatus({ ...status , loading :false });
            if(data.data.data.deleteCard === '200'){
                setToastSuccess({
                    state: true,
                    message: "Tarjeta eliminada"
                });
                setTimeout(() => navigate("/wallet"), 2000);
            }
            else{
                setToastUpdateError({
                    state: true,
                    message: "Error al eliminar la tarjeta"
                });
                setEditEnable(false)
            }
        });
    }

    function checkDueDate(): boolean {

        if(newDueDate.length != 5) return false;

        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let year = parseInt(currentDate.getFullYear().toString().substring(2));

        let inputDateParts = newDueDate.split("/");

        if(year > parseInt(inputDateParts[1])) {
            return false;
        }
        else if(year === parseInt(inputDateParts[1])){
            if(month > parseInt(inputDateParts[0])){
                return false;
            }
        }

        return true;
    }

    function checkDataChange(): boolean{
        console.log(currentCardInfo.dueDate === newDueDate);
        if(currentCardInfo.dueDate === newDueDate){
            return true;
        }
        return false;
    }

    function showEditButtons(){
        return (
            <>
                <Button 
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }} 
                    onClick={() => setEditEnable(true)}
                >
                    Editar
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    sx={{ mt: 3 }}
                    onClick={() => deleteCard()}
                >
                    Eliminar
                </Button>
            </>
        );
    }

    function hideEditButtons(){
        return (
            <>
                <Button 
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                    onClick={() => updateCard()} 
                    disabled={checkDataChange()}
                >
                    Guardar
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3 }}
                    onClick={() => setEditEnable(false)}
                >
                    Cancelar
                </Button>
            </>
        );
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h4">
                        Información de la tarjeta
                    </Typography>
                <Box component="form" sx={{ mt: 5 }}>                    
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    disabled={true}
                    type="number" 
                    id="outlined-basic" 
                    label="tarjeta de crédito" 
                    variant="outlined"
                    value={currentCardInfo.cardNumber}
                    /*onChange={event => setCreditCard({...card, cardNumber: event.target.value})}
                    error={!checkCreditCardNumber()}
                    helperText={
                        checkCreditCardNumber()
                        ? ""
                        : "El número de la tarjeta no es válido"
                    }*/

                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    disabled={!editEnable}
                    label="fecha de vecimiento" 
                    variant="outlined"
                    value={newDueDate}
                    onChange={event => setNewDueDate(event.target.value)}
                    error={!checkDueDate()}
                    helperText={
                        !checkDueDate()
                        ? "La tarjeta está vencida"
                        : ""
                    }
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    disabled={true}
                    type="number"
                    id="outlined-basic num" 
                    label="cvv"
                    variant="outlined"
                    value={currentCardInfo.cvv}
                    /*onChange={event => setCreditCard({...card, cvv: event.target.value})}
                    error={checkCvv()}
                    helperText={
                        checkCvv()
                        ? "CVV no es válido"
                        : ""
                    }*/
                />
                {
                    !editEnable
                    ?  showEditButtons()
                    :  hideEditButtons()
                }

                {
                    toastSuccess.state
                    ? <Alert sx={{mt: 10}} variant="filled" severity="success">{toastSuccess.message}</Alert>
                    : null
                }

                {
                    toastError.state
                    ? <Alert sx={{mt: 10}}variant="filled" severity="error">{toastError.message}</Alert>
                    : null
                }
                </Box>
            </Box>
            </Container>
        </>
    );
}

export default creditCardInfo;