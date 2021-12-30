import axios from "axios";

const uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app";
const heroku = "https://unuberaccount.herokuapp.com/api"; 
const apilocal =  "http://localhost:4000/auth" 


class clientData{
    /*
    getAllClients(){
        return http.get("Client");
    }

    getClient(id){
        return http.get( `Client/${id}`); 
    } 

    getCardsClient(id){
        return http.get(`Client/cards/${id}`);
    }
    */
    /*createClient(client){
        return http.post("Client", client);
    }*/

    createClient(client){
        console.log(client);
        return axios.post(apilocal,{
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
    /*
    updateClient(client, id){
        return http.put(`Client/${id}`, client);
    }
    
    deleteClient(id){
        return http.delete( `Client/${id}`); 
    }
    
    */

}
export default new clientData(); 

