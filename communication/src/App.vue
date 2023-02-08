<template>
  <div id="app">
    <transition name="slide">
      <router-view />
      <!-- <router-view name="prelogin" /> -->
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.slide-enter-active {
  transition: all .8s ease;
}
.slide-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
.slide-leave, .slide-enter-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
