import { BaseApi } from "~/core/api";

export default class FragranceApi extends BaseApi {
  async getAll() {
    return await this.axios.get("/fragrance/get-all", {});
  }
  async delete(id: number) {
    return await this.axios.delete(`/fragrance/${id}`);
  }
  async update(
    id: number,
    name: String,
    description: String,
    image_uuid: String
  ) {
    return await this.axios.post(`/fragrance/update`, {
      id,
      name,
      description,
      image_uuid,
    });
  }
  async create(
    name: String,
    description: String,
    image_uuid: String
  ) {
    return await this.axios.post(`/fragrance/create`, {
      name,
      description,
      image_uuid,
    });
  }
  async show(id: number) {
    return await this.axios.get(`/fragrance/${id}`);
  }
}
