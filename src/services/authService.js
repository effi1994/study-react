import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey="token";

http.setJwt(getJwt());
export async function login(username, password) {
    const { data: jwt } = await http.post(apiEndpoint, { username, password });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);

}

export function logout() {
    localStorage.removeItem(tokenKey);
}


export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (error) {
        return null;
    }
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}


const authExport = {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
}

export default authExport;