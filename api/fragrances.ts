import { BaseApi } from "~/core/api";

export default class FragranceApi extends BaseApi {
  async getAll() {
    return await this.axios.get("/fragrance/get-all", {});
  }
  async delete(id: number) {
    return await this.axios.delete(`/fragrance/${id}`);
  }
  async update(fragrance: any) {
    return await this.axios.post(`/fragrance/update`, {
      id: fragrance.id,
      name: fragrance.name,
      image: fragrance.image,
    });
  }
  async create(fragrance: any) {
    return await this.axios.post(`/fragrance/create`, {
      name: fragrance.name,
      image: fragrance.image,
    });
  }
  async show(id: number) {
    return await this.axios.get(`/fragrance/${id}`);
  }
}
