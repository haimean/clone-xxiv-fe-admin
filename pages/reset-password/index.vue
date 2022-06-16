<template>
  <section class="flex is-justify-content-center">
    <ResetPassword />
  </section>
</template>
<script>
import ResetPassword from "~/components/ResetPassword.vue";
export default {
  components: { ResetPassword },
  auth: false,
  layout: "login",
};
</script>
