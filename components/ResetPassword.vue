<template>
  <div class="h-screen h-screen items-center flex">
    <form
      @submit="resetPassword"
      class="mx-auto h-[407px] w-[380px] border-[0.5px] border-[#E4DDD2] rounded-[10px]"
    >
      <ValidationObserver v-slot="{ invalid }">
        <div class="w-[316px] ml-[31px] mt-[21px]">
          <div style="text-align: center">
            <p class="title-login">Crowdchemの管理システム</p>
          </div>
          <section class="mt-[50px]">
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="password"
              name="新しいパスワード"
            >
              <b-field
                :type="errors.length ? 'is-danger' : ''"
                :message="errors[0]"
              >
                <b-input
                  ref="新しいパスワード"
                  v-model="newPassword"
                  type="password"
                  placeholder="新しいパスワード"
                >
                </b-input>
              </b-field>
            </ValidationProvider>
            <div class="mt-[30px]">
              <ValidationProvider
                v-slot="{ errors, valid }"
                rules="required|confirmed:password"
                name="新しいパスワード"
              >
                <b-field
                  :type="{ 'is-danger': errors[0], 'is-success': valid }"
                  :message="errors"
                >
                  <b-input
                    class="text-[17px]"
                    v-model="newPasswordConfirm"
                    name="password"
                    type="password"
                    placeholder="新しいパスワード（確認用)"
                    expanded
                  >
                  </b-input>
                </b-field>
              </ValidationProvider>
            </div>
          </section>
          <b-button
            :loading="loading"
            native-type="button"
            class="btnSignin"
            :disabled="invalid"
            @click="resetPassword"
            >パスワードリセット</b-button
          >
          <NuxtLink to="/Login" class="underline-offset-1">
            <p
              class="underline text-center mt-[18px] text-[#5E5E5E] text-[16px] font-sans"
            >
              ログインに戻る
            </p>
          </NuxtLink>
        </div>
      </ValidationObserver>
    </form>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      loading: false,
      newPassword: "",
      newPasswordConfirm: "",
    };
  },
  methods: {
    async resetPassword() {
      const { data } = await this.$api.auth.resetPassword(
        this.newPassword,
        this.$route.query.resetPasswordToken
      );
      if (data.message === "reset password success") {
        this.$router.push("/login");
        this.$buefy.toast.open({
          message: "パスワードリセット完了しました",
          type: "is-success",
          duration: 5000,
        });
      } else {
        this.$buefy.toast.open({
          message: "エラーが発生しました",
          type: "is-danger",
          duration: 5000,
        });
      }
    },
  },
};
</script>

<style scoped>
.btnSignin {
  background-color: #f7c220;
  color: #ffffff;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  font-size: 14px;
  font-weight: bold;
}
.btnSignin:hover {
  color: black;
}
.title-login {
  margin-top: 46px;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: #ee7800;
}
</style>
