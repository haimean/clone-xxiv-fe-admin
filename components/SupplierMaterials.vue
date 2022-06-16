<template>
  <div class="mt-[55px]">
    <div>
      <b-field class="file is-primary" :class="{ 'has-name': !!file }">
        <b-upload
          v-model="file"
          class="file-label"
          accept=".csv"
          @click="$refs.fileInput.click()"
          @input="uploadCSVMaterials"
        >
          <span class="file-cta">
            <span class="file-label mx-[30px]">CSVインポート</span>
          </span>
        </b-upload>
      </b-field>
    </div>
    <div class="mt-[23px] bg-[#FFFFFF] font-sans min-h-[500px] rounded-[12px]">
      <div class="pt-[28px] is-flex is-justify-content-space-between">
        <div class="ml-[32px] text-[16px] font-bold text-[#212121]">
          <p>メーカと原料管理</p>
        </div>
        <div class="mr-[130px]">
          <b-input
            class="input-search text-[12px]"
            placeholder="キーワードで検索する"
            v-model="keyword"
            icon="magnify"
            @keyup.native.enter="getMaterials"
          >
          </b-input>
        </div>
      </div>
      <hr class="mt-[12px] mb-[33px] w-full" />
      <div class="ml-[32px] w-[700px]">
        <b-table
          hoverable
          :data="materials"
          :paginated="true"
          :per-page="per_page"
          :current-page="page"
        >
          <template #pagination>
            <b-pagination
              v-model="page"
              :per-page="per_page"
              order="is-centered"
              :total="totalMaterials"
            />
          </template>
          <b-table-column field="id" label="ID" centered v-slot="props">
            <div>
              {{ props.row.id }}
            </div>
          </b-table-column>

          <b-table-column field="name" label="原料名" v-slot="props">
            <div>{{ props.row.name }}</div>
          </b-table-column>

          <b-table-column
            sortable
            field="supplier"
            label="メーカ名"
            v-slot="props"
          >
            <div>{{ props.row.supplier }}</div>
          </b-table-column>
          <b-table-column width="100" field="delete" centered v-slot="props">
            <b-button
              type="is-danger"
              size="is-small"
              class="px-5 delete-btn"
              tag="button"
              @click="confirmDelete(props.row.id)"
              >削除</b-button
            >
          </b-table-column>

          <template #empty>
            <div class="has-text-centered">No records</div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      materials: [],
      file: null,
      keyword: null,
      totalMaterials: null,
      page: 1,
      per_page: 7,
    };
  },
  mounted() {
    this.getMaterials();
  },
  watch: {
    page() {
      this.getMaterials();
    },
  },
  methods: {
    async getMaterials() {
      try {
        await this.$api.material
          .getMaterials(this.keyword, this.page, this.per_page)
          .then((response) => {
            this.materials = response.data.materials;
            this.totalMaterials = response.data.totalMaterials;
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
    async deleteMaterials(id) {
      await this.$api.material.deleteMaterials(id).then(
        this.getMaterials(),
        this.$buefy.toast.open({
          message: `削除しました。`,
          type: "is-success",
          duration: 5000,
        })
      );
    },
    confirmDelete(id) {
      this.$buefy.dialog.confirm({
        message: "このアカウントを削除してもよろし",
        confirmText: "削除",
        cancelText: "キャンセル",
        type: "is-danger",
        onConfirm: () => this.deleteMaterials(id),
      });
    },
    async uploadCSVMaterials() {
      await this.$api.material.uploadCSVMaterials(this.file);
      this.getMaterials();
      this.$buefy.toast.open({
        message: "CSVアップロード成功しました",
        type: "is-success",
        queue: false,
        duration: 5000,
      });
    },
  },
};
</script>

<style scoped>
.upload {
  border-radius: 6px;
  font-size: 16px;
  font-family: roboto;
  font-weight: bold;
}
::v-deep .control.has-icons-left .input {
  border-radius: 20px;
  font-size: 12px;
  color: #50403b;
}
::v-deep .control.has-icons-left .icon.is-left {
  height: 33px;
}
::v-deep .button.is-small:not(.is-rounded) {
  border-radius: 3px;
  background-color: #ff0000;
}
::v-deep .pagination-previous,
::v-deep .pagination-next {
  display: none;
}
::v-deep .pagination-list {
  margin-top: 40px;
  margin-bottom: 50px;
}
::v-deep .b-table .table th {
  background-color: #73625d;
  color: #ffffff;
  height: 56px;
  font-size: 14px;
  font-family: Roboto;
  text-align: center;
  padding-top: 15px;
  border-bottom-color: #73625d;
}
::v-deep.b-table .table td {
  font-size: 14px;
  color: #50403b;
  font-family: Roboto;
  padding-top: 23px;
  padding-bottom: 13px;
  border-bottom: 0.5px solid #e8e4e3;
}
.delete-btn {
  margin-top: -5px;
}
</style>
