import React, { Dispatch } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {loginFail, loginSucess} from "../../features/authSlice"

interface Details{
    email: string;
    password: string;
}

function loginClient(password: string, email?: string, telNumber?: string) {
    if(!telNumber){
        telNumber = "";
    }
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
    
    const [details, setDetails] = useState<Details>({email:"", password:""});
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const { email, password } = details;
        loginClient(password,email).then(result => {
            if(result.data.errors){
                alert(result.data.errors[0].message);
                dispatch(loginFail);
            }else{
                localStorage.setItem("token", result.data.data.login.token);
                dispatch(loginSucess({user : result.data.data.login.token}));
                navigate("/home");
            }
        });
    }
	return (
		<div>
            <form onSubmit={submitHandler} >
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="EmailorNumber">Email address or Phone Number</label>
                    <input type="text" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
	);
};

export default Login;
