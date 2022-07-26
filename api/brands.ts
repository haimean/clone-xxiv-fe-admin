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
  async update(brand: any) {
    return await this.axios.post(`/brand/update`, {
      id: brand.id,
      name: brand.name,
      description: brand.description,
      logo: brand.logo,
      background: brand.background,
    });
  }
  async create(brand: any) {
    return await this.axios.post(`/brand/create`, {
      name: brand.name,
      description: brand.description,
      logo: brand.logo,
      background: brand.background,
    });
  }
  async show(id: number) {
    return await this.axios.get(`/brand/${id}`);
  }
}
