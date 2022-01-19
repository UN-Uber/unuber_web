import React, { useEffect, useState} from "react";
import axios from "axios";
import { Button, Container } from "react-bootstrap";
import {useSelector} from 'react-redux';
import { RootState } from "@/store";
import {useNavigate} from 'react-router-dom';
import FileUpload from "@/Views/User/FileUpload";

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
    return axios.post(apilocal, {
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
        setStatus({ ...status , loading :true });
        updateClient(id, token, client).then((data) =>{
            setStatus({ ...status , loading :false });
            if(data.data.data.updateClient === '200'){
                alert("Your data have been succesfully changed");
                navigate('/viewData');
            }else{
                alert("Email or number have already been registered");
            }
        });
    }

    function chPassword(){
        setStatus({ ...status , loading :true });
        changePass(id, token, client).then((data) =>{
            setStatus({ ...status , loading :false });
            console.log(data);
            if(data.data.data.updatePassword.response === 'Password Changed'){
                alert("Your password have been changed succesfully");
                navigate('/viewData');
            }else{
                alert(data.data.data.updatePassword.response);
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

    return(
        <div>{client.active===1?(
            <div>{!status.loading?(
                <div className="submit-form registro2" id="registro">
                    
                    <h1 id="tituloR">Edit User Data</h1>

                    <div className="foto">
                        {/*<h2 id="tituloR">User image</h2>*/}
                        <div>{!status.image?(
                            <div>
                                <img className="ima" id="user-imagen" src={client.image} alt="User image"/>
                            <div className="container">
                                <button type="button" className="btn btn-warning col-lg" id="botonx" onClick={changeImageBu}>Change Picture</button>
                            </div>
                        </div>
                        ):(
                            <div className="file">
                                <FileUpload token={token} setImageUrl={setImageUrl}/>
                            </div>
                        )}</div>
                    </div>

                    <div className="form-group ff">
                        <label htmlFor="fName">First Name *</label>
                        <input type="text" className="form-control" id="fname" required value={client.fName}
                        onChange={e => setClient({...client, fName: e.target.value})} onInput={checkName} name="fName" />

                        <div>{checkName()?(
                            <Container>
                                <p>Name Must be a word without numbers nor spetial characters, with 3 or more characters</p>
                            </Container>
                        ):""}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sName">Second Name</label>
                        <input type="text" className="form-control" id="sName" value={client.sName}
                        onChange={e => setClient({...client, sName: e.target.value})}  onInput={checkSName} name="sName" />
            
                        <div>{checkSName()?(
                            <Container>
                                <p>Second Name Must be a word without numbers nor spetial characters, with 3 or more characters</p>
                            </Container>
                        ):""}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sureName">Sure Name * </label>
                        <input type="text" className="form-control" id="sureName" required value={client.sureName}
                        onChange={e => setClient({...client, sureName: e.target.value})} onInput={checkSureN} name="sureName" />
            
                        <div>{!checkSureN()?(
                            <Container>
                                <p>Sure name must be at most 3 words and at least with 3 or more characters each one</p>
                            </Container>
                        ):""}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="telNumber">Tel Number * </label>
                        <input type="number" className="form-control" id="telNumber" required value={client.telNumber}
                        onChange={e => setClient({...client, telNumber: e.target.value})} onInput={checkNumber} name="telNumber" />
                        <div>{checkNumber()?(
                            <Container>
                                <p>It must be a movil telephone number</p>
                            </Container>
                        ):""}</div>
                    </div>

                    <div className="form-group" id="emailc">
                        <label htmlFor="email">Email * </label>
                        <input type="text" className="form-control" id="email" required value={client.email}
                        onChange={e => setClient({...client, email: e.target.value})} onInput={checkEmail} name="email" />

                    <div>{checkEmail()?(
                        <Container>
                            <p>Type your email</p>
                        </Container>
                    ):""}</div>
                    </div>

                    <div className="btn-group btn-group2" role="group" aria-label="Actions">
                        <div>{checkFields()?(
                                <Button type="button" className="btn btn-success col-lg" id="botonx" onClick={saveChanges}>Save Changes</Button>
                            ):""}
                        </div>
                        <Button type="button" className="btn btn-secondary col-lg" id="botonx" onClick={goBack}>Go Back</Button>
                    </div>

                    <div id="cambio">{status.password?(
                        <div className="container">
                        
                            <div className="form-group">
                                <label htmlFor="password">Current Password *</label>
                                <input type="password" className="form-control" id="password" required value={client.password}
                                onChange={e => setClient({...client, password: e.target.value})}  name="password" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="password">New Password</label>
                                <input type="password" className="form-control" id="newPassword" required value={client.newPassword}
                                onChange={e => setClient({...client, newPassword: e.target.value})} onInput={checkPass} name="newPassword" />
                            </div>
                            
                            <div>{checkPass()?(
                                <Container>
                                    <p>Password must have at least 8 characters and at most 15, no spaces.</p>
                                </Container>
                            ):""}</div>
        
                            <div className="form-group">
                                <label htmlFor="password">Repeat new  Password *</label>
                                <input type="password" className="form-control" id="reNewPassword" required value={client.reNewPassword}
                                onChange={e => setClient({...client, reNewPassword: e.target.value})} onInput={checkRePass} name="reNewPassword" />
                            </div>

                            <div>{checkRePass()?(
                                <Container>
                                    <p>The two passwords must match</p>
                                </Container>
                            ):""}</div>

                            <div id="salto">
                                <div>
                                    {testPasswords()?(
                                        <Button type="button" className="btn btn-succes col-lg" id="botonx" onClick={chPassword}>Change Password and data</Button>
                                    ):""}
                                </div>
                                <Button type="button" className="btn btn-danger col-lg" id="botonx" onClick={cancelPassword}>Cancel</Button>
                            </div>
                        </div>
                            ):(
                                <Button type="button" className="btn btn-info col-lg" id="botonx" onClick={chPasswordBu}>ChangePassword</Button>
                            )}
                        </div>



                {/*<div className="row">    
                <div className="col-6" > 
                
                <div className="container">
                    <div className="row">
                    
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
                    </div>


                    <div className="row">
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
                    </div>
                    <div className="row">
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
                    </div>
                    <div className="row">
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
                    </div>
                    <div className="row">
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
                    </div>
                </div>
                <div className="btn-group" role="group" aria-label="Actions">
                    <div>{checkFields()?(
                            <Button type="button" className="btn btn-success col-lg" onClick={saveChanges}>Save Changes</Button>
                        ):""}
                    </div>
                    <Button type="button" className="btn btn-secondary col-lg" onClick={goBack}>Go Back</Button>
                </div>
                
                <div>{status.password?(
                        <div className="container">
                        <div className="form-group">
                            <label htmlFor="password">Current Password *</label>
                            <input type="password" className="form-control" id="password" required value={client.password}
                            onChange={e => setClient({...client, password: e.target.value})}  name="password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input type="password" className="form-control" id="newPassword" required value={client.newPassword}
                            onChange={e => setClient({...client, newPassword: e.target.value})} onInput={checkPass} name="newPassword" />
                        </div>
                        <div>{checkPass()?(
                            <Container>
                                <p>Password must have at least 8 characters and at most 15, no spaces.</p>
                            </Container>
                        ):""}</div>
    
                        <div className="form-group">
                                <label htmlFor="password">Repeat new  Password *</label>
                                <input type="password" className="form-control" id="reNewPassword" required value={client.reNewPassword}
                                onChange={e => setClient({...client, reNewPassword: e.target.value})} onInput={checkRePass} name="reNewPassword" />
                        </div>
                        <div>{checkRePass()?(
                            <Container>
                                <p>The two passwords must match</p>
                            </Container>
                        ):""}</div>
                        <div>
                            <div>
                                {testPasswords()?(
                                    <Button type="button" className="btn btn-succes col-lg" onClick={chPassword}>Change Password and data</Button>
                                ):""}
                            </div>
                        <Button type="button" className="btn btn-danger col-lg" onClick={cancelPassword}>Cancel</Button>
                        </div>
                    </div>
                    ):(
                        <Button type="button" className="btn btn-info col-lg" onClick={chPasswordBu}>ChangePassword</Button>
                    )}
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
            <>
            <h1>User has desactive the account, please go to th following link: </h1>
            <h2><a href="https://i.pinimg.com/736x/58/e2/8f/58e28fae02def3695760602649056285.jpg"> Restore Account</a></h2>
            </>
        )}</div>
    );
}

export default EditData;