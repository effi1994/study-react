import http from "./httpService";
import  config  from "../config.json";

const apiEndpoint = config.apiUrl + "/auth";

export function login(username,password) { 
    return http.post(apiEndpoint,{username,password});   
}

