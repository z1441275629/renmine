<template>
  <div class="communication">
    <div class="detail">
      <span class="author">{{ detail.username }}</span>
      <div class="title">{{ detail.title }}</div>
      <div class="content">{{ detail.message }}</div>
      <span class="time">{{ detail.time | dateTime }}</span>
    </div>
    <div class="list">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="toDetail(item)"
      >
        <span class="author">{{ item.username }}</span>
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.message }}</div>
        <span class="time">{{ item.time | dateTime }}</span>
      </div>
    </div>
    <el-input
      type="textarea"
      v-model="message"
      placeholder="请输入要回复的内容"
    ></el-input>
    <el-button @click="addMessage($route.params.id, message)" type="primary"
      >回复</el-button
    >
  </div>
</template>

<script>
import { dateTime } from "@/utils/datetime";

export default {
  data() {
    return {
      list: [],
      detail: {},
      message: ""
    };
  },
  methods: {
    async getMessageList() {
      const data = await this.$ajax({
        url: this.$api.communication.list,
        method: "get",
        params: {
          parentId: this.$route.params.id
        }
      });
      this.list = data.data.list;
      this.detail = data.data.detail;
    },
    async addMessage(parentId, message) {
      if (!message) {
        this.$message.error("请输入回复内容");
      }
      const params = {
        message: this.message,
        parentId
      };
      const data = await this.$ajax({
        url: this.$api.communication.add,
        method: "post",
        data: params
      });
      this.getMessageList();
      this.message = "";
    },
    toDetail(item) {
      this.$router.push({
        name: "communicationDetail",
        params: {
          id: item.id
        }
      });
    }
  },
  created() {
    this.getMessageList();
  },
  filters: {
    dateTime(timeStamp) {
      return timeStamp ? dateTime(+timeStamp) : "";
    }
  },
  watch: {
    "$route.params.id"() {
      this.getMessageList();
    }
  }
};
</script>

<style scoped>
.list {
  padding-left: 40px;
}
</style>
