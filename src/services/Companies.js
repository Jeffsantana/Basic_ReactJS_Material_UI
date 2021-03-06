import { api } from ".";
let destiny = "company";
export default class Companies {
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
  static async listPage(page) {
    const params = { page };
    return api
      .get(`/${destiny}`, { params })
      .then(async response => {
        if (response.status) {
          for (let i = 0; i < response.data.docs.length; i++) {
            // console.log(response.data.docs[i]);
            response.data.docs[i].country =
              response.data.docs[i].address.country;
          }
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
  static async listCountry() {
    return api
      .get(`/country-listall`)
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
        return {
          message: error.response.data.message || "Not Found"
        };
      });
  }
}
