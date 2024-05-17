import axios from "axios";

axios.defaults.baseURL = "https://drfapill-6d3c36398683.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// Allowing cross-origin requests to send credentials such as cookies.
axios.defaults.withCredentials = true;
// Creating two instances of Axios for different purposes (request and response handling).
// This allows for customization of interceptors and defaults separately for requests and responses.
export const axiosReq = axios.create();
export const axiosRes = axios.create();
