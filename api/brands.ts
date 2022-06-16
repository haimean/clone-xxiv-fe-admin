import { BaseApi } from "~/core/api";

export default class BrandApi extends BaseApi {
  async getBrands() {
    return await this.axios.get("/brand/get-brands", {});
  }
  async store(id: number) {
    return await this.axios.post(`/store`);
  }
  async delete(id: number) {
    return await this.axios.delete(`/brand/${id}`);
  }
  async update(
    id: number,
    name: String,
    description: String,
    image_uuid: String
  ) {
    return await this.axios.post(`/brand/update`, {
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
    return await this.axios.post(`/brand/create`, {
      name,
      description,
      image_uuid,
    });
  }
  async show(id: number) {
    return await this.axios.get(`/brand/${id}`);
  }
}
