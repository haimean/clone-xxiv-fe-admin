<template>
  <div class="flex">
    <LayoutSidebar :items="items" />
    <div class="w-10/12">
      <div class="container">
        <div class="h-screen ml-6 mt-9">
          <LayoutNavbar :items="items" />
          <div class="mt-9">
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      items: [
        {
          path: "/",

          name: "Home",
        },
        {
          path: "/brand",
          name: "Brand",
        },
        {
          path: "/fragrance",
          name: "Fragrance",
        },
        {
          path: "/capacity",
          name: "Capacity",
        },
        {
          path: "/product",
          name: "Product",
        },
      ],
    };
  },
};
</script>
