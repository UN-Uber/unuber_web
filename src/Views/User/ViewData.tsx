import React, { useEffect, useState} from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import {useSelector} from 'react-redux';
import { RootState } from "@/store";
import {useNavigate} from 'react-router-dom';

interface User{
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
}

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app";
const apilocal =  "http://localhost:4000";

function fetchClient(id:number, token:string){
    return axios.post(apilocal, {
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

    var token = useSelector((state:RootState) => state.auth.user) as string;
    var id = useSelector((state:RootState) => state.auth.id);
    const [status, setStatus] = useState<Loading>({loading : true, theError : []})
    const [client, setClient] = useState<User>({
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
            client.fName = clientFe.fName;
            client.sName = clientFe.sName;
            client.sureName = clientFe.sureName;
            client.email = clientFe.email;
            client.telNumber = clientFe.telNumber;
            client.image = clientFe.image;
            setStatus({ ...status , loading :false});
            
        })
        }, []);

    function editData(){
        navigate('/editData');
    }

    function goOut(){
        navigate("/login");
    }

    return(
        <div>
            {!status.loading?(
            <div className="container">
                <div className="row">    
                <div className="col-6" > 
                <h1>User Data</h1>
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
                    <Button type="button" className="btn btn-danger col-lg">Delete Account</Button>
                </div>
        </div>
        <div className="col-6">
            <h2>User image</h2>
            <div className="container">
                <img src={client.image} alt="User image" className="img-thumbnail" />
            </div>
            </div>
        </div>
        </div>
            )
            :(
                <div>
                    <Container>
                        <h1>We are working</h1>
                        <img src="https://bestanimations.com/Science/Gears/gears-animated.gif" alt="Estamos cargando la infomración" />
                    </Container>
                    
                </div>
            )}
        </div>
            
    );
}

export default ViewData;