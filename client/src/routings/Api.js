import axios from 'axios'

export default axios.create({
    base: "http://localhost:8000/",
    withCredentials: true,
    credentials: "include",
});