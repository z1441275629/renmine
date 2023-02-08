<template>
    <div class="">
        <el-dialog :visible.sync="showDialog" :title="title" center>
            <el-form :model="form" ref="form" label-position="right" label-width="100px"> 
                <!-- <el-form-item label="学生" prop="user_id">
                    <el-select v-model="form.user_id" clearable>
                        <el-option v-for="item in studentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="姓名" prop="username">
                    <el-input clearable v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input clearable v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input clearable v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input clearable v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="date">
                    <el-date-picker v-model="form.date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="阶段" prop="stage">
                    <el-select v-model="form.stage" clearable>
                        <el-option v-for="item in stageList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级" prop="grade">
                    <!-- <el-input clearable v-model="form.grade"></el-input> -->
                    <el-select v-model="form.grade" clearable>
                        <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="classId">
                    <el-input clearable v-model="form.classId"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <!-- <el-input clearable v-model="form.role"></el-input> -->
                    <el-select v-model="form.role" clearable>
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button type="primary" @click.native="clickConfirm">确定</el-button>
                <el-button type="primary" @click.native="clickCancel">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            required: true,
            type: Boolean
        },
        data: {
            type: Object,
            default: () => ({})
        },
        isAdd: {
            type: Boolean
        },
        stageList: {
            type: Array,
            default: () => []
        },
        gradeList: {
            type: Array,
            default: () => []
        }
    },
    computed:{
       showDialog:{
            set(val){
               this.$emit("input", val);
            },
            get(){
                return this.value;
            }
       },
       title(){
           return this.isAdd ? "新增" : "修改";
       }
    },
    data(){
        return {
            form: {
                id: "",
                date: "",
                username: "",
                classId: "",
                stage: "",
                grade: "",
                phone: "",
                email: "",
                password: "",
            },
            originForm: "{}",
            studentList: [],
            // stageList: [],
            roleList: [],
        }
    },
    methods: {
        clickConfirm(){
            console.log(this.form);
            if(this.isAdd){
                this.add(this.form);
            }else{
                this.edit(this.form);
            }
        },
        add(params){
            this.$ajax({
                url: this.$api.user.add,
                method: "post",
                data: params
            }).then(res => {
                this.$message.success("添加成功");
            }).catch(console.log);
        },
        edit(params){
            this.$ajax({
                url: this.$api.user.edit,
                method: "post",
                data: params
            }).then(res => {
                this.$message.success("编辑成功");
            }).catch(console.log);
        },
        getRoleList(){
            this.$ajax({
                url: this.$api.common.roleList,
                method: "get",
                params: {}
            }).then(res => {
                this.roleList = res.data || [];
            }).catch(console.log);
        },
        clickCancel(){
            this.showDialog = false;
        },
        getStudentList(){
            this.$ajax({
                url: this.$api.common.studentList,
                method: "get",
                params: {}
            }).then(res => {
                this.studentList = res.data || [];
            }).catch(console.log);
        },
    },
    watch: {
        value(n, o){
            if(n){
                this.form = Object.assign({}, this.form, this.data);
                this.$nextTick(() => {
                    this.$refs.form && this.$refs.form.clearValidate();
                });
            }else{
                this.form = JSON.parse(this.originForm);
            }
        }
    },
    created() {
        this.originForm = JSON.stringify(this.form);
        // this.getStudentList();
        this.getRoleList();
    }
}
</script>

<style scoped>

</style>