import React , {Component} from "react";
import { Button } from 'react-bootstrap';

class CreateClient extends Component{
    constructor(props){
        super(props);

        this.onChangefName = this.onChangefName.bind(this);
        this.onChangesName = this.onChangesName.bind(this);
        this.onChangeSureName = this.onChangeSureName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.addClient = this.addClient.bind(this);

        this.state = {
            id:null,
            fName: "",
            sName: "",
            sureName: "",
            active: null,
            email: "",
            telNumber: null,
            password:"",
            image: "",
            submitted : false
        };
    }

    componentDidMount(){
        //var clients = this.props.fetchClients();
        console.log("Se montó el componente de crear cliente")

    }

    onChangefName(e){
        this.setState({
            fName: e.target.value,
        });
    }

    onChangesName(e){
        this.setState({
            sName: e.target.value,
        });
    }

    onChangeSureName(e){
        this.setState({
            sureName: e.target.value,
        });
    }
    
    onChangeEmail(e){
        this.setState({
            email: e.target.value,
        });
    }

    onChangeNumber(e){
        this.setState({
            telNumber: e.target.value,
        });
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value,
        });
    }

    addClient(){
        console.log("se Hace click en el boton perruno")
        const client =  {
            fname : this.state.fName,
            sName : this.state.sName,
            sureName : this.state.sureName,
            active : 1,
            email : this.state.email,
            telNumber : this.state.telNumber,
            password : this.state.password,
            image :  "image"
        };
        console.log(client);

        this.props.addClient(client).then((data) =>{
            this.setState({
                id: data.idClient,
                fName: data.fName,
                sName : data.sName,
                sureName : data.sureName,
                active : data.active,
                email : data.email,
                telNumber : data.telNumber,
                password : data.password,
                image : data.image,
                
                submitted : true
            });
            console.log(data);
        }).catch((e) =>{
            console.log(e);
        });
    }

    render(){
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>
                            Se ha registrado correctamente
                        </h4>
                    </div>
                ):(
                    <div>
                        <div className="form-group">
                            <label htmlFor="fName">First Name</label>
                            <input type="text" className="form-control" id="fname" required value={this.state.fName}
                            onChange={this.onChangefName} name="fName" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sName">Second Name</label>
                            <input type="text" className="form-control" id="sName" value={this.state.sName}
                            onChange={this.onChangesName} name="sName" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="sureName">Sure Name</label>
                            <input type="text" className="form-control" id="sureName" required value={this.state.sureName}
                            onChange={this.onChangeSureName} name="sureName" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" id="email" required value={this.state.email}
                            onChange={this.onChangeEmail} name="email" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="telNumber">Tel Number</label>
                            <input type="number" className="form-control" id="telNumber" required value={this.state.telNumber}
                            onChange={this.onChangeNumber} name="telNumber" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" required value={this.state.password}
                            onChange={this.onChangePassword} name="password" />
                        </div>

                        <Button onClick={this.addClient} className="btn btn-succes">
                            Create Account
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}


export default CreateClient;