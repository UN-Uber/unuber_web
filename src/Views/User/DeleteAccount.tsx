import {useMutation , gql} from "@apollo/client";
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';


const DELETE_ACCOUNT = gql `mutation UpdateClient($idClient: Int!, $client: ClientInput!) {
    updateClient(idClient: $idClient, client: $client)
} `;


const DeleteAccount = ({token, client, goBackDelete}) => {
    let navigate = useNavigate();
    const goBack = () =>{
        goBackDelete();
    }

    const [responseDel] = useMutation(DELETE_ACCOUNT,{
        context:{
            headers:{
                'Authorization': `${token}`,
            }
        }, onCompleted:(data) =>{
            console.log(data);
            alert("User has been deleted");
        }
    });


    const deleteAccount = () =>{
        responseDel({variables:{
            idClient: client.idClient,
            client: {
                fName: `${client.fName}`,
                sName: `${client.sName}`,
                sureName: `${client.sureName}`,
                active: 0,
                email: `${client.email}`,
                telNumber: `${client.telNumber}`,
                password: `${client.password}`,
                image: `${client.image}`,
    }
        }});
        navigate('/home');
    }

    return(
        <>
            <div className="container">
            <h1>Delete Account</h1>
            <h2>Are you sure?</h2>
            <Button type="button" className="btn btn-succes col-lg" onClick={goBack}>Go Back, keeep account</Button>
            <Button type="button" className="btn btn-danger col-lg" onClick={deleteAccount}>Delete Account</Button>
            </div>
        </>
        
    );
};

export default DeleteAccount;