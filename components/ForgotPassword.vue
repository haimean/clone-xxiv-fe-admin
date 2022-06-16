<template>
  <div class="h-screen h-screen items-center flex">
    <form
      class="mx-auto h-[305px] w-[380px] border-[0.5px] border-[#E4DDD2] rounded-[10px]"
    >
      <ValidationObserver v-slot="{ invalid }">
        <div class="w-[316px] ml-[31px]">
          <div style="text-align: center">
            <p class="title-login">Crowdchemの管理システム</p>
          </div>
          <section>
            <ValidationProvider
              name="メール"
              v-slot="{ errors }"
              rules="required|email"
            >
              <b-field
                class="mt-[50px]"
                :type="{ 'is-danger': errors.length }"
                :message="errors[0]"
              >
                <b-input
                  v-model="email"
                  type="email"
                  placeholder="メール"
                ></b-input>
              </b-field>
            </ValidationProvider>
          </section>
          <b-button
            class="mt-5 pr-5 pl-5 mb-3 is-flex btnSignin"
            type="submit"
            size="is-medium"
            :disabled="invalid"
            expanded
            @click="setNewPassword"
          >
            パスワードリセット
          </b-button>
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
  auth: false,
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async setNewPassword() {
      const { data } = await this.$api.auth.forgotPassword(this.email);
      if (data.message === "email has been sent") {
        this.$buefy.toast.open({
          message:
            "パスワード再設定のメールを送信しました。メールを確認してください！",
          type: "is-success",
          duration: 3000,
        });
      } else {
        this.$buefy.toast.open({
          message: "エラーが発生しました",
          type: "is-danger",
          duration: 3000,
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
  margin-top: 26px;
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
