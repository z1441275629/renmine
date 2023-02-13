<template>
  <div class="communication-reply">
    <el-dialog :visible.sync="visible" :title="title" center>
      <el-form :model="form" :rules="rules" label-width="80px" ref="addForm">
        <el-form-item label="内容" prop="message">
          <el-input
            v-model="form.message"
            clearable
            placeholder="请输入回复内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-button @click="clickAddMessage" type="primary">回复</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: Boolean,
    title: String,
    parentId: Number,
    replyId: Number
  },
  computed: {
    visible: {
      get() {
        return this.showDialog;
      },
      set(val) {
        this.$emit("update:showDialog", val);
      }
    }
  },
  data() {
    return {
      form: {
        message: ""
      },
      rules: {
        message: [{ required: true, message: "请输入内容" }]
      }
    };
  },
  methods: {
    clickAddMessage() {
      this.$refs.addForm &&
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.addMessage();
          }
        });
    },
    async addMessage() {
      const params = {
        message: this.form.message,
        level: 3, // 回复
        parentId: this.parentId,
        replyId: this.replyId
      };
      const data = await this.$ajax({
        url: this.$api.communication.add,
        method: "post",
        data: params
      });
      this.$emit("update:showDialog", false);
      this.$emit("add-success");
    }
  },
  watch: {
    showDialog(n) {
      n && this.$refs.addForm && this.$refs.addForm.resetFields();
    }
  }
};
</script>

<style scoped></style>
