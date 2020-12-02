import axios from 'axios'

export default axios.create({
    baseURL: process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT : process.env.REACT_APP_PRODUCTION_PORT ,
    withCredentials: true,
    credentials: "include",
});