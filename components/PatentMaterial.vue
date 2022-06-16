<template>
  <section style="margin-top: 54px">
    <div>
      <b-field class="file is-primary" :class="{ 'has-name': !!file }">
        <b-upload v-model="file" class="file-label" @input="uploadCSVpatent">
          <span class="file-cta">
            <span class="file-label mx-[30px]">CSVインポート</span>
          </span>
        </b-upload>
      </b-field>
    </div>
    <section class="contact min-h-[500px] pt-[24px]">
      <div class="is-flex is-justify-content-space-between">
        <div class="ml-[32px] text-[16px] font-bold text-[#212121]">
          <p>特許と原料一覧</p>
        </div>
        <div class="mr-[-27px]">
          <b-input
            class="input-search text-[12px]"
            placeholder="キーワードで検索する"
            v-model="keyword"
            icon="magnify"
            @keyup.native.enter="getPatents"
          >
          </b-input>
        </div>
      </div>
      <hr class="mt-[12px] mb-[33px] w-full" />

      <section class="ml-[32px] mr-[47px]">
        <b-table
          :data="patents"
          hoverable
          scrollable
          :paginated="true"
          :per-page="per_page"
          :current-page="page"
        >
          <template #pagination>
            <b-pagination
              v-model="page"
              :per-page="per_page"
              order="is-centered"
              :total="totalPatents"
            />
          </template>
          <b-table-column
            field="id"
            sortable
            label="ID"
            centered
            width="50"
            v-slot="props"
          >
            <div class="column-item-style">
              {{ props.row.id }}
            </div>
          </b-table-column>

          <b-table-column
            field="code"
            sortable
            centered
            label="特許番号"
            v-slot="props"
            width="100"
          >
            <div class="column-item-style">
              {{ props.row.code }}
            </div>
          </b-table-column>

          <b-table-column
            sortable
            field="name"
            label="出願人"
            width="100"
            v-slot="props"
          >
            <div class="name-style column-item-style">
              {{ props.row.name }}
            </div>
          </b-table-column>

          <b-table-column
            sortable
            field="published_at"
            label="出願日"
            centered
            width="150"
            v-slot="props"
          >
            <div class="column-item-style">
              {{ new Date(props.row.published_at).toLocaleDateString() }}
            </div>
          </b-table-column>

          <b-table-column
            sortable
            field="pdfLink"
            label="PDFのリンク"
            v-slot="props"
            width="300"
          >
            <div class="column-item-style link-style">
              <span>
                <a
                  class="text-[#50403B]"
                  :href="`${props.row.pdfLink}`"
                  target="_blank"
                >
                  {{ props.row.pdfLink }}
                </a>
              </span>
            </div>
          </b-table-column>

          <b-table-column
            sortable
            width="250"
            field="assignee"
            label="発明の名称"
            v-slot="props"
          >
            <div class="column-item-style title-style">
              {{ props.row.assignee }}
            </div>
          </b-table-column>
          <b-table-column width="100" field="delete" centered v-slot="props">
            <b-button
              type="is-danger"
              size="is-small"
              class="px-5 delete-btn"
              tag="button"
              @click="confirmDelete(props.row)"
              >削除</b-button
            >
          </b-table-column>

          <template #empty>
            <div class="has-text-centered">No records</div>
          </template>
        </b-table>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      patents: [],
      file: null,
      keyword: "",
      per_page: 7,
      page: 1,
      totalPatents: null,
    };
  },
  mounted() {
    this.getPatents();
  },
  watch: {
    page() {
      this.getPatents();
    },
  },
  methods: {
    async getPatents() {
      try {
        const data = await this.$api.patents.getPatents(
          this.keyword,
          this.page,
          this.per_page
        );
        this.patents = data.data.patents;
        this.totalPatents = data.data.totalPatents;
      } catch (e) {
        this.$buefy.toast.open({
          message: e,
          type: "is-success",
          duration: 5000,
        });
      }
    },
    async uploadCSVpatent() {
      await this.$api.patents.uploadCSVpatent(this.file);
      this.getPatents();
      this.$buefy.toast.open({
        message: "CSVアップロード成功しました",
        type: "is-success",
        queue: false,
        duration: 5000,
      });
    },
    confirmDelete(patent) {
      this.$buefy.dialog.confirm({
        message: "このアカウントを削除してもよろし",
        confirmText: "削除",
        cancelText: "キャンセル",
        type: "is-danger",
        onConfirm: () => this.delete(patent),
      });
    },
    async delete(patent) {
      try {
        await this.$api.patents.deletePatent(patent.id).then(() => {
          this.getPatents();
          this.$buefy.toast.open({
            message: "削除しました。",
            type: "is-success",
            duration: 5000,
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .control.has-icons-left .input {
  border-radius: 20px;
  font-size: 12px;
  color: #50403b;
  height: 34px;
  width: 225px;
  margin-right: 43px;
}
::v-deep .control.has-icons-left .icon.is-left {
  height: 35px;
}
::v-deep .control.has-icons-left .input {
  border-radius: 20px;
  height: 34px;
  width: 225px;
  margin-right: 74px;
}
::v-deep .button.is-small:not(.is-rounded) {
  border-radius: 3px;
  background-color: #ff0000;
}
::v-deep .column-item-style {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-style {
  width: 200px;
}
.link-style {
  width: 300px;
}
.name-style {
  width: 100px;
}
.delete-btn span {
  margin: 0 5px;
}
::v-deep .control input {
  background: #ffffff;
  border: 1px solid #f0e6d7;
  box-sizing: border-box;
  border-radius: 20px;
}
.button.is-danger {
  background-color: #f00000;
}
::v-deep .is-relative {
  color: #ffffff;
  font-size: 14px;
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
  padding-top: 20px;
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
th div {
  padding: 10px 0;
}
.contact {
  top: 142px;
  padding-bottom: 85px;
  margin-top: 24px;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 12px;
}
.control input {
  font-size: 12px;
}
.button span {
  font-size: 16px;
}
::v-deep.icon i {
  vertical-align: text-bottom;
}
::v-deep.mdi-24px.mdi:before {
  font-size: 16px;
  vertical-align: inherit;
}
::v-deep .table td {
  padding: 18px 0.75em;
  vertical-align: bottom;
}
.delete-btn {
  margin: 0 27px;
}
.upload {
  border-radius: 6px;
  font-size: 16px;
  font-family: roboto;
  font-weight: bold;
}
</style>
