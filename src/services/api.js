import axios from "axios";
import { constants } from "../config";

const api = axios.create({
  baseURL: constants.api,
  headers: {
    Accept: "application/json"
  }
});

export default api;
