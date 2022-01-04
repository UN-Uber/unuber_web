import React, { useEffect, useState} from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import {useSelector} from 'react-redux';
import { RootState } from "@/store";

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

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app/auth";

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
            idClient: `${id}`
        },
    }, {
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : `${token}`
        }
    })
}

const ViewData:React.FC = () =>{

    var token = useSelector((state:RootState) => state.auth.user) as string;
    var id = useSelector((state:RootState) => state.auth.id);
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
        console.log('token  ', token);  
        console.log('id   ', id);
        fetchClient(id,token).then((data)=>{
            let clientFe = data.data.data.getClient;
            client.fName = clientFe.fName;
            client.sName = clientFe.sName;
            client.sureName = clientFe.sureName;
            client.email = clientFe.email;
            client.telNumber = clientFe.telNumber;
            client.image = clientFe.image;
        })
        }, []);

    function change(){
        console.log("se modifica");
    }

    return(
        <div>
            <h1>User Data</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <h3>{client.fName}</h3>
                    </div>
                    <div className="col-md">
                        <p>Aqui va el nombre</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <h3>Second name</h3>
                    </div>
                    <div className="col-md">
                        <p>Aqui va el second name</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <h3>Sure name</h3>
                    </div>
                    <div className="col-md">
                        <p>Aqui va el apellido</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <h3>email</h3>
                    </div>
                    <div className="col-md">
                        <p>Aqui va el email</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <h3>Tel number</h3>
                    </div>
                    <div className="col-md">
                        <p>Aqui va el telefono</p>
                    </div>
                </div>
            </div>
            <div className="btn-group" role="group" aria-label="Actions">
                <Button type="button" className="btn btn-success col-lg ">Modify Data</Button>
                <Button type="button" className="btn btn-secondary col-lg">Go out</Button>
                <Button type="button" className="btn btn-danger col-lg">Delete Account</Button>
            </div>
            <div className="row">
                        <label htmlFor="fName">First Name *</label>
                        <input type="text" className="form-control" id="fname" required
                        onChange={change} onInput={change} name="fName" />
            </div>
        </div>
    );
}

export default ViewData;