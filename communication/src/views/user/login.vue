<template>
    <div class="">
        <div>来自：{{ from }}</div>
        <el-form :model="form" :rules="rules">
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" clearable placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" clearable placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" clearable placeholder="" type="password"></el-input>
            </el-form-item>
            <el-row>
                <el-col>
                    <el-button @click.native="clickPhoneLogin" type="primary">手机号登录</el-button>
                    <el-button @click.native="clickEmailLogin" type="primary">邮箱登录</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    props: ["from"],
    data(){
        return {
            form: {
                password: "",
                phone: "",
                email: "",
            },
            rules: {
                password: "",
                phone: "",
                email: "",
            },
        }
    },
    methods: {
        clickPhoneLogin(){
            console.log(this.form);
            this.phoneLogin(this.form);
        },
        clickEmailLogin(){
            this.emailLogin();
        },
        phoneLogin(params){
            this.$ajax({
                url: this.$api.user.login,
                method: "post",
                data: {
                    phone: this.form.phone,
                    password: this.form.password
                }
            }).then(res => {
                console.log(res);
                localStorage.setItem("token", "phone");
            }).catch(err => {
                console.log(err);
            });
        },
        emailLogin(){
            this.$ajax({
                url: this.$api.user.login,
                method: "post",
                data: {
                    email: this.form.email,
                    password: this.form.password
                }
            }).then(res => {
                console.log(res);
                localStorage.setItem("token", "email");
            }).catch(err => {
                console.log(err);
            });
        }
    },
    created() {
        
    }
}
</script>

<style scoped>

</style>