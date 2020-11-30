import axios from 'axios'

export default axios.create({
    base: "",
    withCredentials: true,
    credentials: "include",
});