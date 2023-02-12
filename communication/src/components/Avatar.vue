<template>
  <div
    class="avatar"
    :style="{
      backgroundColor: avatar,
      width: `${size}px`,
      height: `${size}px`
    }"
  >
    {{ name && name.slice(-2) }}
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      type: String,
      required: true
    },
    name: String,
    size: {
      type: Number,
      default: 30
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
</style>
