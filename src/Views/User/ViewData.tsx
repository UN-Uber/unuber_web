import React, { useEffect, useState} from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import {useSelector, useDispatch} from 'react-redux';
import {logout} from "@/features/authSlice"
import { RootState } from "@/store";
import {useNavigate} from 'react-router-dom';
import DeleteAccount from '../User/DeleteAccount';

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
        localStorage.setItem("token", "");
        dispatch(logout());
        navigate("/login");
    }

    function deleteAccount(){
        setStatus({...status, delete:true});
    }

    function goBackDelete(){
        setStatus({...status, delete: !status.delete});
    }
    return(
        <div>{(client.active === 1)?(
            <div>{!status.delete?(
                <div>{!status.loading?(
                    <div className="submit-form Delete" id="registro">
                    
                        <img className="ima" id="user-imagen" src={client.image} alt="User image"/>

                        <h1 id="tituloR">User Data</h1>

                        <div className="btn-group" role="group" aria-label="Actions">
                            <Button type="button" className="btn btn-success col-lg " id="botonx" onClick={editData}>Modify Data</Button>
                            <Button type="button" className="btn btn-secondary col-lg" id="botonx" onClick={goOut}>Go out</Button>
                            <Button type="button" className="btn btn-danger col-lg" id="botonx" onClick={deleteAccount}>Delete Account</Button>
                        </div>

                        <div className="form-group">
                            <h3>Name</h3>
                            <h4>{client.fName}</h4>
                        </div>

                        <div className="form-group">
                            <h3>Second name</h3>
                            <h4>{client.sName}</h4>
                        </div>

                        <div className="form-group">
                            <h3>Sure name</h3>
                            <h4>{client.sureName}</h4>
                        </div>

                        <div className="form-group">
                            <h3>Tel number</h3>
                            <h4>{client.telNumber}</h4>
                        </div>

                        <div className="form-group" id="emailc">
                            <h3>Email</h3>
                            <h4>{client.email}</h4>
                        </div>

                   {/* <div className="row">    
                    <div className="col-6" > 
                    <h1></h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-md">
                                <h3>Name</h3>
                            </div>
                            <div className="col-md">
                                <p>{client.fName}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <h3>Second name</h3>
                            </div>
                            <div className="col-md">
                                <p>{client.sName}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <h3>Sure name</h3>
                            </div>
                            <div className="col-md">
                                <p>{client.sureName}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <h3>email</h3>
                            </div>
                            <div className="col-md">
                                <p>{client.email}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md">
                                <h3>Tel number</h3>
                            </div>
                            <div className="col-md">
                                <p>{client.telNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Actions">
                        <Button type="button" className="btn btn-success col-lg " onClick={editData}>Modify Data</Button>
                        <Button type="button" className="btn btn-secondary col-lg" onClick={goOut}>Go out</Button>
                        <Button type="button" className="btn btn-danger col-lg" onClick={deleteAccount}>Delete Account</Button>
                    </div>
            </div>
            <div className="col-6">
                <h2>User image</h2>
                <div className="container">
                    <img src={client.image} alt="User image" className="img-thumbnail" />
                </div>
                </div>
            </div>*/}
            </div>
                ):(
                    <div>
                        <Container>
                            <h1>We are working</h1>
                            <img src="https://bestanimations.com/Science/Gears/gears-animated.gif" alt="Estamos cargando la infomración" />
                        </Container>
                    </div>
                )}
            </div>
            ):(
                <DeleteAccount token={token} client={client} goBackDelete={goBackDelete} />
            )}
            </div> 
        ):(
            <>
            <h1>User has desactive the account, please go to th following link: </h1>
            <h2><a href="https://i.pinimg.com/736x/58/e2/8f/58e28fae02def3695760602649056285.jpg"> Restore Account</a></h2>
            <div className="container">
                <h2>Or go back</h2>
                <Button type="button" className="btn btn-secondary col-lg" onClick={goOut}> Go back to the login </Button>
            </div>
            </>
        )}
        </div>    
    );
}

export default ViewData;