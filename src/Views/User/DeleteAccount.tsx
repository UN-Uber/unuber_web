import { useMutation , gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';


const DELETE_ACCOUNT = gql `mutation UpdateClient($idClient: Int!, $client: ClientInput!) {
    updateClient(idClient: $idClient, client: $client)
} `;


const DeleteAccount = ({token, client, goBackDelete}) => {
    let navigate = useNavigate();

    const [open, setOpen] = useState(true);

    const goBack = () =>{
        setOpen(false);
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

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return(
        <Box sx={{height: '150vh'}}>
            <Modal
                hideBackdrop
                open={open}
                onClose={goBack}
                aria-labelledby="Eliminar cuenta"
            >
                <Box sx={{ ...style, width: 500, p: 4 }}>
                    <Typography component="h1" variant="h4" sx={{mb: 2}}>
                        Eliminar cuenta
                    </Typography>
                    <Typography  sx={{mb: 4, fontWeight: 300, fontSize: 20}}>
                        ¿Estás seguro de eliminar tu cuenta?
                    </Typography>
                    <Stack spacing={2} direction="row">
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={deleteAccount}>Eliminar cuenta</Button>
                        <Button variant="contained" onClick={goBack}>Cancelar</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>       
    );
};

export default DeleteAccount;