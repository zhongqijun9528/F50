<template>
    <el-form  label-width="80px">
        <el-form-item label="用户名">
            <el-input v-model="userName" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="home">登录</el-button>
            <el-button @click="reg">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
     export default {
        name:"login",
        data(){
            return{
                userName:""
            }
        },
        beforeMount() {
            
            // this.usename=
            // console.log(this.$route.params.username);
            // this.username=this.$route.params.username;
        },
        methods:{
            home(){
                this.$router.push("/plathome");
            },
             reg(){
                this.$router.push("/");
            }
        }
    }
</script>

<style scoped>
    .el-form{
        width: 500px;
        margin: 50px auto;
    }
</style>