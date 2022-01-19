import React, { useState, useEffect } from "react";
import { useUpdateEffect } from "react-use";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {loginFail, loginSucess, Token} from "@/features/authSlice"
import validator from 'validator'
import jwt_decode from "jwt-decode";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '../../assets/Login.png';
import './Login.css';
interface Details{
    field: string;
    password: string;
}

interface FormErrors{
    emailOrTelNumber: boolean;
    password: boolean;
    submit: boolean;
}

function loginClient(password: string, email?: string, telNumber?: string) {
	return axios.post("https://general-api-f6ljpbkkwa-uc.a.run.app/auth", {
		query: `query Login($authInput: AuthInput!) {
            login(authInput: $authInput) {
                token
            }
        }`,
		variables: {
			authInput: {
				email: `${email}`,
				password: `${password}`,
				telNumber: `${telNumber}`,
			},
		}
	}, {
        headers: {
            "Content-Type": "application/json",
        }
    });
}

const Login: React.FC = () => {

    function checkEmail(email: string):boolean{
        return validator.isEmail(email);
    }
    
    function checkPhoneNumber(phoneNumber: string):boolean{
        return validator.isMobilePhone(phoneNumber, 'es-CO');
    }

    function checkPassword(password: string):boolean{
        return validator.isLength(password, {min: 8, max: 15});
    }    
    
    const [details, setDetails] = useState<Details>({field:"", password:""});
    const [formValidationError, setFormValidationError] = useState<FormErrors>({emailOrTelNumber: false, password: false, submit: false});	
    
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        let email = "", password=details.password, telNumber = "";
        if(checkEmail(details.field)){
            email = details.field;
        }else{
            telNumber = details.field;
        }
        loginClient(password,email, telNumber).then(result => {
            if(result.data.errors){
                alert(result.data.errors[0].message);
                dispatch(loginFail);
            }else{
                localStorage.setItem("token", result.data.data.login.token);
                dispatch(loginSucess({user : result.data.data.login.token, id: jwt_decode<Token>(result.data.data.login.token).id}));
                navigate("/viewData");
            }
        });
    }

    useUpdateEffect(() => {
        if (!checkEmail(details.field) && !checkPhoneNumber(details.field)) {
            setFormValidationError({...formValidationError, emailOrTelNumber: true});
        } else {
            setFormValidationError({...formValidationError,emailOrTelNumber: false});
        }
    }, [details.field]);

    useUpdateEffect(() => {
        if (!checkPassword(details.password)) {
            setFormValidationError({ ...formValidationError, password: true });
        } else {
            setFormValidationError({ ...formValidationError, password: false });
        }
    }, [details.password]);


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
                    <img id="login-imagen" src={Logo} />
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
                    </Typography>
                    <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Correo electrónico o número de teléfono"
                            variant="outlined"
                            onChange={e => setDetails({...details, field: e.target.value})}
                            error={formValidationError.emailOrTelNumber}
                            helperText={
                                formValidationError.emailOrTelNumber
                                ? "El correo o el número de teléfono no es válido"
                                : ""
                            }
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Contraseña"
                            variant="outlined"
                            onChange={e =>  setDetails({...details, password: e.target.value})}
                            error={formValidationError.password}
                            helperText={
                                formValidationError.password
                                ? "La contraseña debe tener entre 8 y 15 caracteres"
                                : ""
                            }
                        />

                        <Button 
                            id="botonx"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled = {formValidationError.emailOrTelNumber || formValidationError.password}
                        >
                            Iniciar sesión
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
	);
};

export default Login;
