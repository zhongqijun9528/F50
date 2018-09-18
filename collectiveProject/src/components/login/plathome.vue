<template>
<div>
    <el-container>
        <el-header>爱宠帮平台管理系统
          
         
        </el-header>
        
            <el-menu router 
                mode="horizontal"
                background-color="lightblue"
                text-color="#fff"
                active-text-color="#ffd04b" >
                <el-menu-item index="userManagement">用户管理</el-menu-item>
                <el-menu-item index="favouriteManagement">宠主管理</el-menu-item>
                 
            </el-menu>
            <div id="usersession">
              <span>欢迎{{userAcount}}</span><input type="button" @click="savequit" id="sessionBtn" value="安全退出">
            </div>
    </el-container>
    <el-dialog
  title="提示"
  :visible.sync="loginDialogVisible"
  width="30%"
  center>
  <span>你还没登录！</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="loginsession">取 消</el-button>
    <el-button type="primary" @click="loginsession">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="提示"
  :visible.sync="quiteDialogVisible"
  width="30%"
  center>
  <span>确认退出？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="quiteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="quitesession">确 定</el-button>
  </span>
</el-dialog>
    <router-view/>
</div>
</template>

<script>
export default {
  name: "plathome",
  data() {
    return {
      userAcount: "",
      loginDialogVisible:false,
      quiteDialogVisible:false,
    };
  },
  created() {
    this.loginedsession();
  },
  methods: {
    quitesession(){
      fetch(`/users/logout`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
        })
      this.$router.push("/");  
    },
    savequit(){
      this.quiteDialogVisible=true;
      
    },
    loginsession(){
      this.$router.push("/");
    },
    async loginedsession() {
      let data = await fetch(`/users/is_login`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
        return response.json();
      });
      // console.log(data);
      if (data.isuser) {
       this.loginDialogVisible=true;
      }else{
          this.userAcount = data.userAcount;
      }
     
    }
  }
};
</script>

<style scoped>

#usersession {
  position: absolute;
  right: 30px;
  top: 25px;
}
.el-header {
  background-color: pink;
  color: violet;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
}

.el-aside {
  background-color: #d5e6d3;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>