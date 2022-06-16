
<template>
  <section class="mt-[60px]">
    <div class="is-flex is-justify-content-flex-end">
      <b-button type="is-warning" @click="submit">保存する</b-button>
    </div>
    <div class="mt-[24px]">
      <Editor v-model="content" />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      content: "",
      typeCode: "type_02",
    };
  },
  mounted() {
    this.getPolicies();
  },
  methods: {
    async getPolicies() {
      try {
        await this.$api.policies.getPolicies(this.typeCode).then((data) => {
          const policies = data.data.policies;
          this.content = policies[0].content;
          this.id = policies[0].id;
          this.typeCode = policies[0].typeCode;
        });
      } catch (e) {
        this.$buefy.toast.open({
          message: e,
          type: "is-danger",
          duration: 5000,
        });
      }
    },
    async submit() {
      try {
        await this.$api.policies
          .updatePolicies(this.id, this.typeCode, this.content)
          .then((data) => {
            const policies = data.data.updatedPolicy;
            this.content = policies.content;
            this.id = policies.id;
            this.typeCode = policies.typeCode;
            this.$buefy.toast.open({
              message: "更新に成功",
              type: "is-success",
              duration: 5000,
            });
          });
      } catch (e) {
        this.$buefy.toast.open({
          message: e,
          type: "is-danger",
          duration: 5000,
        });
      }
    },
  },
};
</script>
<style lang="scss" scope>
.is-warning span {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  letter-spacing: 0.02em;
  color: #ffffff;
  margin: 4px 60px;
}
</style> 