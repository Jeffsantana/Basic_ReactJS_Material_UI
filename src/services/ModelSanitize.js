import { api } from "./";

export default class ModelSanitize {
  static async get() {
    return api
      .get("/aircraft-model-sanitize")
      .then(async response => {
        if (response.status) {
          return {
            data: response.data,
            ok: true
          };
        } else {
          return {
            ok: false,
            message: response.data.message || "Usuário não autorizado!"
          };
        }
      })
      .catch(error => {
        return {
          ok: false,
          message: error.message || "Usuário não autorizado!"
        };
      });
  }
}
