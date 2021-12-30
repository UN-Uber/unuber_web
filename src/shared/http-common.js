
import axios from "axios";

var uriGraphql = "https://general-api-f6ljpbkkwa-uc.a.run.app";
var heroku = "https://unuberaccount.herokuapp.com/api"; 

export default axios.create({
    baseURL: uriGraphql,
    headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Headers" : "Content-Type",    
    'Access-Control-Allow-Origin': 'https://unuberaccount.herokuapp.com/api',
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",

    }
});