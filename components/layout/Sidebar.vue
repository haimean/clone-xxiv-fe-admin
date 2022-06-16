<template>

  <aside
    class="h-screen top-0 p-0 sticky bg-[#ffffff]"
    style="box-shadow: inset -1px 0px 0px #f0e6d7; width: 256px"
  >
    <img
      class="flex is-justify-content-center"
      src="https://xxivstore.com/wp-content/themes/yootheme/cache/XXIV-Logo-Web-da8bec8c.webp"
      style="height: 100px"
    />
    <div class="mt-5 ml-4">
      <nuxt-link :to="item.path" v-for="(item, index) in items" :key="index">
        <div
          :class="$route.path === item.path ? 'active' : 'unactive'"
          style="width: 220px"
          class="
            is-flex is-flex-direction-row is-alisgn-items-center
            mb-4
            px-3
            h-10
          "
        >
          <b-icon :icon="item.icon" size="is-small"></b-icon>
          <span style="width: 155px">{{ item.name }}</span>
          <b-icon icon="chevron-right" size="is-small"></b-icon>
        </div>
      </nuxt-link>
      <p class="mt-6 text-sm text-[#ACA299]">
        <span>© 2022 XXIV</span>
      </p>
    </div>
  </aside>


</template>

<script>
export default {
  data() {
    return {
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
  },
};
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
  font-weight: bold;
  color: #50403b;
}
.unactive {
  color: #aca299;
  font-weight: bold;
}
.active {
  background: #f5da93;
  border-radius: 12px;
}
</style>
