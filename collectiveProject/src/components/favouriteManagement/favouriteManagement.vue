<template>

<div>

    <el-card>
 <!-- 搜索输入框 -->
      <el-input style="width:600px" placeholder="请输入内容" v-model="text" class="input-with-select">
    <el-select style="width:130px" v-model="type" slot="prepend" placeholder="请选择">
      <el-option label="手机号" value="memberPhone"></el-option>
      <el-option label="昵称" value="memberAcount"></el-option>
      <el-option label="姓名" value="memberName"></el-option>
    </el-select>
    <el-button @click="DemandHostsbtn" slot="append" icon="el-icon-search"></el-button>
  </el-input>
     
<!-- 新增弹出框 -->

      <el-button style="margin-left:20px" type="primary" icon="el-icon-plus"  @click="dialogFormVisible = true">新增</el-button>
<el-dialog title="新增宠主" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="电话号码" :label-width="formLabelWidth">
      <el-input v-model="form.memberPhone" auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
     <el-form-item label="呢城" :label-width="formLabelWidth">
      <el-input v-model="form.memberAcount" auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
     <el-form-item label="真实姓名" :label-width="formLabelWidth">
      <el-input v-model="form.memberName"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
       <el-form-item label="会员卡" :label-width="formLabelWidth">
      <el-input v-model="form.menberCard"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
       <el-form-item label="送货地址" :label-width="formLabelWidth">
      <el-input v-model="form.memberAdd"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
       <el-form-item label="区域" :label-width="formLabelWidth">
      <el-input v-model="form.memberArea"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
       <el-form-item label="积分" :label-width="formLabelWidth">
      <el-input v-model="form.memberPoint"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
     
    <el-form-item label="拥有的宠物" :label-width="formLabelWidth">
         <el-form  label-width="80px" >
  <el-form-item label="名字">
    <el-input v-model="form.pets[0].name" style="width:200px;padding-top:10px"></el-input>
  </el-form-item>
  <el-form-item label="品种">
    <el-input  v-model="form.pets[0].species" style="width:200px;padding-top:10px"></el-input>
  </el-form-item>
  <el-form-item label="类型">
    <el-input v-model="form.pets[0].breed" style="width:200px;padding-top:10px"></el-input>
  </el-form-item>
   <el-form-item label="颜色">
    <el-input  v-model="form.pets[0].color" style="width:200px;padding-top:10px"></el-input>
  </el-form-item>
   <el-form-item label="出生日期">
    <el-input v-model="form.pets[0].birth" style="width:200px;padding-top:10px"></el-input>
  </el-form-item>
  <el-form-item label="性格">
    <el-input  v-model="form.pets[0].character" style="width:200px;padding-top:10px"></el-input>
  </el-form-item>

</el-form>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button @click="Add" >确 定</el-button>
  </div>
</el-dialog>
  <!-- 修改弹出框 -->

      <el-dialog title="修改" :visible.sync="dialogFormVisibleXG">
  <el-form :model="form">
    <el-form-item label="电话号码" :label-width="formLabelWidth">
      <el-input v-model="form.memberPhone" auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
     <el-form-item label="呢城" :label-width="formLabelWidth">
      <el-input v-model="form.memberAcount" auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
     <el-form-item label="真实姓名" :label-width="formLabelWidth">
      <el-input v-model="form.memberName"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
       <el-form-item label="会员卡" :label-width="formLabelWidth">
      <el-input v-model="form.menberCard"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
       <el-form-item label="送货地址" :label-width="formLabelWidth">
      <el-input v-model="form.memberAdd"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
       <el-form-item label="区域" :label-width="formLabelWidth">
      <el-input v-model="form.memberArea"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
       <el-form-item label="积分" :label-width="formLabelWidth">
      <el-input v-model="form.memberPoint"  auto-complete="off" style="width:300px"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleXG = false">取 消</el-button>
    <el-button @click="xg" >确 定</el-button>
  </div>
</el-dialog>

    </el-card>
    
<el-card>
  <!-- 渲染表格 -->
   <el-table :data="rows" fit border style="width: 100%">
    <el-table-column fixed prop="memberPhone" label="电话号码" width="150"></el-table-column>
    <el-table-column prop="memberAcount" label="呢城" width="120"></el-table-column>
    <el-table-column prop="memberName" label="真实姓名" width="120"></el-table-column>
    <el-table-column prop="menberCard" label="会员卡" width="120"></el-table-column>
    <!-- <el-table-column prop="memberImg" label="头像" width="120"></el-table-column> -->
    <el-table-column prop="memberAdd" label="送货地址" width="120"></el-table-column>
    <el-table-column prop="memberArea" label="区域" width="120"></el-table-column>
    <el-table-column prop="memberPoint" label="积分" width="120"></el-table-column>
    <el-table-column  label="拥有的宠物" width="120">
      <template slot-scope="rows">
      <el-popover placement="right" width="400" trigger="click">
      <el-table :data="pets" >
        <el-table-column width="150" property="name" label="名字"></el-table-column>
        <el-table-column width="100" property="species" label="品种"></el-table-column>
        <el-table-column width="100" property="breed" label="种类"></el-table-column>
        <el-table-column width="300" property="color" label="颜色"></el-table-column>
        <el-table-column width="300" property="birth" label="出生日期"></el-table-column>
        <el-table-column width="300" property="character" label="性格"></el-table-column>
      </el-table>
  <el-button @click="ses(rows.row.pets)" slot="reference">点击查看</el-button>
</el-popover>
      </template>

    </el-table-column>
    <el-table-column
      label="操作"
      width="150">
      <template slot-scope="rows">
        <el-button @click="asyncDelentHostss(rows.row._id)" type="text" >删除</el-button>
        <el-button @click="asyncUpdateHostss(rows.row)"  type="text" >编辑</el-button>
      </template>
    </el-table-column>
   </el-table>
 
</el-card>
    <el-card>
      <el-pagination
      @size-change="handleCurrentChange"
      @current-change="handleSizeChange"
      :current-page="eachpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="eachpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background>
      </el-pagination>
    </el-card>
  
</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "favouriteManagement"
);
export default {
  name: "hosts",
  created() {
    this.asyncGethosts();
    this.asyncDelentHosts();
  },

  computed: {
    ...mapState(["curpage", "eachpage", "maxpage", "rows", "total"])
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions([
      "asyncGethosts",
      "asyncDelentHosts",
      "asyncAddhosts",
      "asyncUpdateHosts"
    ]),
    // 查询
    DemandHostsbtn() {
      console.log(this.type, this.text);
      this.asyncGethosts({ type: this.type, text: this.text });
    },
    // 删除
    asyncDelentHostss(id) {
      let ID = id;
      this.asyncDelentHosts(ID);
      this.asyncGethosts();

    },
    // 修改
    asyncUpdateHostss(params) {
      this.dialogFormVisibleXG = true;
      this.updateId = params._id;
      this.form.memberPhone = params.memberPhone;
      this.form.memberAcount = params.memberAcount;
      this.form.memberName = params.memberName;
      this.form.menberCard = params.menberCard;
      this.form.memberImg = params.memberImg;
      this.form.memberAdd = params.memberAdd;
      this.form.memberArea = params.memberArea;
      this.form.memberPoint = params.memberPoint;
    },


    // ---------------------------------------------查看宠物====-----------------------------------------

    ses(params){
      console.log(params)
      this.pets = params;
    },
    // 确认修改
    xg() {
      console.log(this.form.memberPhone);
      const params = {
        updateId: this.updateId,
        memberPhone: this.form.memberPhone,
        memberAcount: this.form.memberAcount,
        memberName: this.form.memberName,
        menberCard: this.form.menberCard,
        memberImg: this.form.memberImg,
        memberAdd: this.form.memberAdd,
        memberArea: this.form.memberArea,
        memberPoint: this.form.memberPoint
      };
      this.asyncUpdateHosts(params);
      this.asyncGethosts();
      this.dialogFormVisibleXG = false;
    },
    handleSizeChange(val) {
      this.asyncGethosts({ curpage: val });
    },
    handleCurrentChange(val) {
      this.asyncGethosts({ curpage: this.curpage, eachpage: val });
    },
    ...mapMutations("hosts", ["setCurPage", "setEachPage"]),
    ...mapActions("hosts", ["asyncGethosts"]),
    firstPage() {
      this.asyncGethosts({ curpage: 1 });
    },
    lastPage() {
      this.asyncGethosts({ curpage: this.maxpage });
    },
    // 新增
    Add() {
      console.log(this.form.pets)
      const params = {
        memberPhone: this.form.memberPhone,
        memberAcount: this.form.memberAcount,
        memberName: this.form.memberName,
        menberCard: this.form.menberCard,
        memberImg: this.form.memberImg,
        memberAdd: this.form.memberAdd,
        memberArea: this.form.memberArea,
        memberPoint: this.form.memberPoint,
        pets: this.form.pets
      };
      this.asyncAddhosts(params);
      this.asyncGethosts();
      this.dialogFormVisible = false;
    }
  },
  // 删除数据

  data() {
    return {
      // 查询类型和查询类容
      text: "",
      type: "",
      dialogFormVisible: false,
      dialogFormVisibleXG: false,
      dialogImageUrl: "789",
      dialogVisible: false,
      form: {
        // 新增宠主类容双向绑定数据
        memberPhone: "",
        menmberAcount: "",
        memberName: "",
        menberCard: "",
        memberImg:"",
        memberAdd: "",
        memberArea: "",
        memberPoint: "",
        delivery: false,  
        pets:[{
          name:"",
          species:"",
          breed:"",
          color:"",
          birth:"",
          character:"",
        }]
      },
      formLabelWidth: "100px",
      updateId: "",
      pets:[]
    };
  }
};
</script>

<style >
.pets el-input{
  width: 100px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>