import { BaseApi } from "~/core/api";

export default class PatentsApi extends BaseApi {
  async getPatents(keyword: string, page: string, per_page: string) {
    return await this.axios.get(`/patents`, {
      params: {
        keyword,
        page,
        per_page,
      },
    });
  }
  async deletePatent(id: Number) {
    return await this.axios.delete(`/patents/${id}`);
  }
  async uploadCSVpatent(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return await this.axios.post("/patent_material/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
