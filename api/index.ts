import UserApi from "./user";
import BrandApi from "./brands";
import FragranceApi from "./fragrances";
import { BaseApi } from "~/core/api";

export default class RootApi extends BaseApi {
  deps = {
    fragrance: FragranceApi,
    brand: BrandApi,
    user: UserApi,
  };
}
