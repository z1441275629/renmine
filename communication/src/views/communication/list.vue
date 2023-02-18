<template>
  <div class="communication">
    <div class="add-message" @click="clickAddMessage">
      <!-- <el-button type="primary" @click.native="clickAddMessage"
        ></el-button
      > -->
      发表<br />
      言论
    </div>
    <div class="list">
      <!-- <el-tabs v-model="type">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.value"
          :label="item.label"
          :name="item.value"
        ></el-tab-pane>
      </el-tabs> -->
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="toDetail(item)"
      >
        <div class="comment-count">
          <!-- <img src="@/assets/comment.svg" class="comment-icon" alt="" /> -->
          {{ item.commentCount }}
        </div>
        <div class="main-info">
          <div class="title ellipsis">{{ item.title }}</div>
          <div class="content ellipsis3">{{ item.message }}</div>
        </div>
        <div class="basic-info">
          <div class="author-time">
            <div class="author">{{ item.username }}</div>
            <div class="time">{{ item.time | dateTime }}</div>
          </div>
          <avatar :avatar="item.avatar" :size="40" :name="item.username" />
        </div>

        <!-- <div class="reply-list">
          <div
            class="reply-item"
            v-for="reply in item.children"
            :key="reply.id"
          >
            <span class="author">{{ reply.username }}</span>
            <span class="">回复</span>
            <span class="author">{{ reply.replyUser }}</span>
            <span class="time">{{ reply.time | dateTime }}</span>
            <div class="content">{{ reply.message }}</div>
          </div>
        </div> -->
      </div>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="pageSize"
          layout="prev, pager, next, total, sizes, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <add-message
      :showDialog.sync="showAddDialog"
      title="发表言论"
      @add-success="getMessageList"
    ></add-message>

    <reply-message
      :showDialog.sync="showReplyDialog"
      title="回复"
      @add-success="getMessageList"
      :parentId="replyItem.id"
      :replyId="replyItem.id"
    ></reply-message>
  </div>
</template>

<script>
import { dateTime } from "@/utils/datetime";
import AddMessage from "./add.vue";
import ReplyMessage from "./reply.vue";
import Avatar from "@/components/Avatar.vue";

export default {
  components: {
    AddMessage,
    Avatar,
    ReplyMessage
  },
  data() {
    return {
      list: [],
      message: "",
      showAddDialog: false,
      showReplyDialog: false,
      replyItem: {},
      type: "all",
      tabList: [
        { label: "全部", value: "all" },
        { label: "求助", value: "1" }
      ],
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.currentPage = 1;
      this.getMessageList();
    },
    handleCurrentChange(current) {
      this.currentPage = current;
      this.getMessageList();
    },
    clickAddMessage() {
      if (!this.$store.state.token) {
        this.$message.info("登录后发布");
        this.$store.commit("setShowLogin", true);
        // this.$router.push({
        //   name: "login",
        //   query: {
        //     redirect: this.$route.fullPath
        //   }
        // });
        return;
      }
      this.showAddDialog = true;
    },
    reply(item) {
      this.replyItem = item;
      this.showReplyDialog = true;
    },
    toDetail(item) {
      if (!this.$store.state.token) {
        this.$message.info("登录后可查看详情或评论");
        // this.$store.commit(
        //   "setRedirect",
        //   this.$router.resolve({
        //     name: "communicationDetail",
        //     params: {
        //       id: item.id
        //     }
        //   }).route.fullPath
        // );
        // this.$store.commit("setShowLogin", true);
        // this.$router.push({
        //   name: "login",
        //   query: {
        //     redirect: this.$router.resolve({
        //       name: "communicationDetail",
        //       params: {
        //         id: item.id
        //       }
        //     }).href
        //   }
        // });
        // return;
      }
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
        params: {
          type: this.type === "all" ? "" : this.type,
          offset: (this.currentPage - 1) * this.pageSize,
          limit: this.pageSize
        }
      });
      const { list, total } = data.data;
      this.list = list;
      this.total = total;
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
    type(n, o) {
      // console.log(this.type);
      this.getMessageList();
    }
  }
};
</script>

<style scoped>
.communication {
  /* background: #ebebeb; */
  padding: 20px 0;
  min-height: calc(100vh - 80px);
  /* background: #ccc; */
}
.list {
  width: 800px;
  margin: 0 auto;
}
.list .item {
  border-bottom: 1px solid #ccc;
  /* margin-bottom: 20px; */
  padding: 1em 0;
  /* box-shadow: 0 0 3px 3px #fff; */
  /* border-radius: 12px; */
  /* background: #fff; */
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  position: relative;
}
.comment-count {
  position: absolute;
  left: -66px;
  top: 28px;

  width: 50px;
  height: 30px;
  line-height: 26px;
  margin: auto;
  display: block;
  color: #333;
  font-size: 12px;
  text-align: center;
  background: url("http://tb2.bdstatic.com/tb/static-hottopic/img/f_reply_bg_89030dc.png")
    no-repeat;
}
.comment-icon {
  width: 16px;
  margin-right: 0.5em;
}
.main-info {
  flex: 1;
  overflow: hidden;
}
/* .item:not(:last-of-type) {
  border-bottom: 1px solid #ccc;
} */
.basic-info {
  flex-shrink: 0;
  display: flex;
  /* justify-content: flex-end; */
  align-items: center;
  padding-left: 20px;
}
>>> .avatar {
  flex-shrink: 0;
}
.author-time {
  flex: 1;
  padding-left: 1em;
  text-align: right;
  padding-right: 1em;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/* .author {
  margin-right: 1em;
} */
.time {
  color: #666;
  font-size: 12px;
}
.title {
  color: #000;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.4;
  margin: 12px 0;
}
.content {
  color: #666;
  font-size: 14px;
}
.reply-list {
  padding-left: 1em;
}
.reply-item {
  margin: 1em;
}

.add-message {
  position: fixed;
  right: 50px;
  bottom: 100px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.add-message:hover {
  background-color: #eee;
}
.pagination {
  padding: 10px 0;
}
</style>
