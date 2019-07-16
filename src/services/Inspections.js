import { api } from ".";
let destiny = "inspection";
export default class Inspections {
  static async listOne(id) {
    return api
      .get(`/${destiny}-listone/${id}`)
      .then(async response => {
        if (response.status) {
          for (let i = 0; i < response.data.docs.length; i++) {
            response.data.docs[i].num_serie =
              response.data.docs[i]._aircraftId.num_serie;
            response.data.docs[i].registry =
              response.data.docs[i]._aircraftId.marca;
            response.data.docs[i].model =
              response.data.docs[i]._aircraftId.modelo;
            response.data.docs[i].make =
              response.data.docs[i]._aircraftId.fabricante;
            response.data.docs[i].operator =
              response.data.docs[i]._aircraftId.operador;
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
          message: error.response.data.message || "Not Found"
        };
      });
  }
  static async listPage(page) {
    const params = { page };
    return api
      .get(`/${destiny}-listall`, { params })
      .then(async response => {
        if (response.status) {
          for (let i = 0; i < response.data.docs.length; i++) {
            // console.log(response.data.docs[i]);
            response.data.docs[i].company =
              response.data.docs[i]._contractorId.name;
            response.data.docs[i].status = response.data.docs[i]._statusId.name;
            response.data.docs[i].aircraft =
              response.data.docs[i]._aircraftId.marca +
              " - " +
              response.data.docs[i]._aircraftId.modelo +
              " - " +
              response.data.docs[i]._aircraftId.num_serie;
          }
          return {
            data: response.data,
            ok: true
          };
        } else {
          return {
            ok: false,
            message: response.data.message || "Not Found!1"
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
          message: error.response.data.message || "Not Found"
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
