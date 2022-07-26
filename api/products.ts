import { BaseApi } from "~/core/api";

export default class ProductApi extends BaseApi {
  async getAll() {
    return await this.axios.get("/product/get-all");
  }
  async delete(id: number) {
    return await this.axios.delete(`/product/${id}`);
  }
  async get(id: number) {
    return await this.axios.get(`/product/${id}`);
  }
  async update(product: any) {
    return await this.axios.post(`/product/update`, {
      age: product.age,
      brands_id: product.brands_id,
      capacities: product.capacities,
      content: product.content,
      day: product.day,
      description: product.description,
      id: product.id,
      image: product.image,
      last_scent: product.last_scent,
      main_scent: product.main_scent,
      middle_scent: product.middle_scent,
      top_scent: product.top_scent,
      night: product.night,
      published_at: product.published_at,
      sex: product.sex,
      summer: product.summer,
      time_smell: product.time_smell,
      title: product.title,
      winter: product.winter,
      fall: product.fall,
      spring: product.spring,
    });
  }
  async create(product: any) {
    return await this.axios.post(`/product/create`, {
      age: product.age,
      brands_id: product.brands_id,
      capacities: product.capacities,
      content: product.content,
      day: product.day,
      description: product.description,
      // id: product.id,
      image: product.image,
      last_scent: product.last_scent,
      main_scent: product.main_scent,
      middle_scent: product.middle_scent,
      top_scent: product.top_scent,
      night: product.night,
      published_at: product.published_at,
      sex: product.sex,
      summer: product.summer,
      time_smell: product.time_smell,
      title: product.title,
      winter: product.winter,
      fall: product.fall,
      spring: product.spring,
    });
  }
  async show(id: number) {
    return await this.axios.get(`/product/${id}`);
  }
}
