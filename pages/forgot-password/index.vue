<template>
  <section class="flex is-justify-content-center">
    <forgot-password />
  </section>
</template>
<script>
import ForgotPassword from '~/components/ForgotPassword.vue';
export default {
  auth:false,
  components: { ForgotPassword },
  layout: "login",
};
</script>