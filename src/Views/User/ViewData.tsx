import React, { useEffect, useState} from "react";
import axios from "axios";
import { logout } from "@/features/authSlice";
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from "@/store";
import {useNavigate} from 'react-router-dom';
import DeleteAccount from '../User/DeleteAccount';
import DefaultImage from '../../assets/default-profile.png';
import ErrorImage from '../../assets/error-image.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

interface User{
    idClient : number;
    fName : string;
    sName : string;
    sureName : string;
    active : number;
    email : string;
    telNumber : string;
    password : string;
    image : string;
}


interface Loading{
    loading: boolean;
    theError: any;
    delete: boolean;
}

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app";
const apilocal =  "http://localhost:4000";

function fetchClient(id:number, token:string){
    return axios.post(uriGraphql, {
        query:` query GetClient($idClient: Int) {
                getClient(idClient: $idClient) {
                idClient
                fName
                sName
                sureName
                active
                email
                telNumber
                image
            }
        } `,
        variables:{
            idClient: id
        },
    }, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).catch(error => console.log(error));
}

const ViewData:React.FC = () =>{

    let navigate = useNavigate();
    let dispatch = useDispatch();

    var token = useSelector((state:RootState) => state.auth.user) as string;
    var id = useSelector((state:RootState) => state.auth.id);
    const [status, setStatus] = useState<Loading>({loading : true, theError : [], delete:false})
    const [client, setClient] = useState<User>({
        idClient: 0,
        fName: "",
        sName: "",
        sureName: "",
        active: 1,
        email: "",
        telNumber: "",
        password:"",
        image: 'http://cdn.onlinewebfonts.com/svg/img_184513.png'
    })

    useEffect(()=>{
        fetchClient(id,token).then((data)=>{
            var clientFe = data.data.data.getClient;
            client.idClient = clientFe.idClient;
            client.fName = clientFe.fName;
            client.sName = clientFe.sName;
            client.sureName = clientFe.sureName;
            client.email = clientFe.email;
            client.telNumber = clientFe.telNumber;
            client.image = clientFe.image;
            client.active = clientFe.active;
            setStatus({ ...status , loading :false});
        })
        }, []);

    function editData(){
        navigate('/editData');
    }

    function goOut(){
        dispatch(logout);
        localStorage.removeItem("token");
        setTimeout(() => navigate("/addClient"), 3500);
    }

    function deleteAccount(){
        setStatus({...status, delete:true});
    }

    function goBackDelete(){
        setStatus({...status, delete: !status.delete});
    }
    return(
        <Box sx={{minHeight: '100vh'}}>
            {(client.active === 1)?(
            <div>{!status.delete?(
                <div>{!status.loading?(
                    <Container component="main" maxWidth="xs" sx={{py: 6, textAlign: 'center'}}>
                        <Typography sx={{mb: 4, fontWeight: 400, fontSize: 50, color: "#F30000", letterSpacing: 4}}>
                            Mi perfil
                        </Typography>
                            
                        {
                            client.image !== ""
                            ? <img id="user-image" src={client.image} alt="User image"/>
                            : <img id="user-image" src={DefaultImage} alt="User image"/>
                        }

                        <Box sx={{textAlign: 'left'}}>
                            <Typography  sx={{mb: 1, fontWeight: 500, fontSize: 20, letterSpacing: 4, }}>
                                Nombres
                            </Typography>
                            <Typography  sx={{mb: 4, fontWeight: 300, fontSize: 20, letterSpacing: 4 }}>
                                {client.fName} {client.sName !== null? client.sName : ""}
                            </Typography>

                            <Typography  sx={{mb: 1, fontWeight: 500, fontSize: 20, letterSpacing: 4, }}>
                                Apellidos
                            </Typography>
                            <Typography  sx={{mb: 4, fontWeight: 300, fontSize: 20, letterSpacing: 4 }}>
                                {client.sureName}
                            </Typography>

                            <Typography  sx={{mb: 1, fontWeight: 500, fontSize: 20, letterSpacing: 4, }}>
                                Número de teléfono
                            </Typography>
                            <Typography  sx={{mb: 4, fontWeight: 300, fontSize: 20, letterSpacing: 4 }}>
                                {client.telNumber}
                            </Typography>

                            <Typography  sx={{mb: 1, fontWeight: 500, fontSize: 20, letterSpacing: 4, }}>
                                Email
                            </Typography>
                            <Typography  sx={{mb: 4, fontWeight: 300, fontSize: 20, letterSpacing: 4 }}>
                                {client.email}
                            </Typography>
                        </Box>

                        <Stack spacing={3} direction="row" sx={{my: 6}}>
                            <Button
                                fullWidth
                                variant="contained" 
                                startIcon={<EditIcon />} 
                                onClick={editData}
                            >
                                Editar perfil
                            </Button>

                            <Button
                                fullWidth
                                variant="outlined" 
                                startIcon={<DeleteIcon />} 
                                onClick={deleteAccount}
                            >
                                Eliminar cuenta
                            </Button>
                        </Stack>


                        
                    </Container>
                ):(
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
            </div>
            ):(
                <DeleteAccount token={token} client={client} goBackDelete={goBackDelete} />
            )}
            </div> 
        ):(
            <Container component="main" maxWidth="sm" sx={{py: 5, textAlign: 'center'}}>
                <CssBaseline />
                <img id="error-image" src={ErrorImage} />
                <Typography component="h1" variant="h4" sx={{mb: 4}}>
                    Oops, parece que ya has desactivado tu cuenta
                </Typography>
                <Button 
                    onClick={goOut}
                    variant="contained"
                    sx={{ mt: 3, mb: 2, px: 6 }}
                >
                    Crea una nueva cuenta
                </Button>
            </Container>
        )}
        </Box>  
    );
}

export default ViewData;