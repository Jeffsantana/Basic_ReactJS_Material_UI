import { api } from ".";

export default class VinciModels {
  static async UpdateMany(body) {
    // console.log(body);
    return api
      .put(`/sanitize-model`, body)
      .then(async response => {
        if (response.status) {
          return {
            data: response.data,
            ok: true,
            message: "Update many with success"
          };
        } else {
          return {
            ok: false,
            message: response.data.message || "Not Found!"
          };
        }
      })
      .catch(error => {
        return {
          ok: false,
          message: error.message || "Not Found"
        };
      });
  }
}
