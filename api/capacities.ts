import { BaseApi } from "~/core/api";

export default class CapacityApi extends BaseApi {
  async getAll() {
    return await this.axios.get("/capacity/get-all", {});
  }
  async delete(id: number) {
    return await this.axios.delete(`/capacity/${id}`);
  }
  async update(
    id: number,
    name: String,
  ) {
    return await this.axios.post(`/capacity/update`, {
      id,
      name,

    })
  }
  async create(
    name: String,
  ) {
    return await this.axios.post(`/capacity/create`, {
      name,
    });
  }
  async show(id: number) {
    return await this.axios.get(`/capacity/${id}`);
  }
}
