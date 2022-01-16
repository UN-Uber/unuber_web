import React, { useEffect, useState }from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import  TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from "react-input-mask";

interface CreditCardCreate{
    cardNumber: string,
    dueDate: string,
    cvv: string
}

interface Loading{
    loading: boolean;
    theError: any;
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

    function addCreditCard(){

        // TODO: Change Alerts for Material Snackbar

        setStatus({ ...status, loading: true});
        createCreditCard(token, id, card).then((data) => {
            setStatus({ ...status, loading: false});
            if(data.data.data.createCard.response == "Card already register"){
                alert("La tarjeta ya está registrada");
            }
            else{
                alert("Tarjeta registrada");
                navigate("/wallet");
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

    return (
        <div className="container">
            <form>
                <InputMask 
                    mask="9999 9999 9999 9999"
                    maskPlaceholder=" "
                    alwaysShowMask={false}
                    onChange={event => setCreditCard({...card, cardNumber: event.target.value.replaceAll(" ","")})}
                >
                    <TextField 
                            required
                            fullWidth
                            id="outlined-basic" 
                            label="tarjeta de crédito" 
                            variant="outlined"
                            error={!checkCreditCardNumber()}
                            helperText={
                                checkCreditCardNumber()
                                ? ""
                                : "El número de la tarjeta no es válido"
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
                        id="outlined-basic" 
                        label="fecha de vecimiento" 
                        variant="outlined"
                        error={!checkDueDate()}
                        helperText={
                            checkDueDate()
                            ? ""
                            : "La tarjeta está vencida"
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
                        id="outlined-basic num" 
                        label="cvv"
                        variant="outlined"
                        error={checkCvv()}
                        helperText={
                            checkCvv()
                            ? "CVV no es válido"
                            : ""
                        }
                    />
                </InputMask>
                <Button onClick={addCreditCard}>Enviar</Button>
            </form>
        </div>
    );


}

export default AddCreditCard;