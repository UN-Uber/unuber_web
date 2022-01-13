import React, { useEffect, useState }from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Icon from '@mui/material/Icon';
import visaIcon from '../../../assets/visa_icon.png';
import mastercardIcon from '../../../assets/mastercard_icon.png';
import './ListUserCreditCards.css';

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

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app/";

function getCreditCards(token: string, id: number){
    return axios.post<CreditCard[]>(uriGraphql, {
        query: `query GetCardsClient($idClient: Int) {
            getCardsClient(idClient: $idClient) {
              idCard
              idClient
              cardNumber
              dueDate
              cvv
            }
        }`,
        variables: {
            idClient: id
        },
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).catch(error => console.log(error));
}

function cardIcon(cardNumber: string){
    
    if(cardNumber.startsWith("4")){
        return (
            <>
                <Icon>
                    <img className="imageIcon" src={visaIcon} />
                </Icon>
            </>
        );
    }
    else if(cardNumber.startsWith("51") || cardNumber.startsWith("52") ||
            cardNumber.startsWith("53") || cardNumber.startsWith("54") ||
            cardNumber.startsWith("55"))
        {
        return (
            <>
                <Icon>
                    <img className="imageIcon" src={mastercardIcon} />
                </Icon>
            </>
        );
    }

    return (<CreditCardIcon />);
}

const GetCreditCards: React.FC = () => {
    let navigate = useNavigate();

    var token = useSelector((state:RootState) => state.auth.user) as string;
    var id = useSelector((state:RootState) => state.auth.id);

    const [cards, setCreditCardsList] = useState<CreditCard[]>([]);

    const [status, setStatus] = useState<Loading>({
        loading: true,
        theError: []
    });


    useEffect(() => {
        getCreditCards(token, id).then((data) => {
            var cardList: CreditCard[] = data.data.data.getCardsClient;
            setCreditCardsList(cardList);
            setStatus({...status, loading: false});
        })
    }, []);   
    

    return (
        <>        
            <List>
                {cards.map((card, index) => {
                    return (
                        <>
                            <ListItem key={index} onClick={() => {console.log(card.idCard)}}>
                                <ListItemButton >
                                    <ListItemIcon >
                                        {cardIcon(card.cardNumber)}
                                    </ListItemIcon>
                                    <ListItemText key={card.idCard} primary={card.cardNumber}></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </>
                    )
                })}
            </List>
        </>
    );

}

export default GetCreditCards;
