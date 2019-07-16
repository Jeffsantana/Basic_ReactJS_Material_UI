import axios from "axios";
import { constants } from "../config";

const UploadAvatar = axios.create({
  baseURL: constants.api,
  headers: {
    Accept: "application/json"
  }
});

export default UploadAvatar;
