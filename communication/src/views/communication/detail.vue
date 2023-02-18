<template>
  <div class="communication-detail">
    <div class="sticky">
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
        <a class="to-list-btn" href="" @click.prevent="toList"
          >&lt;&lt;返回列表</a
        >
      </div>
      <div class="title">
        <span class="message-title">{{ detail.title }}</span>
        <el-button type="text" @click.native="toAddReply">回复</el-button>
      </div>
    </div>
    <div class="main">
      <div class="detail">
        <div class="owner comment-item">
          <div class="basic-info">
            <avatar
              class="avatar"
              :avatar="detail.avatar"
              :size="80"
              :name="detail.username"
            />
            <div class="author">{{ detail.username }}</div>
          </div>
          <div class="communicate">
            <div class="content">{{ detail.message }}</div>
            <div class="communicate-bottom">
              <div class="order">楼主</div>
              <div class="time">{{ detail.time | dateTime }}</div>
            </div>
          </div>
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
              class="avatar"
              :avatar="comment.avatar"
              :size="80"
              :name="comment.username"
            />
            <div class="author">{{ comment.username }}</div>
          </div>
          <div class="communicate">
            <div class="content">{{ comment.message }}</div>
            <div class="communicate-bottom">
              <div class="order">
                第{{ index + 1 + pageSize * (currentPage - 1) }}楼
              </div>
              <div class="time">{{ comment.time | dateTime }}</div>
              <el-button type="text" size="mini" @click="clickReply(comment)"
                >回复</el-button
              >
            </div>

            <div class="reply-list" v-if="comment.children.length">
              <div
                class="reply-item"
                v-for="reply in comment.children"
                :key="reply.id"
              >
                <avatar
                  class="reply-avatar"
                  :avatar="reply.avatar"
                  :size="30"
                  :name="reply.username"
                ></avatar>
                <div class="reply-infos">
                  <span class="author">{{ reply.username }}</span>
                  <template v-if="reply.replyUser">
                    <span class="">回复</span>
                    <span class="author">{{ reply.replyUser }}</span>
                  </template>
                  <span>: </span>
                  <span class="reply-content">{{ reply.message }}</span>
                  <div class="communicate-bottom">
                    <div class="time">{{ reply.time | dateTime }}</div>
                    <el-button
                      type="text"
                      size="mini"
                      @click.native="clickReplyUser(reply, comment.id)"
                      >回复</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-comment">
        <el-input
          ref="textarea"
          type="textarea"
          :rows="5"
          v-model="message"
          placeholder="请输入评论内容"
        ></el-input>
        <el-button
          class="comment-button"
          @click="addMessage($route.params.id, message)"
          type="primary"
          :loading="commentLoading"
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
      replyId: undefined,
      currentPage: 1,
      pageSize: 10,
      total: 1,
      commentLoading: false
    };
  },
  components: {
    Avatar,
    ReplyMessage
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
    toAddReply() {
      this.$refs.textarea.$el.scrollIntoView();
      window.scrollTo(0, document.scrollTop + 80 + 40 + 50 + "px");
      this.$refs.textarea.focus();
    },
    toList() {
      this.$router.push({
        name: "communication"
      });
    },
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
          parentId: this.$route.params.id,
          offset: (this.currentPage - 1) * this.pageSize,
          limit: this.pageSize
        }
      });
      const { list, detail, total } = data.data;
      this.list = list;
      this.detail = detail;
      this.total = total;
    },
    async addMessage(parentId, message) {
      if (!message) {
        this.$message.error("请输入回复内容");
      }
      try {
        this.commentLoading = true;
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
      } finally {
        this.commentLoading = false;
      }
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
.sticky {
  position: sticky;
  top: 80px;
  background: #fff;
  margin: 20px 0 0;
  width: 800px;
  margin: 0 auto;
}
.communication-detail {
  /* background: #ebebeb; */
  padding: 20px 0;
}
.main {
  width: 800px;
  margin: 0 auto;
  /* background-color: #fff; */
}
/* .detail {
  padding: 20px 0 0;
} */
.communicate {
  flex: 1;
  padding: 20px;
}
.detail .content {
  padding: 0;
}

.comment-list {
}

.comment-item {
  display: flex;

  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e1e4e6;
}
.reply-list {
  background: #ebebeb;
  /* margin: 0 0 20px 50px; */
  padding: 6px 1em;
  /* border-radius: 12px; */
}
.reply-list .item {
  padding: 1em;
  box-shadow: 0 0 3px 3px #fff;
  border-radius: 12px;
  /* border-bottom: ; */
}
.reply-list .author {
  color: #666;
}
.basic-info {
  flex-shrink: 0;
  width: 100px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafbfc;
}
.avatar {
  flex-shrink: 0;
  font-size: 36px;
  margin-bottom: 20px;
}
.communicate-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #999;
  font-size: 12px;
}
.order {
  font-size: 12px;
  margin-right: 10px;
}
.time {
  margin-right: 20px;
}
.title {
  color: #000;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* position: sticky;
  top: 80px;
  background-color: #fff; */
  padding: 0 20px;
  border-left: 1px solid #e5e5e5;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e1e4e6;
}
.content {
  flex: 1;
  color: #000;
  padding: 1em 0;
  min-height: 200px;
}
.reply-list {
  /* padding-left: 1em; */
}
.reply-item {
  /* margin: 1em; */
  display: flex;
  border-bottom: 1px solid #e1e4e6;
  padding-top: 6px;
}
.reply-item:last-of-type {
  border-bottom: none;
}
.reply-avatar {
  font-size: 14px;
  flex-shrink: 0;
  margin-right: 15px;
}
.reply-infos {
  flex: 1;
}
.reply-content {
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
  margin-top: 1em;
}
.comment-button {
  margin-top: 1em;
}
.pagination {
  padding: 10px 20px 10px 0;
  border: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
