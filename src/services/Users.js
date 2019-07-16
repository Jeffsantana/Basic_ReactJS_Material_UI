import { api } from ".";
let destiny = "user";
export default class Users {
  static async listOne(id) {
    return api
      .get(`/${destiny}-listone/${id}`)
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
  static async listMyUser() {
    return api
      .get(`/myuser`)
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
  static async listPage(page) {
    const params = { page };
    return api
      .get(`/${destiny}`, { params })
      .then(async response => {
        if (response.status) {
          // for (let i = 0; i < response.data.docs.length; i++) {
          //   // console.log(response.data.docs[i]);
          //   response.data.docs[i].company =
          //     response.data.docs[i]._company_id.name;
          // }
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
          message: error.response.data.message || "Not Found"
        };
      });
  }
  static async listPendingPage(page) {
    const params = { page };
    return api
      .get(`/${destiny}-pending`, { params })
      .then(async response => {
        if (response.status) {
          // for (let i = 0; i < response.data.docs.length; i++) {
          //   // console.log(response.data.docs[i]);
          //   response.data.docs[i].company =
          //     response.data.docs[i]._company_id.name;
          // }
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
          message: error.response.data.message || "Not Found"
        };
      });
  }
  static async UpdateOne(find, body) {
    const id = find;
    return api
      .put(`/${destiny}/${id}`, body)
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
          message: error.response.data.message || "Not Found"
        };
      });
  }
  static async ConfirmPassword(body) {
    const send = {
      password: body.password,
      email: body.email
    };
    return api
      .post(`/confirm-password`, send)
      .then(async response => {
        if (response.status) {
          return {
            ok: true,
            message: "Password are ok"
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
  static async Search(find, page) {
    const params = { page };
    return api
      .get(`/${destiny}-listall/${find}`, { params })
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
  static async InsertOne(body) {
    return api
      .post(`/${destiny}`, body)
      .then(async response => {
        console.log(response);
        if (response.status) {
          return {
            data: response.data,
            ok: true,
            message: "Insert with success"
          };
        } else {
          return {
            ok: false,
            message: response || "Not Found!"
          };
        }
      })
      .catch(error => {
        // console.log("response on service");
        // console.log(error.response.data.message);
        return {
          message: error.response.data.message || "Not Found"
        };
      });
  }
  static async DeleteOne(find) {
    const id = find;
    return api
      .delete(`/${destiny}/${id}`)
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
          message: error.message || "Not Found"
        };
      });
  }
}
