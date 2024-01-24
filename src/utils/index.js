import axios from "axios";

const productionUrl = "https://imdb-api-2d5d2-default-rtdb.firebaseio.com";

export const customFetch = axios.create({
  baseURL: productionUrl,
});
