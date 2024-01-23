import axios from "axios";

const productionUrl = "https://imdb-api-26h7.onrender.com/";

export const customFetch = axios.create({
  baseURL: productionUrl,
});
