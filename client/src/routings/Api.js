import axios from 'axios'

export default axios.create({
    base: process.env.REACT_APP_WEBSITE_URL,
    withCredentials: true,
    credentials: "include",
});