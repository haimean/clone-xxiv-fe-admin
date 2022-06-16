<template>
  <div>
    <b-button class="px-7" type="is-info" @click="openCardCreate"
      >Create</b-button
    >
    <div class="rounded-[12px] min-h-[500px] mt-5 bg-[#FFFFFF] font-sans">
      <div class="pt-[28px] is-flex is-justify-content-space-between">
        <div class="ml-[32px] text-[16px] font-bold text-[#212121]">
          <p>List Fragrance</p>
        </div>
      </div>
      <hr class="mt-[12px] mb-[33px] w-full" />

      <section class="w-[1220px] ml-[37px]">
        <b-table
          :data="listFragrances"
          hoverable
          scrollable
          :paginated="true"
          :per-page="5"
          :current-page="1"
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
            <div class="w-[50px]">
              <b-button
                size="is-small"
                class="btn-update"
                tag="button"
                @click="openCardUpdate(props.row)"
              >
                Update</b-button
              >
            </div>
          </b-table-column>
          <b-table-column field="delete" v-slot="props" centered>
            <div class="w-[50px]">
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
    </div>
    <b-modal v-model="isCardUpdateActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <FragranceCard
            button="Update"
            title="Update Fragrance"
            :data="fragrance"
            @update="updateFragrance"
          />
        </div>
      </div>
    </b-modal>

    <b-modal v-model="isCardCreateActive" :width="640" scroll="keep">
      <div class="card">
        <div class="card-content">
          <FragranceCard
            button="Create"
            title="Create Fragrance"
            :data="fragrance"
            @update="createFragrance(fragrance)"
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
      listFragrances: [],
      fragrance: {
        id: null,
        name: "",
        description: "",
        image_uuid: "",
      },
    };
  },
  mounted() {
    this.getFragrances();
  },
  methods: {
    async getFragrances() {
      try {
        await this.$api.fragrance
          .getAll()
          .then((response) => {
            this.listFragrances = response.data;
            console.log(this.listFragrances)
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
        message: "Do you want delete Fragrance",
        confirmText: "Ok",
        cancelText: "Cancel",
        type: "is-danger",
        onConfirm: () => this.deleteFragrance(id),
      });
    },
    async deleteFragrance(id) {
      await this.$api.fragrance
        .delete(id)
        .then(
          this.getFragrances(),
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

    openCardUpdate(data) {
      this.fragrance = data;
      this.isCardUpdateActive = true;
    },
    async updateFragrance(fragrance) {
      await this.$api.fragrance.update(
        fragrance.id,
        fragrance.name,
        fragrance.description,
        fragrance.image_uuid
      )
        .then(
          (this.isCardUpdateActive = false),
          (this.resetFragrance()),
          this.getFragrances(),
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
      this.resetFragrance();
      this.isCardCreateActive = true;
    },
    async createFragrance(fragrance) {
      await this.$api.fragrance
        .create(
          fragrance.name,
          fragrance.description,
          fragrance.image_uuid
        )
        .then(
          (this.isCardCreateActive = false),
          this.resetFragrance(),
          this.getFragrances(),
          this.$buefy.toast.open({
            message: `Create success`,
            type: "is-info",
            duration: 5000,
          })
        )
        .catch(() => {
          this.$buefy.toast.open({
            message: `Create fail`,
            type: "is-danger",
            duration: 5000,
          });
        });
    },
    resetFragrance() {
      this.fragrance.id = null;
      this.fragrance.name = "";
      this.fragrance.description = "";
      this.fragrance.image_uuid = "";
    },
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
