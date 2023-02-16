<template>
  <div class="communication-detail">
    <div class="main">
      <div class="detail">
        <div class="basic-info">
          <avatar :avatar="detail.avatar" :size="40" :name="detail.username" />
          <div class="author-time">
            <div class="author">{{ detail.username }}</div>
            <div class="time">{{ detail.time | dateTime }}</div>
          </div>
        </div>
        <div class="pl40">
          <div class="title">{{ detail.title }}</div>
          <div class="content">{{ detail.message }}</div>
        </div>
      </div>

      <div class="comment-list">
        <div
          class="comment-item"
          v-for="(comment, index) in list"
          :key="comment.id"
        >
          <div class="basic-info">
            <avatar
              :avatar="comment.avatar"
              :size="40"
              :name="comment.username"
            />
            <div class="author-time">
              <div class="author">{{ comment.username }}</div>
              <div class="time">
                <span class="">第{{ index + 1 }}楼</span>
                {{ comment.time | dateTime }}
              </div>
            </div>
            <div class="buttons">
              <el-button type="text" @click="clickReply(comment)"
                >回复</el-button
              >
            </div>
          </div>
          <div class="pl40">
            <div class="content">{{ comment.message }}</div>
          </div>

          <div class="reply-list" v-if="comment.children.length">
            <div
              class="reply-item"
              v-for="reply in comment.children"
              :key="reply.id"
              @click="clickReplyUser(reply, comment.id)"
            >
              <span class="author">{{ reply.username }}</span>
              <template v-if="reply.replyUser">
                <span class="">回复</span>
                <span class="author">{{ reply.replyUser }}</span>
              </template>
              <span>: </span>
              <span class="content">{{ reply.message }}</span>
            </div>
          </div>

          <div class="line"></div>
        </div>
      </div>

      <div class="my-comment">
        <el-input
          type="textarea"
          :rows="5"
          v-model="message"
          placeholder="请输入评论内容"
        ></el-input>
        <el-button
          class="comment-button"
          @click="addMessage($route.params.id, message)"
          type="primary"
          >评论</el-button
        >
      </div>
    </div>
    <reply-message
      :showDialog.sync="showReplyDialog"
      title="回复"
      @add-success="getMessageList"
      :parentId="replyParentId"
      :replyId="replyId"
    ></reply-message>
  </div>
</template>

<script>
import { dateTime } from "@/utils/datetime";
import Avatar from "@/components/Avatar.vue";
import ReplyMessage from "./reply.vue";

export default {
  data() {
    return {
      list: [],
      showReplyDialog: false,
      detail: {},
      message: "",
      replyParentId: undefined,
      replyId: undefined
    };
  },
  components: {
    Avatar,
    ReplyMessage
  },
  methods: {
    clickReply(item) {
      this.replyParentId = item.id;
      this.replyId = null;
      this.showReplyDialog = true;
    },
    clickReplyUser(replyItem, parentId) {
      this.replyParentId = parentId;
      this.replyId = replyItem.id;
      this.showReplyDialog = true;
    },
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
        parentId,
        level: 2 // 评论
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
.communication-detail {
  /* background: #ebebeb; */
  padding: 20px 0;
}
.main {
  width: 800px;
  margin: 0 auto;
  /* background-color: #fff; */
  padding: 20px;
}
.detail {
  padding: 20px 0;
}
.detail .content {
  padding: 0;
}
.pl40 {
  padding-left: calc(40px + 1em);
}
.line {
  border-bottom: 1px solid #ebebeb;
  margin-left: calc(40px + 1em);
}

.comment-list {
}

.comment-item {
  margin: 1em 0;
}
.reply-list {
  background: #ebebeb;
  margin: 0 0 20px 50px;
  padding: 1em;
  border-radius: 12px;
}
.reply-list .item {
  margin-bottom: 20px;
  padding: 1em;
  box-shadow: 0 0 3px 3px #fff;
  border-radius: 12px;
}
.reply-list .author {
  color: #666;
}
.basic-info {
  display: flex;
  align-items: center;
}
>>> .avatar {
  flex-shrink: 0;
}
.author-time {
  flex: 1;
  padding-left: 1em;
}
.author {
  /* margin-right: 1em; */
}
.time {
  color: #666;
}
.title {
  color: #000;
  font-weight: bold;
  line-height: 1.8;
  margin: 12px 0;
}
.content {
  color: #000;
  padding: 1em 0;
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

.my-comment {
  padding-left: calc(40px + 1em);
}
.comment-button {
  margin-top: 1em;
}
</style>
