<template>
    <el-form  label-width="80px">
        <el-form-item label="用户名">
            <el-input v-model="userAcount" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="userPwd" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="home">登录</el-button>
            <el-button @click="reg">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      userAcount: "",
      userPwd: ""
    };
  },
  created() {
    this.asyncgetusers();
  },
  computed: {
    ...mapState("reg", ["curpage", "eachpage", "maxpage", "rows", "total"])
  },
  methods: {
     
    home() {
         
      let arrAcount = this.rows.filter(item => {
        return item.userAcount == this.userAcount;
      });
      if (arrAcount.length <= 0) {
        alert("该账号还未注册！");
      }
      let arrplathome = this.rows.filter(item => {
        return (
          item.userAcount == this.userAcount &&
          item.userPwd == this.userPwd &&
          item.userType == 0
        );
      });
      if (arrplathome.length > 0) {
        
        let obj={
             userAcount:this.userAcount,
             userPwd : this.userPwd,
      };
      fetch(`/users/login/?userAcount=${this.userAcount}&userPwd=${this.userPwd}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
        
      }).then(function(response) {
        return response.json();
      }).then((data)=>{
          if(data.length>0){
              this.$router.push("/plathome");
          }
      });
      }
      let arrstorehome = this.rows.filter(item => {
        return (
          item.userAcount == this.userAcount &&
          item.userPwd == this.userPwd &&
          item.userType == 1 &&
          item.userStatus == 0
        );
      });
      if (arrstorehome.length > 0) {
        this.$router.push("/storehome");
      }
    },
    reg() {
      this.$router.push("/reg");
    },
    ...mapActions("reg", ["asyncgetusers"])
  }
};
</script>

<style scoped>
.el-form {
  width: 500px;
  margin: 50px auto;
}
</style>