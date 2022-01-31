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
import visaIcon from '../../assets/visa_icon.png';
import mastercardIcon from '../../assets/mastercard_icon.png';
import PaymentsIcon from '@mui/icons-material/Payments';
import { green } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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
                    <img className="listCardIcon" src={visaIcon} />
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
                    <img className="listCardIcon" src={mastercardIcon} />
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
        <Box sx={{minHeight: '85vh', position: 'relative',}}> 
            <Container component="main" maxWidth="md">
            <CssBaseline />
                {!status.loading
                ?(
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            minHeight: 625,
                        }}
                    >
                    <List>
                        <Box 
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 1,
                            }}
                        >
                            {cards.map((card, index) => {
                                return (                                    
                                    <ListItem 
                                        key={index} 
                                        onClick={() => {
                                            // {state: any} permite pasar datos a otro componente
                                            navigate("/cardDetails", {state: card});
                                        }}
                                        sx={{
                                            bgcolor: "#3F3F4E",
                                            height: 150,
                                            color: "#FFF",
                                            borderRadius: 4
                                        }}
                                    >
                                        <ListItemButton sx={{height: 1}}>
                                            <ListItemIcon >
                                                {cardIcon(card.cardNumber)}
                                            </ListItemIcon>
                                            <ListItemText 
                                                key={card.idCard} 
                                                primary={card.cardNumber.match(/.{4}/g)?.join(" ")}
                                            >
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>                                    
                                )
                            })}

                            <ListItem 
                                key={"efectivo"} 
                                sx={{
                                    bgcolor: "#418442",
                                    height: 150,
                                    color: "#FFF",
                                    borderRadius: 4,
                                    fontWeight: '700'
                                }}
                            >
                                <ListItemButton sx={{height: 1}} >
                                    <ListItemIcon >
                                        <PaymentsIcon sx={{ color: green[100]}}/>
                                    </ListItemIcon>
                                    <ListItemText primary="Efectivo"></ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Box>
                    </List>
                    <Fab variant="extended" color="primary"
                        sx={{
                            position: 'absolute',
                            bottom: 150,
                            right: 16,
                        }}
                        href="/addCreditCard"
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        Añadir tarjeta
                    </Fab>
                </Box>
                    
                )
                :(
                    <Box 
                        sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 10
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )}
            </Container>
        </Box>
    );

}

export default GetCreditCards;
