<template>
  <div class="is-flex is-align-items-center">
    <b-icon
      icon="sort-variant"
      size="is-medium"
      class="mr-5 text-[#56595B]"
    ></b-icon>
    <div class="title mb-0">
      <p class="text-[30px] font-medium text-[#50403B] font-sans">Brand</p>
    </div>
    <div class="ml-auto mr-4">
      <b-dropdown aria-role="list" is-right>
        <template #trigger="{ active }">
          <b-button
            :label="user.email"
            type="is-light"
            :icon-right="active ? 'menu-up' : 'menu-down'"
          />
        </template>
        <b-dropdown-item aria-role="listitem" @click="logout"
          >ログアウト</b-dropdown-item
        >
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
        items: [
        {
          path: "/",
          icon: "",
          name: "Home",
        },
        {
          path: "/brand",
          icon: "",
          name: "Brand",
        },
      ],
    };
  }, component:{
      name(){
        items.forEach(item => {
          $route.path.includes(item.path) ? item.name : 'unactive'
        });
      }
    },
  methods: {
   
    async logout() {
      try {
        await this.$auth.logout("local");
        if (!this.$auth.loggedIn) {
          this.$router.push("/login");
        }
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

<style lang="scss" scoped>
.button {
  background: #f9f8f2;
  border: none;
  font-size: 14px;
  font-weight: 700;
  font-family: Mplus 1p Bold;
  color: #50403b;
}
</style>
