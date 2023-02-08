<template>
    <div class="">
        <el-dialog :visible.sync="showDialog" title="新增筛选条件" center>
            <el-form :model="form" ref="form" label-position="right" label-width="100px"> 
                <el-form-item label="比较类型" prop="type">
                    <el-select v-model="form.type" clearable>
                        <el-option v-for="item in conditionTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字段" prop="field">
                    <el-select v-model="form.field" clearable>
                        <el-option v-for="item in subjectList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="值">
                    <el-input v-model="form.val" placeholder="比较的值"></el-input>
                </el-form-item>
                <el-form-item label="范围">
                    <el-input v-model="form.min" placeholder="最小值"></el-input>
                    到
                    <el-input v-model="form.max" placeholder="最大值"></el-input>
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
        // conditionTypeList: {
        //     type: Array,
        //     default: () => ([])
        // }
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
    },
    data(){
        return {
            form: {
                type: "",
                min: "",
                max: "",
                val: "",
            },
            originForm: "{}",
            studentList: [],
            subjectList: [
                { label: "语文", value: "chinese", },
                { label: "数学", value: "math", },
                { label: "英语", value: "english", },
                { label: "物理", value: "physics", },
                { label: "化学", value: "chemistry", },
                { label: "地理", value: "geograph", },
                { label: "生物", value: "biology", },
                { label: "自然", value: "nature", },
                { label: "科学", value: "science", },
                { label: "政治", value: "politics", },
                { label: "历史", value: "history", },
                { label: "体育", value: "pe", },
                { label: "音乐", value: "music", },
                { label: "美术", value: "art", },
            ],
            conditionTypeList: [
                { label: "大于", value: "gt", },
                { label: "大于等于", value: "egt", },
                { label: "小于", value: "lt", },
                { label: "小于等于", value: "elt", },
                { label: "等于", value: "eq", },
                { label: "不等于", value: "neq", },
                { label: "包含", value: "like", },
                { label: "包含于", value: "in", },
                { label: "介于", value: "between", },
                { label: "为空", value: "null", },
                { label: "不为空", value: "notnull", },
            ]
        }
    },
    methods: {
        clickConfirm(){
            console.log(this.form);
            this.add(this.form);
        },
        add(params){
            this.$emit("addCondition",this.form);
            this.showDialog = false;
        },
        clickCancel(){
            this.showDialog = false;
        },
    },
    watch: {
        value(n, o){
            if(n){
                this.$nextTick(() => {
                    this.$refs.form.clearValid();
                });
            }else{
                this.form = JSON.parse(this.originForm);
            }
        }
    },
    created() {
        this.originForm = JSON.stringify(this.form);
    }
}
</script>

<style scoped>

</style>