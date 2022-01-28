import React from "react";
import {useMutation , gql} from "@apollo/client";


const UPLOAD_FILE = gql ` mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
} `;


const FileUpload = ({token, setImageUrl}) => {

    const [imageUpload] = useMutation(UPLOAD_FILE, {
        context:{
            headers:{
                'Authorization': `${token}`
            }
        },onCompleted:(data)=>{
            console.log(data);
            setImageUrl(data.uploadFile);
        }});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        imageUpload({variables:{file}} );
    };
    
    return(
        <>
            <p>Selecciona un archivo</p>
            <input type="file" name="image" onChange={handleFileChange} />
        </>
    );
};

export default FileUpload;

