import React, { useEffect, useReducer } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Container, Image } from 'react-bootstrap';

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

    return(
        <div className="submit-form">
                <div>
                    <h1>New User Registration</h1>
                    <div className="form-group">
                        <label htmlFor="fName">First Name *</label>
                        <input type="text" className="form-control" id="fname" required value={client.fName}
                        onChange={e => setClient({...client, fName: e.target.value})} onInput={checkName} name="fName" />
                    </div>
                    <div>{checkName()?(
                        <Container>
                            <p>Name Must be a word without numbers nor spetial characters, with 3 or more characters</p>
                        </Container>
                    ):""}</div>

                    <div className="form-group">
                        <label htmlFor="sName">Second Name</label>
                        <input type="text" className="form-control" id="sName" value={client.sName}
                        onChange={e => setClient({...client, sName: e.target.value})}  onInput={checkSName} name="sName" />
                    </div>
                    <div>{checkSName()?(
                        <Container>
                            <p>Second Name Must be a word without numbers nor spetial characters, with 3 or more characters</p>
                        </Container>
                    ):""}</div>

                    <div className="form-group">
                        <label htmlFor="sureName">Sure Name * </label>
                        <input type="text" className="form-control" id="sureName" required value={client.sureName}
                        onChange={e => setClient({...client, sureName: e.target.value})} onInput={checkSureN} name="sureName" />
                    </div>
                    <div>{!checkSureN()?(
                        <Container>
                            <p>Sure name must be at most 3 words and at least with 3 or more characters each one</p>
                        </Container>
                    ):""}</div>

                    <div className="form-group">
                        <label htmlFor="email">Email * </label>
                        <input type="text" className="form-control" id="email" required value={client.email}
                        onChange={e => setClient({...client, email: e.target.value})} onInput={checkEmail} name="email" />
                    </div>
                    <div>{checkEmail()?(
                        <Container>
                            <p>Type your email</p>
                        </Container>
                    ):""}</div>

                    <div className="form-group">
                        <label htmlFor="telNumber">Tel Number * </label>
                        <input type="number" className="form-control" id="telNumber" required value={client.telNumber}
                        onChange={e => setClient({...client, telNumber: e.target.value})} onInput={checkNumber} name="telNumber" />
                    </div>
                    <div>{checkNumber()?(
                        <Container>
                            <p>It must be a movil telephone number</p>
                        </Container>
                    ):""}</div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input type="password" className="form-control" id="password" required value={client.password}
                        onChange={e => setClient({...client, password: e.target.value})} onInput={checkPass} name="password" />
                    </div>
                    <div>{checkPass()?(
                        <Container>
                            <p>Password must have at least 8 characters and at most 15, no spaces.</p>
                        </Container>
                    ):""}</div>

                    <div className="form-group">
                            <label htmlFor="password">Repeat Password *</label>
                            <input type="password" className="form-control" id="rePass" required value={client.rePass}
                            onChange={e => setClient({...client, rePass: e.target.value})} onInput={checkRePass} name="rePass" />
                    </div>
                    <div>{checkRePass()?(
                        <Container>
                            <p>The two passwords must match</p>
                        </Container>
                    ):""}</div>

                    <div>
                        {checkFields()?(
                            <Button onClick={addClient} className="btn btn-succes">
                                Create Account
                            </Button>
                        ):(
                            <Button className="btn btn-danger">
                                There are some erros
                            </Button>
                        )}
                    </div>
                    <div>
                        {status.loading?(
                            <Container>
                                    <Image src="https://bestanimations.com/Science/Gears/gears-animated.gif"/>
                            </Container>
                        ): <div>Click to load your data</div> }
                    </div>
                </div>
        </div>
    );
}

export default AddClient;

