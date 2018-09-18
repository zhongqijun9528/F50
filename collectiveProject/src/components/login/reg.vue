<template  >
    <el-form label-width="80px">
        <el-form-item label="姓名:">
            <el-input v-model="userName" style="width: 400px;" ></el-input>
        </el-form-item>
        <el-form-item label="用户名:">
            <el-input v-model="userAcount" @blur="nameRepeat(userAcount)"  style="width: 400px;"></el-input><span id="name"></span>
        </el-form-item>
        <el-form-item label="电话:">
            <el-input v-model="userPhone"  @blur="phoneReprat(userPhone)" style="width: 400px;"></el-input><span id="phone"></span>
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
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "reg",
  data(){
    return{
      userName:"",
      userAcount:"",
      userPhone:"",
      userMail:"",
      userPwd:"",
      userType:"1",
      userStatus:"2",
    }
  },
  created() {
    this.asyncgetusers();
  },
  computed: {
    ...mapState("reg", ["curpage", "eachpage", "maxpage", "rows", "total"])
  },
  watch: {
    curpage() {
      this.asyncgetusers();
    },
    eachpage() {
      this.asyncgetusers();
    }
  },
  methods: {
       login(){
         
         let obj={userAcount:this.userAcount,userPwd:this.userPwd,userPhone:this.userPhone,userMail:this.userMail,userName:this.userName,userType:this.userType,userStatus:this.userStatus}
        fetch('/users', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
          })
        this.$router.push("/");
       },
    ...mapMutations("reg", ["setCurPage", "setEachPage","nameRepeat","phoneReprat"]),
    ...mapActions("reg", ["asyncgetusers"])
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