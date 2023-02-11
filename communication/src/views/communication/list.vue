<template>
  <div class="communication">
    <div class="add">
      <el-button type="primary" @click.native="clickAddMessage"
        >发表言论</el-button
      >
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

    <add-message
      :showDialog.sync="showAddDialog"
      title="发表言论"
      @add-success="getMessageList"
    ></add-message>
  </div>
</template>

<script>
import { dateTime } from "@/utils/datetime";
import AddMessage from "./add.vue";

export default {
  components: {
    AddMessage
  },
  data() {
    return {
      list: [],
      message: "",
      showAddDialog: false
    };
  },
  methods: {
    clickAddMessage() {
      this.showAddDialog = true;
    },
    toDetail(item) {
      this.$router.push({
        name: "communicationDetail",
        params: {
          id: item.id
        }
      });
    },
    async getMessageList() {
      const data = await this.$ajax({
        url: this.$api.communication.list,
        method: "get",
        params: {}
      });
      this.list = data.data.list;
    }
  },
  created() {
    this.getMessageList();
  },
  filters: {
    dateTime(timeStamp) {
      return timeStamp ? dateTime(+timeStamp) : "";
    }
  }
};
</script>

<style scoped></style>
