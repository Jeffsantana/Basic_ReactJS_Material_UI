import { api } from ".";

export default class Datarooms {
  static async listPage(page) {
    const params = { page };

    return api
      .get(`/inspection-listall/`, { params })
      .then(async response => {
        if (response.status) {
          return {
            data: response.data,
            ok: true
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
  // static async Search(find, page) {
  //   const params = { page };
  //   return api
  //     .get(`/aircraft-listall/${find}`, { params })
  //     .then(async response => {
  //       if (response.status) {
  //         return {
  //           data: response.data,
  //           ok: true
  //         };
  //       } else {
  //         return {
  //           ok: false,
  //           message: response.data.message || "Not Found!"
  //         };
  //       }
  //     })
  //     .catch(error => {
  //       return {
  //         ok: false,
  //         message: error.message || "Not Found"
  //       };
  //     });
  // }
  // static async listOne(find) {
  //   // const params = { page };
  //   const id = find;
  //   return api
  //     .get(`/aircraft/${id}`)
  //     .then(async response => {
  //       if (response.status) {
  //         return {
  //           data: response.data,
  //           ok: true
  //         };
  //       } else {
  //         return {
  //           ok: false,
  //           message: response.data.message || "Not Found!"
  //         };
  //       }
  //     })
  //     .catch(error => {
  //       return {
  //         ok: false,
  //         message: error.message || "Not Found"
  //       };
  //     });
  // }
  static async InsertOne(body) {
    return api
      .post(`/inspection`, body)
      .then(async response => {
        if (response.status) {
          return {
            data: response.data,
            ok: true,
            message: "Insert with success"
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
  static async UpdateOne(find, body) {
    const id = find;
    return api
      .put(`/inspection/${id}`, body)
      .then(async response => {
        if (response.status) {
          return {
            data: response.data,
            ok: true,
            message: "Update with success"
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
  static async DeleteOne(find) {
    // const params = { page };
    const id = find;
    return api
      .delete(`/inspection/${id}`)
      .then(async response => {
        if (response.status) {
          return {
            data: response.data,
            ok: true,
            message: "Delete with success"
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
          message: error.response.data.message || "Not Found"
        };
      });
  }
}
