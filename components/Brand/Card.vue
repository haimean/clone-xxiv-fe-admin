<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <div>
      <h1 class="title is-3">{{ title }}</h1>
      <hr />
      <ValidationProvider name="name" v-slot="{ errors }" slim rules="required">
        <b-field
          :type="{ 'is-danger': errors.length }"
          :message="errors[0]"
          label="Name"
        >
          <b-input v-model="brand.name" placeholder="name">Name</b-input>
        </b-field>
      </ValidationProvider>
      <b-field label="Description">
        <b-input
          placeholder="description"
          v-model="brand.description"
        ></b-input>
      </b-field>
      <b-field label="Image">
        <b-input v-model="brand.image_uuid"></b-input
      ></b-field>
      <b-button
        class="is-info"
        size="is-medium"
        @click="handleSubmit(confirmUpdate)"
      >
        {{ button }}
      </b-button>
    </div>
  </ValidationObserver>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: { title: String, brand: Object, button: String },
  methods: {
    confirmUpdate() {
      this.$buefy.dialog.confirm({
        message: "Do you want update brand",
        confirmText: "Ok",
        cancelText: "Cancel",
        type: "is-info",
        onConfirm: () => this.$emit("update", this.brand),
      });
    },
  },
};
</script>