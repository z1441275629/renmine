<template>
    <div class="">
        {{ studentList.map(item => item.name).join("-") }}
    </div>
</template>

<script>
import Vue from 'vue';
// console.log(new Vue().$ajax);
const { $ajax, $api } = new Vue();

export default {
    data(){
        return {
            studentList: [],
        }
    },
    methods: {

    },
    created() {

    },
    beforeRouteEnter(to, from, next){
        console.log(121);
        $ajax({
            url: $api.common.studentList,
            method: "get",
            params: {}
        }).then(res => {
            next(vm => {
                vm.studentList = res.data;
            });
        }).catch(console.log);
    }
}
</script>

<style scoped>

</style>