import { api } from ".";

export default class VinciMakers {
  static async listPage(page) {
    const params = { page };

    return api
      .get(`/vinciMakers/`, { params })
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
  static async Search(find, page) {
    const params = { page };
    return api
      .get(`/vinciMaker-searchall/${find}`, { params })
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
  static async listAll(page) {
    const params = { page };
    return api
      .get(`/vinciMaker-listall`, { params })
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
  static async listOne(find) {
    // const params = { page };
    const id = find;
    return api
      .get(`/vinciMaker/${id}`)
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
          message: error.response.data.message || "Not Found"
        };
      });
  }
  static async InsertOne(body) {
    return api
      .post(`/vinciMaker`, body)
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
    // const params = { page };
    const id = find;
    return api
      .put(`/vinciMaker/${id}`, body)
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
      .delete(`/vinciMaker/${id}`)
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
