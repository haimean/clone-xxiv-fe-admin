<template>
  <div class="rounded-[12px] min-h-[500px] mt-[68px] bg-[#FFFFFF] font-sans">
    <div class="pt-[28px] is-flex is-justify-content-space-between">
      <div class="ml-[32px] text-[16px] font-bold text-[#212121]">
        <p>List Brand</p>
      </div>
    </div>
    <hr class="mt-[12px] mb-[33px] w-full" />
    <section class="w-[1220px] ml-[37px]">
      <b-table
        :data="listBrands"
        hoverable
        scrollable
        :paginated="true"
        :per-page="per_page"
        :current-page="page"
      >
        <b-table-column centered field="id" label="ID" v-slot="props">
          <div class="w-[50px]">{{ props.row.id }}</div>
        </b-table-column>

        <b-table-column field="name" label="Name" v-slot="props">
          <div class="w-[80px]">{{ props.row.name }}</div>
        </b-table-column>

        <b-table-column
          field="description"
          label="Description"
          sortable
          v-slot="props"
        >
          <div class="w-[120px]">{{ props.row.description }}</div>
        </b-table-column>
        <b-table-column field="imange" label="Image" sortable v-slot="props">
          <div class="w-[80px]">{{ props.row.image_uuid }}</div>
        </b-table-column>
        <b-table-column field="edit" v-slot="props" centered>
          <div class="w-[100px]">
            <b-button
              size="is-small"
              class="btn-update"
              tag="button"
              @click="openModelEdit(props.row)"
              >Update</b-button
            >

            <b-button
              size="is-small"
              class="px-5 btn-delete"
              tag="button"
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

    <CardBrandCard />
  </div>
</template>

<script>
export default {
  data() {
    return {
      listBrands: [],
      page: 1,
      per_page: 7,
    };
  },
  mounted() {
    this.getBrands();
    console.log(this.listBrands);
  },
  watch: {
    page() {
      this.getBrands();
    },
  },
  methods: {
    async getBrands() {
      try {
        await this.$api.brand
          .getBrands()
          .then((response) => {
            this.listBrands = response.data;
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
    async deleteBrand(id) {
      await this.$api.brand.delete(id).then(
        this.getBrands(),
        this.$buefy.toast.open({
          message: `Delete success`,
          type: "is-success",
          duration: 5000,
        })
      ).catch(()=>{
          this.$buefy.toast.open({
          message: `Delete fail`,
          type: "is-danger",
          duration: 5000,
        })
      });
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

    // openModelEdit(data) {
    //   this.$buefy.modal.open({
    //     parent: this,
    //     component: CardBrandCard,
    //     hasModalCard: true,
    //     customClass: "custom-class custom-class-2",
    //     trapFocus: true,
    //   });
    // },
    // async updateUsers() {
    //   await this.$api.user
    //     .updateUsers(this.account.id, this.statusCode, this.typeCode)
    //     .then(this.getBrands());
    //   this.isComponentModalActive = false;
    //   this.$buefy.toast.open({ message: "更新に成功", type: "is-success" });
    // },
  },
};
</script>

<style scoped>
::v-deep .control.has-icons-left .input {
  border-radius: 20px;
  font-size: 12px;
  color: #50403b;
}
::v-deep .control.has-icons-left .icon.is-left {
  height: 35px;
}
::v-deep .button.is-small:not(.is-rounded) {
  border-radius: 3px;
}
.btn-update {
  background-color: #f78720;
  color: #ffffff;
  width: 90px;
  height: 30px;
}
.btn-delete {
  background-color: #ff0000;
  color: #ffffff;
  width: 90px;
  height: 30px;
}
::v-deep .pagination-previous,
::v-deep .pagination-next {
  display: none;
}
::v-deep .b-table .table th {
  background-color: #73625d;
  color: #ffffff;
  height: 56px;
  font-size: 14px;
  font-family: Roboto;
  text-align: center;
  padding-top: 18px;
  font-weight: 700;
  border-bottom-color: #73625d;
}
::v-deep.b-table .table td {
  font-weight: 400;
  font-size: 14px;
  color: #50403b;
  font-family: Roboto;
  padding-top: 23px;
  padding-bottom: 13px;
  border-bottom: 0.5px solid #e8e4e3;
}
::v-deep .control.has-icons-left .input {
  border-radius: 20px;
  height: 34px;
  width: 225px;
  margin-right: 43px;
}
::v-deep .pagination-list {
  margin-top: 40px;
  margin-bottom: 50px;
}
.edit {
  margin-top: 50px;
  margin-left: 47px;
  width: 117px;
  height: 32px;
  background-color: #f7c220;
  border-radius: 5px;
  color: #ffffff;
}
.button.is-medium {
  font-size: 14px;
}
</style>
