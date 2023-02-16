<template>
  <div class="communication-add">
    <el-dialog :visible.sync="visible" :title="title" center>
      <el-form :model="form" :rules="rules" label-width="80px" ref="addForm">
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="form.title"
            clearable
            placeholder="请输入简短的标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="message">
          <el-input
            v-model="form.message"
            clearable
            placeholder="请输入要发表的内容"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型" prop="type">
          <el-select
            :style="{ width: '100%' }"
            v-model="form.type"
            clearable
            placeholder="请选择类型"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="" prop="">
          <el-button @click="clickAddMessage" type="primary">发布</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: Boolean,
    title: String
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
        title: "",
        message: ""
      },
      rules: {
        title: [{ required: true, message: "请输入标题" }],
        message: [{ required: true, message: "请输入内容" }]
      },
      typeList: [{ label: "求助", value: 1 }]
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
        title: this.form.title,
        type: this.form.type,
        level: 1 // 发表
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
