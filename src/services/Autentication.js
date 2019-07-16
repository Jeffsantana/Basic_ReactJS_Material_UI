import { api } from "./";

export default class Autentication {
  static async login(data) {
    return api
      .post("/login", data)
      .then(async response => {
        if (response.status) {
          return {
            data: response.data,
            ok: true
          };
        } else {
          return {
            ok: false,
            message: response.message || "User not authorized!"
          };
        }
      })
      .catch(error => {
        return {
          ok: false,
          message: error.response.data.message || "User not authorized!"
        };
      });
  }

  static async validateToken(data) {
    return api
      .post("/validate-token", data)
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
          message: error.response.data.message || "Usuário não autorizado!"
        };
      });
  }
}
