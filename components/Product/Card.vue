<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <div>
      <h1 class="title is-3">{{ title }}</h1>
      <hr />
      <div>
        <div class="columns">
          <div class="column is-one-third">
            <ValidationProvider
              name="Title"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field
                :type="{ 'is-danger': errors.length }"
                :message="errors[0]"
                label="Title"
              >
                <b-input v-model="data.title" placeholder="title">Name</b-input>
              </b-field>
            </ValidationProvider>
          </div>
          <div class="column is-one-third">
            <ValidationProvider
              name="Brand"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field
                label="Brand"
                :type="{ 'is-danger': errors.length }"
                :message="errors[0]"
              >
                <b-select
                  placeholder="Select a brand"
                  v-model="data.brands_id"
                  expanded
                >
                  <option
                    v-for="option in brands"
                    :value="option.id"
                    :key="option.id"
                  >
                    {{ option.name }}
                  </option>
                </b-select>
              </b-field>
            </ValidationProvider>
          </div>
          <div class="column is-one-third">
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
          </div>
        </div>
        <div class="columns">
          <div class="column is-two-thirds">
            <ValidationProvider
              name="Content"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field
                label="Content"
                :type="{ 'is-danger': errors.length }"
                :message="errors[0]"
              >
                <b-input placeholder="content" v-model="data.content"></b-input>
              </b-field>
            </ValidationProvider>
          </div>
          <div class="column is-one-third">
            <ValidationProvider
              name="Content"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field
                label="Sex"
                :type="{ 'is-danger': errors.length }"
                :message="errors[0]"
              >
                <b-select v-model="data.sex" placeholder="Sex" expanded>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Oversex">Oversex</option>
                </b-select>
              </b-field>
            </ValidationProvider>
          </div>
        </div>
        <div class="columns">
          <div class="column is-full">
            <ValidationProvider
              name="Description"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field
                label="Description"
                :type="{ 'is-danger': errors.length }"
                :message="errors[0]"
              >
                <b-input
                  placeholder="description"
                  type="textarea"
                  v-model="data.description"
                ></b-input>
              </b-field>
            </ValidationProvider>
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-third">
            <ValidationProvider
              name="Published"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field
                label="Published"
                :type="{ 'is-danger': errors.length }"
                :message="errors[0]"
              >
                <b-input
                  placeholder="Published"
                  type="number"
                  :min="0"
                  :max="yearNow"
                  v-model="data.published_at"
                ></b-input>
              </b-field>
            </ValidationProvider>
          </div>
          <div class="column is-one-third">
            <b-field label="Age">
              <b-input
                placeholder="Age"
                type="number"
                v-model="data.age"
                :min="0"
              ></b-input>
            </b-field>
          </div>
          <div class="column is-one-third">
            <b-field label="Time  Smell">
              <b-input
                placeholder="Time  Smell"
                type="number"
                :min="0"
                v-model="data.time_smell"
                :max="24"
              ></b-input>
            </b-field>
          </div>
        </div>
        <div class="columns">
          <div class="column is-half">
            <ValidationProvider
              name="Spring"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field label="Spring" :message="errors">
                <b-slider v-model="data.spring" :max="100"> </b-slider>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              name="Summer"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field label="Summer" :message="errors">
                <b-slider v-model="data.summer" :max="100"> </b-slider>
              </b-field>
            </ValidationProvider>
            <ValidationProvider
              name="Fall"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field label="Fall" :message="errors">
                <b-slider v-model="data.fall" :max="100"> </b-slider>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              name="Winter"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field label="Winter" :message="errors">
                <b-slider v-model="data.winter" :max="100"> </b-slider>
              </b-field>
            </ValidationProvider>
          </div>
          <div class="column is-half">
            <ValidationProvider
              name="Day"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field label="Day" :message="errors">
                <b-slider v-model="data.day" :max="100"> </b-slider>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              name="Night"
              v-slot="{ errors }"
              slim
              rules="required"
            >
              <b-field label="Night" :message="errors">
                <b-slider v-model="data.night" :max="100"> </b-slider>
              </b-field>
            </ValidationProvider>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-full">
          <ValidationProvider
            name="Main Scent"
            v-slot="{ errors }"
            slim
            rules="required"
          >
            <b-field
              label="Main Scent"
              :type="{ 'is-danger': errors.length }"
              :message="errors[0]"
            >
              <b-taginput
                v-model="data.main_scent"
                :data="filteredTags"
                autocomplete
                :open-on-focus="true"
                :isSelectOnly="false"
                field="name"
                icon="label"
                ref="taginput"
                rounded
                placeholder="Add a fragrance"
                @typing="getFilteredTags"
              >
                <template slot-scope="props">
                  <strong>{{ props.option.name }}</strong>
                </template>
                <template #empty> There are no fragrances </template>
              </b-taginput>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            name="Top Scent"
            v-slot="{ errors }"
            slim
            rules="required"
          >
            <b-field
              label="Top Scent"
              :type="{ 'is-danger': errors.length }"
              :message="errors[0]"
            >
              <b-taginput
                v-model="data.top_scent"
                :data="filteredTags"
                autocomplete
                :open-on-focus="true"
                :isSelectOnly="false"
                field="name"
                icon="label"
                ref="taginput"
                rounded
                placeholder="Add a fragrance"
                @typing="getFilteredTags"
              >
                <template slot-scope="props">
                  <strong>{{ props.option.name }}</strong>
                </template>
                <template #empty> There are no fragrances </template>
              </b-taginput>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            name="Middle Scent"
            v-slot="{ errors }"
            slim
            rules="required"
          >
            <b-field
              label="Middle Scent"
              :type="{ 'is-danger': errors.length }"
              :message="errors[0]"
            >
              <b-taginput
                v-model="data.middle_scent"
                :data="filteredTags"
                autocomplete
                :open-on-focus="true"
                :isSelectOnly="false"
                field="name"
                icon="label"
                ref="taginput"
                rounded
                placeholder="Add a fragrance"
                @typing="getFilteredTags"
              >
                <template slot-scope="props">
                  <strong>{{ props.option.name }}</strong>
                </template>
                <template #empty> There are no fragrances </template>
              </b-taginput>
            </b-field>
          </ValidationProvider>
          <ValidationProvider
            name="Last Scent"
            v-slot="{ errors }"
            slim
            rules="required"
          >
            <b-field
              label="Last Scent"
              :type="{ 'is-danger': errors.length }"
              :message="errors[0]"
            >
              <b-taginput
                v-model="data.last_scent"
                :data="filteredTags"
                autocomplete
                :open-on-focus="true"
                :isSelectOnly="false"
                field="name"
                icon="label"
                ref="taginput"
                rounded
                placeholder="Add a fragrance"
                @typing="getFilteredTags"
              >
                <template slot-scope="props">
                  <strong>{{ props.option.name }}</strong>
                </template>
                <template #empty> There are no fragrances </template>
              </b-taginput>
            </b-field>
          </ValidationProvider>
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-quarter">
          <b-field label="Capacity">
            <b-select
              placeholder="Select a name"
              v-model="capacityQuantity.capacity"
              @input="changeCapacity"
            >
              <option
                v-for="option in capacities"
                :value="option"
                :key="option.id"
              >
                {{ option.name }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-one-quarter">
          <b-field label="Quantity">
            <b-numberinput
              v-model="capacityQuantity.number"
              :min="0"
            ></b-numberinput>
          </b-field>
        </div>
        <div class="column is-one-quarter">
          <b-field label="Price">
            <b-input
              placeholder="Price"
              type="number"
              v-model="capacityQuantity.price"
            />
          </b-field>
        </div>
        <div class="column is-one-quarter">
          <b-button
            label="Update Capacity"
            type="is-dark"
            @click="updateCapacity"
          />
        </div>
      </div>
      <div class="columns">
        <div class="column is-full">
          <b-table :data="data.capacities" :columns="columns"></b-table>
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
  props: {
    title: String,
    data: Object,
    brands: Array,
    fragrances: Array,
    capacities: Array,
    filteredTags: Array,
    button: String,
  },
  data() {
    var yearNow = Date.yearNow;
    return {
      yearNow,
      columns: [
        {
          field: "name",
          label: "Capacity",
        },
        {
          field: "pivot.quantity",
          label: "Quantity",
          numeric: true,
          centered: true,
        },
        {
          field: "pivot.price",
          numeric: true,
          label: "Price",
        },
      ],
      capacityQuantity: {
        number: null,
        price: null,
        capcacity: null,
      },
    };
  },
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
    changeCapacity() {
      this.capacityQuantity.price = 0;
      this.capacityQuantity.number = 0;
      if (this.data.capacities) {
        this.data.capacities.forEach((element) => {
          if (element.id === this.capacityQuantity.capacity.id) {
            this.capacityQuantity.price = element.pivot.price;
            this.capacityQuantity.number = element.pivot.quantity;
          }
        });
      }
      return;
    },
    updateCapacity() {
      var haveId = false;
      if (this.data.capacities) {
        this.data.capacities.forEach((element) => {
          if (element.id === this.capacityQuantity.capacity.id) {
            haveId = true;
            element.name = this.capacityQuantity.capacity.name;
            element.pivot.price = this.capacityQuantity.price;
            element.pivot.quantity = this.capacityQuantity.number;
          }
        });
      }
      if (!haveId) {
        haveId = false;
        var data = {
          id: this.capacityQuantity.capacity.id,
          name: this.capacityQuantity.capacity.name,
        };
        data.pivot = {
          price: this.capacityQuantity.price,
          quantity: this.capacityQuantity.number,
        };
        this.data.capacities.push(data);
      }
      return this.$buefy.toast.open({
        message: `Update  capacity success`,
        type: "is-success",
        duration: 5000,
      });
      return;
    },
    getFilteredTags(text) {
      this.filteredTags = this.fragrances.filter((option) => {
        return (
          option.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
        );
      });
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