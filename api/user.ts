import { BaseApi } from "~/core/api";

export default class UserApi extends BaseApi {
  async getUsers(keyword: string, page:string, per_page:string) {
    return await this.axios.get("/users", {
      params: {
        keyword,
        page,
        per_page
      },
    });
  }
  async deleteUsers(id: number) {
    return await this.axios.delete(`/users/${id}`);
  }
  async updateUsers(id: number, statusCode: string, typeCode: string) {
    return await this.axios.patch(`/users/${id}`, {
      statusCode,
      typeCode,
    });
  }
}
