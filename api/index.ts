import UserApi from "./user";
import BrandApi from "./brands";
import FragranceApi from "./fragrances";
import CapacityApi from "./capacities";
import ProductApi from "./products";
import { BaseApi } from "~/core/api";

export default class RootApi extends BaseApi {
  deps = {
    fragrance: FragranceApi,
    brand: BrandApi,
    user: UserApi,
    capacity: CapacityApi,
    product: ProductApi,
  };
}
