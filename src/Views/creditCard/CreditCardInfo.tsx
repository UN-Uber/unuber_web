import React, { useEffect, useState }from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import  TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface CreditCard{
    idCard?: number,
    idClient?: number,
    cardNumber?: string,
    dueDate?: string,
    cvv?: number
}

interface Loading{
    loading: boolean;
    theError: any;
}

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app/";
const apiLocal = "http://localhost:4000";


function updateCreditCard(token: string, cardInfo: CreditCard){
    return axios.post(apiLocal, {
        query: `mutation Mutation($idCard: Int!, $card: CreditCardInput!) {
            updateCard(idCard: $idCard, card: $card)
        }`,
        variables: {
            idCard: cardInfo.idCard,
            card: {
                idClient: cardInfo.idClient,
                cardNumber: cardInfo.cardNumber,
                dueDate: cardInfo.dueDate,
                cvv: cardInfo.dueDate
            }
        },
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).catch(error => console.log(error));
}

function deleteCard(token: string, idCard: number){
    return axios.post(apiLocal, {
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
    var id = useSelector((state:RootState) => state.auth.id);

    if(location.state == null){
       useEffect(() => {
            navigate("/wallet", {replace: true});
       });
    }
    
    const [currentCardInfo, setCardInfo] = useState<CreditCard>({
        idCard: location.state['idCard'],
        idClient: location.state['idClient'],
        cardNumber: location.state['cardNumber'],
        dueDate: location.state['dueDate'],
        cvv: location.state['cvv']
    });

    
    console.log(currentCardInfo);
    return (
        <div className="container">
            <form>
                <TextField 
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
                    required
                    disabled={true}
                    id="outlined-basic" 
                    label="fecha de vecimiento" 
                    variant="outlined"
                    value={currentCardInfo.dueDate}
                    /*onChange={event => setCreditCard({...card, dueDate: event.target.value})}
                    error={!checkDueDate()}
                    helperText={
                        checkDueDate()
                        ? ""
                        : "La tarjeta está vencida"
                    }*/
                />

                <TextField 
                    required
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
                <Button /*onClick={addCreditCard}*/>Editar</Button>
            </form>
        </div>
    );
}

export default creditCardInfo;