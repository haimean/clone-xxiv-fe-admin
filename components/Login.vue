<template>
  <ValidationObserver
    ref="observer"
    class="flex is-justify-content-center"
    v-slot="{ handleSubmit }"
  >
    <section class="card-login">
      <div style="text-align: center">
        <p class="title-login">XXIV Admin</p>
      </div>
      <section style="padding: 32px; margin-top: 16px">
        <ValidationProvider
          name="email"
          v-slot="{ errors }"
          slim
          rules="required|email"
        >
          <b-field :type="{ 'is-danger': errors.length }" :message="errors[0]">
            <b-input v-model="email" type="email" placeholder="Email"></b-input>
          </b-field>
        </ValidationProvider>
        <ValidationProvider
          name="password"
          v-slot="{ errors }"
          slim
          rules="required"
          style="margin-bottom: 5px"
        >
          <b-field :type="{ 'is-danger': errors.length }" :message="errors[0]">
            <b-input
              type="password"
              v-model="password"
              placeholder="Password"
            ></b-input>
          </b-field>
        </ValidationProvider>
        <div style="text-align: end">
          <nuxt-link to="/forgot-password" class="signup"
            >Forgot password
          </nuxt-link>
        </div>
        <b-button
          class="mt-5 pr-5 pl-5 mb-3 is-flex login-btn"
          type="submit"
          size="is-medium"
          @click="handleSubmit(login)"
          expanded
        >
          Login
        </b-button>
      </section>
    </section>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      email: "admin@gmail.com",
      password: "123456",
    };
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        if (this.$auth.loggedIn) {
          this.$router.push("/");
          this.$buefy.toast.open({
            message: "Login success",
            type: "is-success",
            duration: 5000,
          });
        }
      } catch (e) {
        this.$buefy.toast.open({
          message: "Login fail",
          type: "is-danger",
          duration: 5000,
        });
      }
    },
  },
};
</script>
<style lang="scss">
.card-login {
  position: absolute;
  width: 380px;
  height: auto;
  top: 312px;
  background: #ffffff;
  border: 1px solid #e4ddd2;
  box-sizing: border-box;
  border-radius: 10px;
}
.title-login {
  margin-top: 46px;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;

  color: #ee7800;
}
.login-btn {
  background-color: #f7c220;
  color: #ffffff;
  padding: 0 5rem;
  border-radius: 3px;
  span {
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
  }
}
.signup {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;
  color: #5e5e5e;
}
</style>