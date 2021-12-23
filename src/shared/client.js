import http from "./http-common";

class clientData{

    getAllClients(){
        return http.get("Client");
    }

    getClient(id){
        return http.get( `Client/${id}`); 
    } 

    getCardsClient(id){
        return http.get(`Client/cards/${id}`);
    }

    createClient(client){
        return http.post("Client", client);
    }

    updateClient(client, id){
        return http.put(`Client/${id}`, client);
    }

    deleteClient(id){
        return http.delete( `Client/${id}`); 
    } 

}
export default new clientData(); 
    
