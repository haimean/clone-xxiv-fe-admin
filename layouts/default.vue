<template>
  <div class="flex">
    <LayoutSidebar />
    <div class="w-10/12">
      <div class="container">
        <div class="h-screen ml-6 mt-9">
          <LayoutNavbar />
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
    return {};
  },
};
</script>
