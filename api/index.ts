
import UserApi from './user';
import PatentsApi from './patents';
import PoliciesApi from './policies';
import BrandAPI from './brands';
import AuthApi from "./auth";
import MaterialApi from './material';
import { BaseApi } from '~/core/api'

export default class RootApi extends BaseApi {
    deps = {
        brand: BrandAPI,
        user: UserApi,
        patents: PatentsApi,
        auth: AuthApi,
        material:MaterialApi,
        policies: PoliciesApi,
    }
}
