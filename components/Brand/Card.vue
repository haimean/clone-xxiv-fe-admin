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
      <div class="columns">
        <div class="column">
          <b-field label="Logo" :class="{ 'has-name': !brand.logo }">
            <div>
              <div class="file-upload-form">
                <input
                  type="file"
                  @change="previewLogo"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
              <div class="image-preview" v-if="brand.logo">
                <img class="preview" :src="brand.logo" />
              </div>
            </div>
          </b-field>
        </div>
        <div class="column">
          <b-field
            label="Background"
            :class="{ 'has-name': !brand.background }"
          >
            <div>
              <div class="file-upload-form">
                <input
                  type="file"
                  @change="previewBackground"
                  accept="image/png, image/jpg, image/jpeg"
                />
              </div>
              <div class="image-preview" v-if="brand.background">
                <img class="preview" :src="brand.background" />
              </div>
            </div>
          </b-field>
        </div>
      </div>

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
    previewLogo(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        this.brand.logo = input.file;
        var reader = new FileReader();
        reader.onload = (e) => {
          this.brand.logo = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    previewBackground(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        this.brand.background = input.file;
        var reader = new FileReader();
        reader.onload = (e) => {
          this.brand.background = e.target.result;
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
        onConfirm: () => this.$emit("update", this.brand),
      });
    },
  },
};
</script>