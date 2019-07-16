import axios from "axios";
import { constants } from "../config";

const service_excel = axios.create({
  baseURL: constants.service_excel,
  headers: {
    Accept: "application/json"
  }
});

export default service_excel;
