import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";


// export const api_base_url="http://localhost:8080";

 export const api_base_url="https://twitterbackend-production-ab64.up.railway.app";

// const jwt=localStorage.getItem("jwt");

// export const api=axios.create({
//     baseURL:api_base_url,
//     headers:{
//        "Authorization":`Bearer ${jwt}`,
//        "Content-Type":"application/json"
//     }
// })

export const api = axios.create({
    baseURL: api_base_url,
    headers: {
        "Content-Type": "application/json"
    }
});

    // Add an interceptor to include JWT from localStorage in every request
    api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem("jwt"); // Fetch the JWT token dynamically before every request
        if (jwt) {
            config.headers["Authorization"] = `Bearer ${jwt}`; // Set the Authorization header with the current token in api(axios object)
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
