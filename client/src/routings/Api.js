import axios from 'axios'

export default axios.create({
    baseURL: process.env.REACT_APP_SERVER_PORT,
    withCredentials: true,
    credentials: "include",
});