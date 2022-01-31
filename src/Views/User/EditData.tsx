import React, { useEffect, useState} from "react";
import { useUpdateEffect } from "react-use";
import axios from "axios";
import { logout } from "@/features/authSlice";
import { useSelector, useDispatch} from 'react-redux';
import { RootState } from "@/store";
import {useNavigate} from 'react-router-dom';
import FileUpload from "@/Views/User/FileUpload";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorImage from '../../assets/error-image.png';
import DefaultImage from '../../assets/default-profile.png';
import Alert from '@mui/material/Alert';

interface User{
    id: number
    fName : string;
    sName : string;
    sureName : string;
    active : number;
    email : string;
    telNumber : string;
    password : string;
    newPassword: string;
    reNewPassword: string;
    image : string;
}


interface Loading{
    loading: boolean;
    theError: any;
    password: boolean;
    image: boolean;
    loadImage: boolean;
    loadedImage: boolean;
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
    password: boolean,
    confirmPassword: boolean
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
                password
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
    }).catch(error => console.log(error)
        );
}

function updateClient(id:number, token:string, client:User){
    return axios.post(uriGraphql, {
        query:` mutation UpdateClient($idClient: Int!, $client: ClientInput!) {
                updateClient(idClient: $idClient, client: $client)
            } `,
        variables:{
            idClient: id,
            client: {
                fName: `${client.fName}`,
                sName: `${client.sName}`,
                sureName: `${client.sureName}`,
                active: 1,
                email: `${client.email}`,
                telNumber: `${client.telNumber}`,
                password: `${client.password}`,
                image: `${client.image}`,
    }
        },
    }, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).catch(error => console.log(error)
        );
}

function changePass(id:number, token:string, client:User){
    return axios.post(uriGraphql, {
        query:` mutation UpdatePassword($idClient: Int!, $client: ChangePasswordInput!) {
            updatePassword(idClient: $idClient, client: $client) {
            response
            }
        } `,
        variables:{
            idClient: id,
            client: {
                fName: `${client.fName}`,
                sName: `${client.sName}`,
                sureName: `${client.sureName}`,
                active: 1,
                email: `${client.email}`,
                telNumber: `${client.telNumber}`,
                password: `${client.password}`,
                newPassword: `${client.newPassword}`,
                image: "http://cdn.onlinewebfonts.com/svg/img_184513.png"
    }
        },
    }, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }).catch(error => console.log(error));
}

const EditData:React.FC = () =>{

    let navigate = useNavigate();
    let dispatch = useDispatch();

    var token = useSelector((state:RootState) => state.auth.user) as string;
    var id = useSelector((state:RootState) => state.auth.id);
    const [status, setStatus] = useState<Loading>({loading : true, theError : [], password: false, image: false, loadImage:false, loadedImage:false})
    const [client, setClient] = useState<User>({
        id: 0,
        fName: "",
        sName: "",
        sureName: "",
        active: 1,
        email: "",
        telNumber: "",
        password:"",
        newPassword: "",
        reNewPassword: "",
        image: 'http://cdn.onlinewebfonts.com/svg/img_184513.png'
    });

    useEffect(()=>{
        fetchClient(id,token).then((data)=>{
            var clientFe = data.data.data.getClient;
            client.fName = clientFe.fName;
            client.sName = clientFe.sName;
            client.sureName = clientFe.sureName;
            client.email = clientFe.email;
            client.telNumber = clientFe.telNumber;
            client.image = clientFe.image;
            setStatus({ ...status , loading :false});
        })
    }, []);

    const [formValidationError, setFormValidationError] = useState<FormErrors>({
        name: false,
        sureName: false,
        phoneNumber: false,
        email: false,
        password: false,
        confirmPassword: false
    });	

    const [toastSuccess, setToastSuccess] = useState<Toast>({
        state: false,
        message: ""
    });
    const [toastError, setToastError] = useState<Toast>({
        state: false,
        message: ""
    });

    function goOut(){
        dispatch(logout);
        localStorage.removeItem("token");
        setTimeout(() => navigate("/addClient"), 3500);
    }


    function goBack(){
        navigate("/viewData");
    }

    function checkFields():boolean{
        return(!checkName() && !checkSName() && checkSureN() && !checkEmail() && !checkNumber());
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
        return !regex.test(client.newPassword);
    }

    function checkRePass():boolean{
        if(client.newPassword !== client.reNewPassword){
            return true;
        }else{
            return false;
        }
    }

    function changeImageBu(){
        setStatus({ ...status , image :true });
    }


    function chPasswordBu(){
        setStatus({ ...status , password :true });
    }

    function saveChanges(){
        //setStatus({ ...status , loading :true });
        updateClient(id, token, client).then((data) =>{
            //setStatus({ ...status , loading :false });
            if(data.data.data.updateClient === '200'){
                setToastSuccess({
                    state: true,
                    message: "Información actualizada correctamente"
                });
                setTimeout(() => navigate("/viewData"), 2500);
            }else{
                setToastError({
                    state: true,
                    message: "El email o número de teléfono ya se encuentran registrados."
                });
            }
        });
    }

    function chPassword(){
        //setStatus({ ...status , loading :true });
        changePass(id, token, client).then((data) =>{
            //setStatus({ ...status , loading :false });
            console.log(data);
            if(data.data.data.updatePassword.response === 'Password Changed'){
                setToastSuccess({
                    state: true,
                    message: "Cambio de contraseña realizado"
                });
                setTimeout(() => navigate("/viewData"), 2500);
            }else{
                setToastError({
                    state: true,
                    message: "Error al cambiar la contraseña"
                });
            }
        });
    }

    function cancelPassword(){
        setStatus({ ...status , password :false });
        setClient({ ...client , password :"" });
        setClient({ ...client , newPassword :"" });
        setClient({ ...client , reNewPassword :"" });
    }

    function testPasswords():boolean{
        return(!checkPass() && !checkRePass());
    }

    const setImageUrl = (url:string) => {
        console.log("imagen desde el lado de la edicion de datos:  ", client.image);
        client.image= `${url}`;
        console.log("Se esta llamando la función");
        console.log("imagen desde el lado de la edicion de datos:  ", client.image);
        setStatus({...status, image:!(status.image)});
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
    }, [client.newPassword]);

    useUpdateEffect(() => {
        if (checkRePass()) {
            setFormValidationError({...formValidationError, confirmPassword: true});
        } else {
            setFormValidationError({...formValidationError, confirmPassword: false});
        }
    }, [client.reNewPassword]);

    return(
        <Box sx={{minHeight: '100vh'}}>
            {client.active===1?(
            <div>{!status.loading?(
                <Container component="main" maxWidth="sm">
                    <CssBaseline />
                    <Box
                        sx={{
                            mt: 4,
                            mb: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        
                        <Typography sx={{mb: 4, fontWeight: 400, fontSize: 40, color: "#F30000", letterSpacing: 4}}>
                            Editar perfil
                        </Typography>

                        <>
                            {!status.image?(
                                <>
                                    {
                                        client.image !== ""
                                        ? <img id="user-image" src={client.image} alt="User image"/>
                                        : <img id="user-image" src={DefaultImage} alt="User image"/>
                                    }
                                    
                                    <Button variant="outlined" onClick={changeImageBu}>Change Picture</Button>
                                   
                                </>
                            ):(
                                <div className="file">
                                    <FileUpload token={token} setImageUrl={setImageUrl}/>
                                </div>
                            )}
                        </>

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
                                        value={client.fName}
                                        InputLabelProps={{ shrink: true }}
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
                                        value={client.sName}
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
                                        value={client.sureName}
                                        InputLabelProps={{ shrink: true }}
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
                                        value={client.telNumber}
                                        InputLabelProps={{ shrink: true }}
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
                                        value={client.email}
                                        InputLabelProps={{ shrink: true }}
                                        onChange={e => setClient({...client, email: e.target.value})}
                                        error={formValidationError.email}
                                        helperText={
                                            formValidationError.email
                                            ? "El correo electrónico no es válido."
                                            : ""
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <>
                            {status.password?(
                                
                                <Grid container spacing={2} sx={{mt: 4}}>
                                    <Grid item sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="password"
                                            label="Contraseña actual"
                                            variant="outlined"
                                            onChange={e => setClient({...client, password: e.target.value})}
                                        />
                                    </Grid>

                                    <Grid item sm={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="password"
                                            label="Nueva contraseña"
                                            variant="outlined"
                                            onChange={e => setClient({...client, newPassword: e.target.value})}
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
                                            required
                                            fullWidth
                                            type="password"
                                            label="Repita la nueva contraseña"
                                            variant="outlined"
                                            onChange={e => setClient({...client, reNewPassword: e.target.value})}
                                            error={formValidationError.confirmPassword}
                                            helperText={
                                                formValidationError.confirmPassword
                                                ? "Las contraseñas no coínciden."
                                                : ""
                                            }
                                        />
                                    </Grid>

                                    <Grid item sm={12}>
                                        <Stack spacing={3} direction="row" sx={{my: 2}}>
                                            <Button
                                                fullWidth
                                                onClick={chPassword}
                                                variant="contained"
                                                disabled = {!testPasswords()}
                                            >
                                                Cambiar contraseña y datos
                                            </Button>

                                            <Button
                                                fullWidth
                                                onClick={cancelPassword}
                                                variant="outlined"
                                            >
                                                Cancelar
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            ):(
                                <>
                                    <Button sx={{mt: 4}} fullWidth variant="outlined" onClick={chPasswordBu}>Cambiar contraseña</Button>
                                    <Stack spacing={3} direction="row" sx={{mt: 6, mb: 2}}>
                                        <Button
                                            fullWidth
                                            onClick={saveChanges}
                                            variant="contained"
                                            disabled = {!checkFields()}
                                        >
                                            Guardar cambios
                                        </Button>

                                        <Button
                                            fullWidth
                                            onClick={goBack}
                                            variant="outlined"
                                        >
                                            Cancelar
                                        </Button>
                                    </Stack>
                                </>
                            )}
                            </>
                            {
                                toastSuccess.state
                                ? <Alert sx={{mb: 10}} variant="filled" severity="success">{toastSuccess.message}</Alert>
                                : null
                            }

                            {
                                toastError.state
                                ? <Alert sx={{mb: 10}} variant="filled" severity="error">{toastError.message}</Alert>
                                : null
                            }
                        </Box>
                    </Box>          
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
        )}</Box>
    );
}

export default EditData;