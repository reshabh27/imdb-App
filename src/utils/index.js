import axios from "axios";

const productionUrl = process.env.REACT_APP_API_URL;

export const customFetch = axios.create({
  baseURL: productionUrl,
});
