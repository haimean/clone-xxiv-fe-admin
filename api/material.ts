import { BaseApi } from "~/core/api";

export default class MaterialApi extends BaseApi {
  async getMaterials(keyword: string, page: number, per_page: number) {
    return await this.axios.get("/materials", {
      params: { keyword, page, per_page },
    });
  }
  async deleteMaterials(id: number) {
    return await this.axios.delete(`/materials/${id}`);
  }
  async uploadCSVMaterials(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return await this.axios.post("/supplier_material/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}
