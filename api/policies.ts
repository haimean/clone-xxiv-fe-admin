import { BaseApi } from '~/core/api'

export default class PoliciesApi extends BaseApi {
  async getPolicies(type_code: string) {
    return await this.axios.get('/policies', {
      params: {
        type_code
      },
    });
  }
  async updatePolicies(id: number, typeCode: String, content: String) {
    return await this.axios.put('/policies', {
        id, typeCode, content
    });
  }
}