<template>
  <div>
    <b-button class="px-7" type="is-info" @click="openCardCreate"
      >Create</b-button
    >
    <div class="rounded-[12px] min-h-[500px] mt-5 bg-[#FFFFFF] font-sans">
      <div class="pt-[28px] is-flex is-justify-content-space-between">
        <div class="ml-7">
          <h1 class="title is-3">List Fragrance</h1>
        </div>
      </div>
      <hr class="mt-[12px] mb-[33px] w-full" />

      <section class="w-[1220px] mx-5 pb-5">
        <b-table
          :data="listProducts"
          hoverable
          scrollable
          :paginated="true"
          :per-page="5"
          :current-page="1"
        >
          <b-table-column
            centered
            field="id"
            label="ID"
            v-slot="props"
            class="w-[30px] is-flex is-justify-content-center"
          >
            <div class="">
              <div>{{ props.row.id }}</div>
            </div>
          </b-table-column>

          <b-table-column field="title" label="Title" sortable v-slot="props">
            <div class="w-[80px]">{{ props.row.title }}</div>
          </b-table-column>
          <b-table-column field="brand" label="Brand" v-slot="props">
            <div class="w-[80px]">
              {{ props.row.brand ? props.row.brand.name : "" }}
            </div>
          </b-table-column>

          <b-table-column
            field="quatity"
            label="Qantity"
            centered
            sortable
            v-slot="props"
            class="w-[30px] is-flex is-justify-content-center"
          >
            <div>{{ props.row.quatity }}</div>
          </b-table-column>

          <b-table-column
            field="description"
            label="Description"
            sortable
            v-slot="props"
          >
            <div class="w-[120px]">{{ props.row.description }}</div>
          </b-table-column>
          <b-table-column field="imange" label="Image" v-slot="props">
            <!-- <div class="w-[80px]">{{ props.row.image }}</div> -->
            <img height="10px" :src="props.row.image" />
          </b-table-column>
          <b-table-column field="edit" v-slot="props" centered>
            <div class="w-[50px]">
              <b-button
                size="is-small"
                class="btn-update"
                tag="button"
                type="is-info"
                @click="openCardUpdate(props.row.id)"
              >
                Update</b-button
              >
            </div>
          </b-table-column>
          <b-table-column field="delete" v-slot="props" centered>
            <div class="w-[50px]">
              <b-button
                size="is-small"
                class="px-5"
                type="is-danger"
                tag="button"
                ty
                @click="confirmDelete(props.row.id)"
                >Delete</b-button
              >
            </div>
          </b-table-column>
          <template #empty>
            <div class="has-text-centered">No records</div>
          </template>
        </b-table>
      </section>
    </div>
    <b-modal v-model="isCardUpdateActive" :width="1024" scroll="keep">
      <div class="card">
        <div class="card-content">
          <ProductCard
            button="Update"
            title="Update Product"
            :data="product"
            :brands="brands"
            :filteredTags="fragrances"
            :capacities="capacities"
            :fragrances="fragrances"
            @update="updateProduct"
          />
        </div>
      </div>
    </b-modal>

    <b-modal v-model="isCardCreateActive" :width="1024" scroll="keep">
      <div class="card">
        <div class="card-content">
          <ProductCard
            button="Create"
            title="Create Product"
            :brands="brands"
            :data="product"
            :fragrances="fragrances"
            :filteredTags="fragrances"
            :capacities="capacities"
            @update="createProduct"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCardUpdateActive: false,
      isCardCreateActive: false,
      listProducts: [],
      product: {
        age: null,
        brands_id: null,
        capacities: [],
        content: "",
        day: null,
        description: "",
        fall: null,
        id: null,
        image: [],
        last_scent: [],
        main_scent: [],
        middle_scent: [],
        night: null,
        published_at: "",
        sex: "",
        spring: null,
        summer: null,
        time_smell: null,
        title: "",
        top_scent: [],
      },
      fragrances: [],
      brands: [],
      capacities: [],
    };
  },

  mounted() {
    this.getProducts();
    this.getFragrances();
    this.getBrands();
    this.getCapacities();
  },
  methods: {
    async getProducts() {
      try {
        await this.$api.product
          .getAll()
          .then((response) => {
            this.listProducts = response.data;
          })
          .catch((e) => {
            Object.keys(err.response.data.errors).forEach((key) => {
              err.response.data.errors[key].forEach((msg) => {
                this.$notify.create({
                  message: msg,
                  color: "negative",
                });
              });
            });
          });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async getFragrances() {
      try {
        await this.$api.fragrance
          .getAll()
          .then((response) => {
            this.fragrances = response.data;
          })
          .catch((e) => {
            Object.keys(err.response.data.errors).forEach((key) => {
              e.response.data.errors[key].forEach((msg) => {
                this.$notify.create({
                  message: msg,
                  color: "negative",
                });
              });
            });
          });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async getBrands() {
      try {
        await this.$api.brand
          .getBrands()
          .then((response) => {
            this.brands = response.data;
          })
          .catch((e) => {
            Object.keys(err.response.data.errors).forEach((key) => {
              err.response.data.errors[key].forEach((msg) => {
                this.$notify.create({
                  message: msg,
                  color: "negative",
                });
              });
            });
          });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async getCapacities() {
      try {
        await this.$api.capacity
          .getAll()
          .then((response) => {
            this.capacities = response.data;
          })
          .catch((e) => {
            Object.keys(err.response.data.errors).forEach((key) => {
              err.response.data.errors[key].forEach((msg) => {
                this.$notify.create({
                  message: msg,
                  color: "negative",
                });
              });
            });
          });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    confirmDelete(id) {
      this.$buefy.dialog.confirm({
        message: "Do you want delete brand",
        confirmText: "Ok",
        cancelText: "Cancel",
        type: "is-danger",
        onConfirm: () => this.deleteBrand(id),
      });
    },
    confirmDelete(id) {
      this.$buefy.dialog.confirm({
        message: "Do you want delete Product",
        confirmText: "Ok",
        cancelText: "Cancel",
        type: "is-danger",
        onConfirm: () => this.deleteProduct(id),
      });
    },
    async deleteProduct(id) {
      await this.$api.product
        .delete(id)
        .then(
          this.getProducts(),
          this.$buefy.toast.open({
            message: `Delete success`,
            type: "is-success",
            duration: 5000,
          })
        )
        .catch(() => {
          this.$buefy.toast.open({
            message: `Delete fail`,
            type: "is-danger",
            duration: 5000,
          });
        });
    },
    openCardUpdate(id) {
      this.getProduct(id);
      this.isCardUpdateActive = true;
    },
    async updateProduct(product) {
      await this.$api.product
        .update(product)
        .then(
          (this.isCardUpdateActive = false),
          this.resetProduct(),
          this.getProducts(),
          this.$buefy.toast.open({
            message: `Update success`,
            type: "is-success",
            duration: 5000,
          })
        )
        .catch(() => {
          this.$buefy.toast.open({
            message: `Update fail`,
            type: "is-danger",
            duration: 5000,
          });
        });
    },
    openCardCreate() {
      this.resetProduct();
      this.isCardCreateActive = true;
    },
    async createProduct(product) {
      await this.$api.product
        .create(product)
        .then(
          (this.isCardCreateActive = false),
          this.resetProduct(),
          this.getProducts(),
          this.$buefy.toast.open({
            message: `Create success`,
            type: "is-info",
            duration: 5000,
          })
        )
        .catch((e) => {
          this.$buefy.toast.open({
            message: e,
            type: "is-danger",
            duration: 5000,
          });
        });
    },
    resetProduct() {
      this.product.id = null;
      this.product.title = "";
      this.product.sex = "";
      this.product.image_uuid = "";
    },
    async getProduct(id) {
      try {
        await this.$api.product.get(id).then((response) => {
          this.product = response.data;
        });
        return this.product;
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
</script>

<style>
.b-table .level {
  justify-content: center;
}
.pagination-next,
.pagination-previous {
  display: none;
}
</style>