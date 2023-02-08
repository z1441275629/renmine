<template>
    <div class="">
        <div class="search">
            <el-form inline :model="form" ref="form">
                <el-form-item label="阶段" prop="stage">
                    <el-select v-model="form.stage" clearable>
                        <el-option label="全部" value=""></el-option>
                        <!-- <el-option v-for="item in stageList" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                        <el-option v-for="item in stageList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级" prop="grade">
                    <el-select v-model="form.grade" clearable>
                        <el-option label="全部" value=""></el-option>
                        <!-- <el-option v-for="item in gradeList" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                        <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="classId">
                    <el-select v-model="form.classId" clearable>
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="i in 30" :key="i" :label="i+'班'" :value="i"></el-option>
                        </el-select>
                </el-form-item>
                <el-button type="primary" @click.native="clickSearch">搜索</el-button>
                <el-button type="primary" @click.native="clickAdd">新增</el-button>
                <el-button type="primary" @click.native="clickReset">重置</el-button>

            </el-form>
        </div>
        <div class="table-area">
            <el-table :data="tableData" fit border>
                <el-table-column type="index" label="序号" width="80px"></el-table-column>
                <el-table-column v-for="item in tableItems" :key="item.id" :label="item.label" 
                    :prop="item.field" :formatter="item.formatter" align="center"></el-table-column>
                <el-table-column label="操作">
                    <template v-slot="scope">
                        <el-button type="primary" size="medium" @click.native="clickEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="medium" @click.native="clickDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page.curPage"
                :page-size="page.perPageCount"
                layout="total, sizes, prev, pager, next"
                :total="page.total"></el-pagination>
        </div>

        <user 
            v-model="showDialogForm" 
            :data="operateData" 
            :isAdd="isAdd"
            :stageList="stageList"
            :gradeList="gradeList"
            ></user>
        <!-- <user v-model="showDialogForm" v-bind="lists"></user> -->
    </div>
</template>

<script>
import user from './dialogs/user'
import { date } from '../../utils/datetime'

export default {
    components: { user },
    data(){
        return {
            tableData: [],
            form: {
                stage: "",
                grade: "",
                classId: "",
                username: "",
            },
            page: {
                curPage: 1,
                perPageCount: 10,
                total: 0,
            },
            showDialogForm: false,
            operateData: {},
            isAdd: true,
            tableData: [],
            tableItems: [
                // { label: "", field: "", formatter: fn },
                { label: "姓名", field: "name", width: "", },
                { label: "年级", field: "gradeName", width: "", },
                { label: "班级", field: "classId", width: "", formatter: row => row.classId && row.classId + "班" },
                { label: "阶段", field: "stageName", width: "", },
                { label: "手机", field: "phone", width: "", },
                { label: "角色", field: "roleName", width: "", },
                { label: "邮箱", field: "email", width: "", },
                { label: "密码", field: "password", width: "", },
                { label: "生日", field: "date", width: "", formatter: row => row.date && date(row.date) },
            ],
            // stageList: [
            //     { label: "幼儿园", value: 1, },
            //     { label: "小学", value: 2, },
            //     { label: "初中", value: 3, },
            //     { label: "高中", value: 4, },
            //     { label: "大学", value: 5, },
            //     { label: "研究生", value: 6, },
            //     { label: "博士", value: 7, },
            // ],
            stageList: [],
            // gradeList: [
            //     { label: "一年级", value: 1, },
            //     { label: "二年级", value: 2, },
            //     { label: "三年级", value: 3, },
            //     { label: "四年级", value: 4, },
            //     { label: "五年级", value: 5, },
            //     { label: "六年级", value: 6, },
            // ],
            gradeList: [],
            lists: {
                stageList: this.stageList,
                gradeList: this.gradeList,
                isAdd: this.isAdd,
                data: this.operateData,
            },
        }
    },
    methods: {
        handleCurrentChange(val){
            this.page.curPage = val;
            this.getList();
        },
        handleSizeChange(val){
            this.page.perPageCount = val;
            this.page.curPage = 1;
            this.getList();
        },
        // clickDel(row){
        //     console.log(row);
        //     this.$confirm("确定要删除吗?", "警告",{
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(res => {
        //         this.$ajax({
        //             url: this.$api.user.del,
        //             method: "delete",
        //             data: {
        //                 id: row.id
        //             }
        //         }).then(res => {

        //         }).catch(console.log);
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // },
        async clickDel(row){
            console.log(row);
            try{
                let res = await this.$confirm("确定要删除吗?", "警告",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                let delRes = await this.$ajax({
                    url: this.$api.user.del,
                    method: "delete",
                    data: {
                        id: row.id
                    }
                })
                if(delRes.code == "0000"){
                    this.getList();
                }else{
                    this.$message.error(delRes.msg);
                }
            }catch(err){
                console.log(err);
            }
            
            
            // .then(res => {
            //     this.$ajax({
            //         url: this.$api.user.del,
            //         method: "delete",
            //         data: {
            //             id: row.id
            //         }
            //     }).then(res => {

            //     }).catch(console.log);
            // }).catch((err) => {
            //     console.log(err);
            // });
        },
        clickEdit(row){
            // console.log(row);
            this.isAdd = false;
            this.showDialogForm = true;
            // 将username字段换成name
            let { name, ...data } = row;
            this.operateData = { 
                ...data,
                username: name,
            };
        },
        getList(){
            this.$ajax({
                url: this.$api.user.list,
                method: "get",
                params: { 
                    ...this.form,
                    curPage: this.page.curPage,
                    perPageCount: this.page.perPageCount,
                }
            }).then(res => {
                this.tableData = res.data.list || [];
                this.page.total = res.data.total;

            }).catch(err => {
                console.log(err);
            });
        },
        getStageList(){
            this.$ajax({
                url: this.$api.common.stageList,
                method: "get",
                params: {}
            }).then(res => {
                this.stageList = res.data || [];
            }).catch(err => {
                console.log(err);
            });
        },
        getGradeList(){
            this.$ajax({
                url: this.$api.common.gradeList,
                method: "get",
                params: {}
            }).then(res => {
                this.gradeList = res.data || [];
            }).catch(err => {
                console.log(err);
            });
        },
        clickSearch(){
            this.page.curPage = 1;
            this.getList();
        },
        clickAdd(){
            this.showDialogForm = true;
        },
        clickReset(){
            this.$refs.form && this.$refs.form.resetFields();
        }
    },
    created() {
        this.getList();
        this.getStageList();
        this.getGradeList();
    }
}
</script>

<style scoped>

</style>