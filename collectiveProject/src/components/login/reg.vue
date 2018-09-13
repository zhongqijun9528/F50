<template  >
    <el-form label-width="80px">
        <el-form-item label="姓名:">
            <el-input v-model="userName" style="width: 400px;" ></el-input>
        </el-form-item>
        <el-form-item label="用户名:">
            <el-input v-model="userAcount" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
            <el-input v-model="userPhone" style="width: 400px;"></el-input>
        </el-form-item>
         <el-form-item label="邮箱:">
            <el-input v-model="userMail" style="width: 400px;"></el-input>
        </el-form-item>
         <el-form-item label="密码:">
            <el-input v-model="userPwd" style="width: 400px;"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="login">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
  name: "reg",
  data() {
    return {
      userName: "",
      userAcount: "",
      userPwd: "",
      userPhone: "",
      userMail: "",
      userType: 0,
      userStatus: 2
    };
  },
  created() {
      
    let getdata = fetch("/users", {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
        
      return response.json();
    });
    // console.log(getdata)
    
 
  },
  
  methods: {
    login() {
        console.log(this.userAcount)
      this.$router.push("/login");
    },
    chechuserAcount(){
        // if(this.userAcount==)
        console.log(getdata)
    },
    getusers(){

    }
  }
};
</script>

<style scoped>
.el-form {
  width: 500px;
  margin: 50px auto;
}
/* .el-button{
        width: 70px;
        margin: 0 auto;
    } */
</style>