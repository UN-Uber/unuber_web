import React, { useEffect, useState }from "react";
import { useUpdateEffect } from "react-use";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import  TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from "react-input-mask";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

interface CreditCardCreate{
    cardNumber: string,
    dueDate: string,
    cvv: string
}

interface Loading{
    loading: boolean;
    theError: any;
}

interface Toast{
    state: boolean,
    message: string
}

interface FormErrors{
    cardNumber: boolean,
    dueDate: boolean,
    cvv: boolean
}

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app/";
const apilocal = "http://localhost:4000";

function createCreditCard(token: string, id: number, creditCard: CreditCardCreate){
    return axios.post(uriGraphql, {
        query: `mutation Mutation($card: CreditCardInput!) {
            createCard(card: $card) {
              response
            }
        }`,
        variables: {
            card: {
                idClient: id,
                cardNumber: `${creditCard.cardNumber}`,
                dueDate: `${creditCard.dueDate}`,
                cvv: parseInt(creditCard.cvv)
            }
        },

    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).catch(error => console.log(error));

}

const AddCreditCard: React.FC = () => {
    let navigate = useNavigate();

    var token = useSelector((state:RootState) => state.auth.user) as string;
    var id = useSelector((state:RootState) => state.auth.id);

    const [card, setCreditCard] = useState<CreditCardCreate>({
        cardNumber: "",
        dueDate: "",
        cvv: ""
    });

    const [status, setStatus] = useState<Loading>({
        loading: false,
        theError: []
    });

    const [toastSuccess, setToastSuccess] = useState<Toast>({
        state: false,
        message: ""
    });
    const [toastError, setToastError] = useState<Toast>({
        state: false,
        message: ""
    });

    const [formValidationError, setFormValidationError] = useState<FormErrors>({
        cardNumber: false,
        dueDate: false,
        cvv: false
    });	

    function addCreditCard(){


        setStatus({ ...status, loading: true});
        createCreditCard(token, id, card).then((data) => {
            setStatus({ ...status, loading: false});
            if(data.data.data.createCard.response == "Card already register"){
                setToastError({
                    state: true,
                    message: "La tarjeta ya está registrada"
                });
            }
            else{
                setToastError({
                    state: true,
                    message: "Tarjeta registrada"
                });
                setTimeout(() => navigate("/wallet"));
            }
        }).catch((e) => {
            console.log(e);
        });
    }

    function checkCreditCardNumber(): boolean {
        let regex = /^([4-5]{1}[0-9]{15})$/;
        if(!regex.test(card.cardNumber)) return false;
        let number = card.cardNumber;

        let sum = 0;
        for(let i = 0; i < number.length; i++){
            let digit = parseInt(number[number.length - i - 1]);

            if(i % 2 == 1) digit *= 2;

            sum += digit > 9 ? (digit - 9) : digit;
        }

        if(sum % 10 === 0) return true;
        
        return false;
    }

    function checkDueDate(): boolean {

        if(card.dueDate.length != 5) return false;

        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let year = parseInt(currentDate.getFullYear().toString().substring(2));

        let inputDateParts = card.dueDate.split("/");

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

    function checkCvv(): boolean {
        let regex = /^([0-9]{3})$/;
        return !regex.test(card.cvv);
    }

    useUpdateEffect(() => {
        if(!checkCreditCardNumber()){
            setFormValidationError({...formValidationError, cardNumber: true});
        }
        else{
            setFormValidationError({...formValidationError, cardNumber: false});
        }
    }, [card.cardNumber]);

    useUpdateEffect(() => {
        if(!checkDueDate()){
            setFormValidationError({...formValidationError, dueDate: true});
        }
        else{
            setFormValidationError({...formValidationError, dueDate: false});
        }
    }, [card.dueDate]);

    useUpdateEffect(() => {
        if(!checkCvv()){
            setFormValidationError({...formValidationError, cvv: true});
        }
        else{
            setFormValidationError({...formValidationError, cvv: false});
        }
    }, [card.cvv]);

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
                    Registrar tarjeta
                </Typography>
                <Box component="form" sx={{ mt: 5 }}>
                <InputMask 
                    mask="9999 9999 9999 9999"
                    maskPlaceholder=" "
                    alwaysShowMask={false}
                    onChange={event => setCreditCard({...card, cardNumber: event.target.value.replaceAll(" ","")})}
                >
                    <TextField 
                        required
                        fullWidth
                        margin="normal" 
                        label="tarjeta de crédito" 
                        variant="outlined"
                        error={formValidationError.cardNumber}
                        helperText={
                            formValidationError.cardNumber
                            ? "El número de la tarjeta no es válido"
                            : ""
                        }               
                    />
                </InputMask>

                <InputMask 
                    mask="99/99"
                    maskPlaceholder={null}
                    alwaysShowMask={false}
                    onChange={event => setCreditCard({...card, dueDate: event.target.value})}
                >
                    <TextField 
                        required 
                        margin="normal"
                        fullWidth 
                        label="fecha de vecimiento" 
                        variant="outlined"
                        error={formValidationError.dueDate}
                        helperText={
                            formValidationError.dueDate
                            ? "La tarjeta está vencida"
                            : ""
                        }
                    />
                </InputMask>

                <InputMask 
                    mask="999"
                    maskPlaceholder={null}
                    alwaysShowMask={false}
                    onChange={event => setCreditCard({...card, cvv: event.target.value})}
                >
                    <TextField 
                        required
                        margin="normal"
                        fullWidth
                        label="cvv"
                        variant="outlined"
                        error={formValidationError.cvv}
                        helperText={
                            formValidationError.cvv
                            ? "CVV no es válido"
                            : ""
                        }
                    />
                </InputMask>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}  
                    onClick={addCreditCard}
                >
                    Enviar
                </Button>

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

export default AddCreditCard;