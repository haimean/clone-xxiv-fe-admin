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
          <b-input v-model="data.name" placeholder="name">Name</b-input>
        </b-field>
      </ValidationProvider>
      <b-field label="Image" :class="{ 'has-name': !data.image }">
        <div>
          <div class="file-upload-form">
            <input
              type="file"
              @change="previewImage"
              accept="image/png, image/jpg, image/jpeg"
            />
          </div>
          <div class="image-preview" v-if="data.image">
            <img class="preview" :src="data.image" />
          </div>
        </div>
      </b-field>
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
  props: { title: String, data: Object, button: String },
  methods: {
    previewImage(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        this.data.image = input.file;
        var reader = new FileReader();
        reader.onload = (e) => {
          this.data.image = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    confirmUpdate() {
      this.$buefy.dialog.confirm({
        message: `Do you want  ${this.title}`,
        confirmText: "Ok",
        cancelText: "Cancel",
        type: "is-info",
        onConfirm: () => this.$emit("update", this.data),
      });
    },
  },
};
</script>