<template>
  <div class="layout">
    <my-header></my-header>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
// import Header from "../components/Header.vue";
import Header from "../components/Header1.vue";
export default {
  components: {
    MyHeader: Header
  }
};
</script>

<style scoped>
.content {
  min-height: calc(100vh - 80px);
}
</style>
