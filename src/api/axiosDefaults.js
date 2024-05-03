import axios from "axios";

axios.defaults.baseURL = 'https://drfapill-6d3c36398683.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();