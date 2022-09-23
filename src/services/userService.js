import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";


export function register(user) {
       console.log(user)
       return http.post(apiEndpoint, {
              firstName: user.firstName,
              lastName: user.lastName,
              username: user.username,
              password: user.password,
              email: user.email,
              phoneNumber: user.phoneNumber,
              city: user.city,
              country: user.country,
              address: user.address
       })

}