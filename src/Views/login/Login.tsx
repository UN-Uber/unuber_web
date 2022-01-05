import React, { useState, useEffect } from "react";
import { useUpdateEffect } from "react-use";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {loginFail, loginSucess, Token} from "@/features/authSlice"
import validator from 'validator'
import { Container } from "react-bootstrap";
import jwt_decode from "jwt-decode";

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

    function popUpEmailOrPhone(){
            return (
                <Container>
                    <p>Email or Phone Number not Valid</p>
                </Container>
            )
    }

    function popUpPassword(){
            return (
                <Container>
                    <p>Password must contain between 8 and 15 characters</p>
                </Container>
            )
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
                navigate("/home");
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
		<div>
            <form onSubmit={submitHandler} >
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="EmailorNumber">Email address or Phone Number</label>
                    <input type="text" name="field" id="email" onChange={e => setDetails({...details, field: e.target.value})}  value={details.field}/>
                </div>
                {formValidationError.emailOrTelNumber ? popUpEmailOrPhone() : ""}
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="password" id="password" onChange={e =>  setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                {formValidationError.password? popUpPassword(): ""}
                <button type="submit" disabled = {formValidationError.emailOrTelNumber || formValidationError.password}>Login</button>
            </form>
        </div>
	);
};

export default Login;
