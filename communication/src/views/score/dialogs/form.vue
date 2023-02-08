<template>
    <div class="">
        <el-dialog :visible.sync="showDialog" :title="title" center>
            <el-form :model="form" ref="form" label-position="right" label-width="100px"> 
                <el-form-item label="学生" prop="user_id">
                    <el-select v-model="form.user_id" clearable>
                        <el-option v-for="item in studentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="考试日期" prop="date">
                    <el-date-picker v-model="form.date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="语文" prop="chinese">
                    <el-input clearable v-model="form.chinese"></el-input>
                </el-form-item>
                <el-form-item label="数学" prop="math">
                    <el-input clearable v-model="form.math"></el-input>
                </el-form-item>
                <el-form-item label="英语" prop="english">
                    <el-input clearable v-model="form.english"></el-input>
                </el-form-item>
                <el-form-item label="物理" prop="physics">
                    <el-input clearable v-model="form.physics"></el-input>
                </el-form-item>
                <el-form-item label="化学" prop="chemistry">
                    <el-input clearable v-model="form.chemistry"></el-input>
                </el-form-item>
                <el-form-item label="政治" prop="politics">
                    <el-input clearable v-model="form.politics"></el-input>
                </el-form-item>
                <el-form-item label="历史" prop="history">
                    <el-input clearable v-model="form.history"></el-input>
                </el-form-item>
                <el-form-item label="地理" prop="geograph">
                    <el-input clearable v-model="form.geograph"></el-input>
                </el-form-item>
                <el-form-item label="生物" prop="biology">
                    <el-input clearable v-model="form.biology"></el-input>
                </el-form-item>
                <el-form-item label="自然" prop="nature">
                    <el-input clearable v-model="form.nature"></el-input>
                </el-form-item>
                <el-form-item label="科学" prop="science">
                    <el-input clearable v-model="form.science"></el-input>
                </el-form-item>
                <el-form-item label="音乐" prop="music">
                    <el-input clearable v-model="form.music"></el-input>
                </el-form-item>
                <el-form-item label="美术" prop="art">
                    <el-input clearable v-model="form.art"></el-input>
                </el-form-item>
                <el-form-item label="体育" prop="pe">
                    <el-input clearable v-model="form.pe"></el-input>
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
           return this.isAdd ? "录入成绩" : "修改成绩";
       }
    },
    data(){
        return {
            form: {
                user_id: "",
                date: "",
                chinese: "",
                math: "",
                english: "",
                physics: "",
                chemistry: "",
                geograph: "",
                biology: "",
                nature: "",
                science: "",
                art: "",
                music: "",
                pe: "",
                politics: "",
                history: "",
            },
            originForm: "{}",
            studentList: [],
        }
    },
    methods: {
        clickConfirm(){
            console.log(this.form);
            this.add(this.form);
        },
        add(params){
            this.$ajax({
                url: this.$api.score.add,
                method: "post",
                data: params
            }).then(res => {
                this.$message.success("添加成功");
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
                    this.$refs.form.clearValidate();
                });
            }else{
                this.form = JSON.parse(this.originForm);
            }
        }
    },
    created() {
        this.originForm = JSON.stringify(this.form);
        this.getStudentList();
    }
}
</script>

<style scoped>

</style>