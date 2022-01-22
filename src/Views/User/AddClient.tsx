import React, { useState } from "react";
import { useUpdateEffect } from "react-use";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/Registro-Usuario.png';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

interface UserCreate{
    fName : string;
    sName : string;
    sureName : string;
    active : number;
    email : string;
    telNumber : string;
    password : string;
    rePass: string;
    image : 'http://cdn.onlinewebfonts.com/svg/img_184513.png';
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
    name: boolean,
    sureName: boolean,
    phoneNumber: boolean,
    email: boolean,
    password: boolean
}

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app/auth";
const heroku = "https://unuberaccount.herokuapp.com/api"; 
const apilocal =  "http://localhost:4000/auth" 

function createClient(client:UserCreate){
    return axios.post(apilocal,{
        query: `mutation Mutation($client: ClientInput!) {
            createClient(client: $client) {
            response
            }
        }`,
        variables:{
            client: {
                fName: `${client.fName}`,
                sName: `${client.sName}`,
                sureName: `${client.sureName}`,
                active: client.active,
                email: `${client.email}`,
                telNumber: `${client.telNumber}`,
                password: `${client.password}`,
                image: 'http://cdn.onlinewebfonts.com/svg/img_184513.png'
            }
        }
    }, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

const AddClient: React.FC = () => {
    let navigate = useNavigate();

    const [client, setClient] = useState<UserCreate>({ 
        fName: "",
        sName: "",
        sureName: "",
        active: 1,
        email: "",
        telNumber: "",
        password:"",
        rePass: "",
        image: 'http://cdn.onlinewebfonts.com/svg/img_184513.png'});

    const [status, setStatus] = useState<Loading>({loading : false, theError : []})

    const [formValidationError, setFormValidationError] = useState<FormErrors>({
        name: false,
        sureName: false,
        phoneNumber: false,
        email: false,
        password: false,
    });	

    const [toastSuccess, setToastSuccess] = useState<Toast>({
        state: false,
        message: ""
    });
    const [toastError, setToastError] = useState<Toast>({
        state: false,
        message: ""
    });


    function addClient(){
        setStatus({ ...status , loading :true });
        createClient(client).then((data) =>{
            setStatus({ ...status , loading :false });
            if(data.data.data.createClient.response === "Email or phone number already register"){
                setToastError({
                    state: true,
                    message: "El email or el número de teléfono ya está registrado"
                });       
            }else{
                setToastSuccess({
                    state: true,
                    message: "Usuario registrado correctamente"
                });
                setTimeout(() => navigate("/login"));
            }
        }).catch((e) =>{
            console.log(e);
        });
    }

    function checkFields():boolean{
        return(!checkName() && !checkSName() && checkSureN() && !checkEmail() && !checkNumber() && !checkPass() && !checkRePass());
    }

    function checkName():boolean{
        let regex = /^([a-zA-Z]){3,20}$/;
        return !regex.test(client.fName);
    }


    function checkSName(): boolean{
        let regex = /^([a-zA-Z]){3,20}$/;
        if(regex.test(client.sName) || client.sName === ""){
            return false;
        }else{
            return true;
        }
    }

    function checkSureN():boolean{
        let regex = /^([a-zA-Z ]){3,20}$/;
        let sures = client.sureName.split(" ");
        if(sures.length > 0 && sures.length <= 3){
            for(let sure of sures){
                if(!regex.test(sure)){
                    return false;
                } 
            }
            return true;
        }else{
            return false;
        }
    }

    function checkEmail():boolean{
        let regex = /^[\S@]+@[\S@]+\.([\S@]+){2,3}$/;
        return !regex.test(client.email);
    }

    function checkNumber():boolean{
        let regex = /^([0-9]){10}$/;
        return !regex.test(client.telNumber);
    }

    function checkPass():boolean{
        let regex = /^([\S@]){8,15}$/;
        return !regex.test(client.password);
    }

    function checkRePass():boolean{
        if(client.password !== client.rePass){
            return true;
        }else{
            return false;
        }
    }

    useUpdateEffect(() => {
        if (checkName()) {
            setFormValidationError({...formValidationError, name: true});
        } else {
            setFormValidationError({...formValidationError, name: false});
        }
    }, [client.fName]);

    useUpdateEffect(() => {
        if (!checkSureN()) {
            setFormValidationError({...formValidationError, sureName: true});
        } else {
            setFormValidationError({...formValidationError, sureName: false});
        }
    }, [client.sureName]);

    useUpdateEffect(() => {
        if (checkNumber()) {
            setFormValidationError({...formValidationError, phoneNumber: true});
        } else {
            setFormValidationError({...formValidationError, phoneNumber: false});
        }
    }, [client.telNumber]);

    useUpdateEffect(() => {
        if (checkEmail()) {
            setFormValidationError({...formValidationError, email: true});
        } else {
            setFormValidationError({...formValidationError, email: false});
        }
    }, [client.email]);

    useUpdateEffect(() => {
        if (checkPass()) {
            setFormValidationError({...formValidationError, password: true});
        } else {
            setFormValidationError({...formValidationError, password: false});
        }
    }, [client.password]);

    return(
        <>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        my: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img className="ima" id="signup-imagen" src={Logo}/>
                    <Typography component="h1" variant="h4">
                        Registrar Usuario
                    </Typography>

                    <Box component="form" sx={{mt:3}}>
                        <Grid container spacing={2}> 
                            <Grid item sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    label="Nombre"
                                    variant="outlined"
                                    onChange={e => setClient({...client, fName: e.target.value})}
                                    error={formValidationError.name}
                                    helperText={
                                        formValidationError.name
                                        ? "El nombre no es válido"
                                        : ""
                                    }
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    type="text"
                                    label="Segundo nombre"
                                    variant="outlined"
                                    onChange={e => setClient({...client, sName: e.target.value})}
                                    error={checkSName()}
                                    helperText={
                                        checkSName()
                                        ? "El segundo nombre no es válido"
                                        : ""
                                    }
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    label="Apellidos"
                                    variant="outlined"
                                    onChange={e => setClient({...client, sureName: e.target.value})}
                                    error={formValidationError.sureName}
                                    helperText={
                                        formValidationError.sureName
                                        ? "Los apellidos no son válidos"
                                        : ""
                                    }
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="number"
                                    label="Numero de teléfono"
                                    variant="outlined"
                                    onChange={e => setClient({...client, telNumber: e.target.value})}
                                    error={formValidationError.phoneNumber}
                                    helperText={
                                        formValidationError.phoneNumber
                                        ? "El número de teléfono no es válido"
                                        : ""
                                    }
                                />
                            </Grid>

                            <Grid item sm={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="email"
                                    label="Correo electrónico"
                                    variant="outlined"
                                    onChange={e => setClient({...client, email: e.target.value})}
                                    error={formValidationError.email}
                                    helperText={
                                        formValidationError.email
                                        ? "El correo electrónico no es válido."
                                        : ""
                                    }
                                />
                            </Grid>

                            <Grid item sm={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="password"
                                    label="Contraseña"
                                    variant="outlined"
                                    onChange={e => setClient({...client, password: e.target.value})}
                                    error={formValidationError.password}
                                    helperText={
                                        formValidationError.password
                                        ? "La contraseña debe contener entre 8 y 15 carácteres sin espacios."
                                        : ""
                                    }
                                />
                            </Grid>

                            <Grid item sm={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="password"
                                    label="Contraseña"
                                    variant="outlined"
                                    onChange={e => setClient({...client, rePass: e.target.value})}
                                    error={checkRePass()}
                                    helperText={
                                        checkRePass()
                                        ? "Las contraseñas no coínciden."
                                        : ""
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            onClick={addClient}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled = {!checkFields()}
                        >
                            Registrarse
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

export default AddClient;