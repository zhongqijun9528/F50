<template>
<div>
    <el-row>
        <el-button @click="adduser">增加按钮</el-button>
        <el-input
            style="width:300px"
            placeholder="请输入用户名、角色"
            prefix-icon="el-icon-search"
            @blur="serchInput"
            v-model="inputvalue"
            >
        </el-input>
    </el-row>
    <el-table
    :data="rows"
    border
    style="width: 100%">
    <el-table-column
      prop="userName"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
    prop="userPhone"
      label="手机号"
      width="120">
    </el-table-column>
    <el-table-column
    prop="userMail"
      label="邮箱"
      width="120">
    </el-table-column>
    <el-table-column
    prop="userAcount"
      label="登录名"
      width="120">
    </el-table-column>
    <el-table-column
    prop="userType"
      label="角色"
      width="120">
    </el-table-column>
    <el-table-column
    prop="userStatus"
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="editoruser(scope.row)">编辑</el-button>
        <el-button type="text" @click="deleteduser(scope.row._id)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 修改 -->
  <el-dialog
  title="修改"
  :visible.sync="centerDialogVisible"
  width="45%"
  center>
  
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
         <el-form-item label="角色:">
            <el-input v-model="userType" style="width: 400px;"></el-input>
        </el-form-item>
         <el-form-item label="状态:">
            <el-input v-model="userStatus" style="width: 400px;"></el-input>
        </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="isedioruser(id)">确 定</el-button>
  </span>
</el-dialog>
<!-- 增加 -->
  <el-dialog
  title="增加"
  :visible.sync="addDialogVisible"
  width="45%"
  center>
  
  <el-form label-width="80px">
        <el-form-item label="姓名:">
            <el-input v-model="userName" style="width: 400px;" ></el-input>
        </el-form-item>
        <el-form-item label="用户名:" >
            <el-input v-model="userAcount" style="width: 400px;" @blur="nameRepeat(userAcount)"></el-input><span id="name"></span>
        </el-form-item>
        <el-form-item label="密码:">
            <el-input v-model="userPwd" style="width: 400px;"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
            <el-input v-model="userPhone" style="width: 400px;" @blur="phoneReprat(userPhone)"></el-input><span id="phone"></span>
        </el-form-item>
         <el-form-item label="邮箱:">
            <el-input v-model="userMail" style="width: 400px;"></el-input>
        </el-form-item>
         <el-form-item label="角色:">
            <el-input v-model="userType" style="width: 400px;"></el-input>
        </el-form-item>
         <el-form-item label="状态:">
            <el-input v-model="userStatus" style="width: 400px;"></el-input>
        </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="isadduser">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="删除"
  :visible.sync="deleteDialogVisible"
  width="30%"
  center>
  <span>确认删除这条数据吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="isdeleteduser(id)">确 定</el-button>
  </span>
</el-dialog>
  </div>

</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "userManagement",
  data() {
    return {
      inputvalue:"",
      deleteDialogVisible:false,
      addDialogVisible: false,
      centerDialogVisible: false,
      userPwd: "",
      userAcount: "",
      userPhone: "",
      userMail: "",
      userName: "",
      userType: "",
      userStatus: "",
      id: ""
    };
  },
  created() {
    this.asyncgetusers();
  },
  computed: {
    ...mapState("reg", ["curpage", "eachpage", "maxpage", "rows", "total"])
  },
  methods: {
    async serchInput(){ 
      let sercherinput=this.inputvalue;
      console.log(sercherinput);
      let data = await fetch(`/users?page=1&rows=10`, {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        },
       }).then(function(response) {
        return response.json();
      });
      console.log(data);
      let rows=data.rows.filter((item)=>{
        return item.userAcount==sercherinput||item.userType==sercherinput
      })
      data.rows=rows;
        console.log(data);
      this.getusers(data);
    },
    deleteduser(id){
      this.id=id;
      this.deleteDialogVisible = true;
    },
    isdeleteduser(id){
     this.deleteuser(id);
      this.deleteDialogVisible = false;
    },
    async isadduser() {
      let obj = {
        userAcount: this.userAcount,
        userPhone: this.userPhone,
        userName: this.userName,
        userPwd: this.userPwd,
        userMail: this.userMail,
        userType: this.userType,
        userStatus: this.userStatus
      };
     let data = await fetch(`/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
       }).then(function(response) {
        return response.json();
      });
      console.log(data);
      this.getusers(data);
      this.addDialogVisible = false;
    },
    adduser() {
      this.addDialogVisible = true;
      this.userAcount="";
      this.userPhone="";
      this.userName="";
      this.userPwd="";
      this.userMail="";
      this.userType="";
      this.userStatus=""
    },
    editoruser(row) {
      this.userAcount = row.userAcount;
      this.userPhone = row.userPhone;
      this.userName = row.userName;
      this.userMail = row.userMail;
      this.userType = row.userType;
      this.userStatus = row.userStatus;
      this.id = row._id;
      this.centerDialogVisible = true;
    },
    async isedioruser(id) {
      let obj = {
        userAcount: this.userAcount,
        userPhone: this.userPhone,
        userName: this.userName,
        userMail: this.userMail,
        userType: this.userType,
        userStatus: this.userStatus
      };
      let data = await fetch(`/users/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      }).then(function(response) {
        return response.json();
      });
      
      this.getusers(data);
      this.centerDialogVisible = false;
    },
    ...mapMutations("reg", ["getusers","nameRepeat","phoneReprat"]),

    ...mapActions("reg", ["asyncgetusers", "deleteuser"])
  }
};
</script>