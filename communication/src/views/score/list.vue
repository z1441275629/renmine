<template>
    <div class="">
        <div class="search">
            <el-form inline :model="form" ref="form">
                <el-form-item label="阶段" prop="stage">
                    <el-select v-model="form.stage" clearable>
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in stageList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级" prop="grade">
                    <el-select v-model="form.grade" clearable>
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in gradeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column v-for="item in tableItems" :key="item.id" :label="item.label" 
                :prop="item.field" :formatter="item.formatter" align="center"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page.curPage"
                :page-size="page.perPageCount"
                layout="total, sizes, prev, pager, next"
                :total="page.total"></el-pagination>
        </div>

        <score-form v-model="showDialogForm" :data="operateData" :isAdd="isAdd"></score-form>
    </div>
</template>

<script>
import scoreForm from "./dialogs/form"
import { date } from "@/utils/datetime.js"

export default {
    components: { scoreForm },
    data(){
        return {
            tableData: [],
            form: {
                stage: "",
                grade: "",
                classId: "",
            },
            page: {
                curPage: 1,
                perPageCount: 10,
                total: 0,
                page_count: 1
            },
            showDialogForm: false,
            operateData: {},
            isAdd: true,
            tableData: [],
            tableItems: [
                // { label: "", field: "", formatter: fn },
                { label: "姓名", field: "username", width: "", },
                { label: "阶段", field: "stageName", width: "", },
                { label: "年级", field: "gradeName", width: "", },
                { label: "班级", field: "classId", width: "", formatter: row => row.classId && row.classId + "班" },
                { label: "语文", field: "chinese", width: "", },
                { label: "数学", field: "math", width: "", },
                { label: "英语", field: "english", width: "", },
                { label: "物理", field: "physics", width: "", },
                { label: "化学", field: "chemistry", width: "", },
                { label: "地理", field: "geograph", width: "", },
                { label: "生物", field: "biology", width: "", },
                { label: "自然", field: "nature", width: "", },
                { label: "科学", field: "science", width: "", },
                { label: "政治", field: "politics", width: "", },
                { label: "历史", field: "history", width: "", },
                { label: "体育", field: "pe", width: "", },
                { label: "音乐", field: "music", width: "", },
                { label: "美术", field: "art", width: "", },
                { label: "日期", field: "date", width: "", formatter:(row) => row.date && date(row.date * 1000) },
            ],
            stageList: [
                { label: "幼儿园", value: 1, },
                { label: "小学", value: 2, },
                { label: "初中", value: 3, },
                { label: "高中", value: 4, },
                { label: "大学", value: 5, },
                { label: "研究生", value: 6, },
                { label: "博士", value: 7, },
            ],
            gradeList: [
                { label: "一年级", value: 1, },
                { label: "二年级", value: 2, },
                { label: "三年级", value: 3, },
                { label: "四年级", value: 4, },
                { label: "五年级", value: 5, },
                { label: "六年级", value: 6, },
            ],
            // conditionTypeList: [
            //     { label: "大于", value: 1 },
            //     { label: "大于等于", value: 2 },
            //     { label: "小于", value: 3 },
            //     { label: "小于等于", value: 4 },
            //     { label: "不等于", value: 5 },
            //     { label: "介于", value: 6 },
            // ],
            // show
        }
    },
    methods: {
        handleCurrentChange(val){
            this.page.curPage = val;
            this.getTableData();
        },
        handleSizeChange(val){
            this.page.perPageCount = val;
            this.page.curPage = 1;
            this.getTableData();
        },
        clickSearch(){
            this.getTableData();
        },
        clickAdd(){
            this.showDialogForm = true;
        },
        add(){

        },
        clickReset(){
            this.$refs.form && this.$refs.form.resetFields();
        },
        getTableData(){
            let params = { 
                ...this.form,
                curPage: this.page.curPage,
                perPageCount: this.page.perPageCount
            };
            this.$ajax({
                url: this.$api.score.list,
                method: "get",
                params
            }).then(res => {
                this.tableData = res.data.list || [];
                this.page.total = res.data.total;
                this.page.page_count = res.data.page_count;
            }).catch(console.log);
        }
    },
    created() {
        this.getTableData();
    },
    beforeRouteLeave(to, from, next){
        let res = window.confirm("确定要离开吗？");
        if(res){
            next();
        }else{
            next(false);
        }
    }
}
</script>

<style scoped>

</style>