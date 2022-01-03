import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import axios from "axios";
import { Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Container, Image } from 'react-bootstrap';

interface UserCreate{
    fName : string;
    sName : string;
    sureName : string;
    active : number;
    email : string;
    telNumber : string;
    password : string;
    image : 'http://cdn.onlinewebfonts.com/svg/img_184513.png';
}

interface Loading{
    loading: boolean;
    theError: string;
}

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app/auth";
const heroku = "https://unuberaccount.herokuapp.com/api"; 
const apilocal =  "http://localhost:4000/auth" 

function createClient(client:UserCreate){
    return axios.post(uriGraphql,{
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
    
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [client, setClient] = useState<UserCreate>({ 
        fName: "",
        sName: "",
        sureName: "",
        active: 1,
        email: "",
        telNumber: "",
        password:"",
        image: 'http://cdn.onlinewebfonts.com/svg/img_184513.png'});

    const [status, setStatus] = useState<Loading>({loading : false, theError : ""})

    function addClient(){
        setStatus({ ...status , loading :true });
        createClient(client).then((data) =>{
            setStatus({ ...status , loading :false });
            if(data.data.data.createClient.response === "Email or phone number already register"){
                alert(data.data.data.createClient.response);       
            }else{
                alert("User has been successfully registered");
                navigate("/login"); 
            }
        }).catch((e) =>{
            console.log(e);
        });
    }

    return(
        <div className="submit-form">
                <div>
                    <div className="form-group">
                        <label htmlFor="fName">First Name</label>
                        <input type="text" className="form-control" id="fname" required value={client.fName}
                        onChange={e => setClient({...client, fName: e.target.value})} name="fName" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sName">Second Name</label>
                        <input type="text" className="form-control" id="sName" value={client.sName}
                        onChange={e => setClient({...client, sName: e.target.value})} name="sName" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sureName">Sure Name</label>
                        <input type="text" className="form-control" id="sureName" required value={client.sureName}
                        onChange={e => setClient({...client, sureName: e.target.value})} name="sureName" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" required value={client.email}
                        onChange={e => setClient({...client, email: e.target.value})} name="email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telNumber">Tel Number</label>
                        <input type="number" className="form-control" id="telNumber" required value={client.telNumber}
                        onChange={e => setClient({...client, telNumber: e.target.value})} name="telNumber" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" required value={client.password}
                        onChange={e => setClient({...client, password: e.target.value})} name="password" />
                    </div>

                    <Button onClick={addClient} className="btn btn-succes">
                        Create Account
                    </Button>
                    <div>
                        {status.loading?(
                            <Container>
                                    <Image src="https://bestanimations.com/Science/Gears/gears-animated.gif"/>
                            </Container>
                        ): <div>Accept to load your data</div> }
                    </div>
                </div>
        </div>
    );
}

export default AddClient;

