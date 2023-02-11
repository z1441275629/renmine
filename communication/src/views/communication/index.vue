<template>
  <div class="communication">
    <el-input v-model="message" placeholder="请输入要发表的内容"></el-input>
    <el-button @click="addMessage" type="primary">发布</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      message: ""
    };
  },
  methods: {
    async getMessageList() {
      const data = await this.$ajax({
        url: this.$api.communication.list,
        method: "get",
        params: {}
      });
      this.list = data;
      console.log(this.list);
    },
    async addMessage() {
      const params = {
        // userId: 1,
        message: this.message
      };
      const data = await this.$ajax({
        url: this.$api.communication.add,
        method: "post",
        data: params
      });
      // this.list = data;
      console.log(this.list);
    }
  },
  created() {
    this.getMessageList();
  }
};
</script>

<style scoped></style>
