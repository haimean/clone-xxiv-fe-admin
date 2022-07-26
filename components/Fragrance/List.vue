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

      <section class="w-[1220px] ml-[37px]">
        <b-table
          :data="listFragrances"
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

          <b-table-column field="name" label="Name" v-slot="props">
            <div class="w-[80px]">{{ props.row.name }}</div>
          </b-table-column>
          <b-table-column field="imange" label="Image" sortable v-slot="props">
            <div class="w-[80px]">{{ props.row.image }}</div>
          </b-table-column>
          <b-table-column field="edit" v-slot="props" centered>
            <div class="w-[50px]">
              <b-button
                size="is-small"
                class="btn-update"
                tag="button"
                type="is-info"
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
        image: "",
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
      await this.$api.fragrance
        .update(fragrance)
        .then(
          (this.isCardUpdateActive = false),
          this.resetFragrance(),
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
        .create(fragrance.name, fragrance.image)
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
      this.fragrance.image = "";
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