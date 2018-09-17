<template>
<div>
<el-button-group style="display:flex">
     <el-input v-model="text" style="margin-left:20px;width:300px" placeholder="门店查询" >
        <i slot="prefix" @click="asyncGetStores({shopName:text,search})" class="el-input__icon el-icon-search"></i>
    </el-input>
      <el-button style="margin-left:10px"  @click="addStore = true" type="primary">新增门店<i class="el-icon-plus el-icon--right"></i></el-button>
</el-button-group>
<!-- 新增门店 -->
<el-dialog fullscreen title="新增门店" :visible.sync="addStore">
 <el-form ref="form" label-width="80px" size="mini">
    <el-form-item label="门店名字">
        <el-input v-model="shopName" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="定位">
        <el-input v-model="shopLocation" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="门店地址">
        <el-input v-model="shopAdd" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="法人代表">
        <el-input v-model="shopCorporate" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
        <el-input v-model="shopTel" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="门店特色">
        <el-input v-model="shopFeature" style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="门店照片">
        <el-upload
        class="avatar-uploader"
        action="/stores/addImg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="shopImg" :src="shopImg" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item size="large">
        <el-button type="primary" @click="asyncAddStore">立即创建</el-button>
        <el-button  @click="addStore = false">取消</el-button>
    </el-form-item>
    </el-form>
</el-dialog>
</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeManagement"
);
export default {
  name:"storeHead",
  data() {
    return {
      text:"",
      search:this,
      addStore: false,
      shopName: "",
      shopCorporate: "",
      shopLocation: "",
      shopAdd: "",
      shopTel: "",
      shopImg: "",
      shopFeature: ""
    };
  },
  methods: {
    async asyncAddStore(context, { curpage, eachpage } = {}) {
      let {
        shopName,
        shopLocation,
        shopImg,
        shopAdd,
        shopCorporate,
        shopTel,
        shopFeature
      } = this;
      if (!shopName) {
        this.$message({
          message: "门店信息填写错误",
          type: "warning"
        });
        return;
      }
      const data = await fetch(`/stores`, {
        method: "post",
        body: JSON.stringify({
          shopName,
          shopAdd,
          shopImg,
          shopLocation,
          shopCorporate,
          shopTel,
          shopFeature
        }),
        headers: {
          "Content-type": "application/json"
        }
      }).then(response => {
        return response.json();
      });
      this.addStore = false;
      this.$message({
        message: "恭喜您，门店创建成功！",
        type: "success"
      });
      this.asyncGetStores();
    },
    handleAvatarSuccess(res, file) {
      this.shopImg = res.shopImg;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    ...mapActions(["asyncGetStores"])
  }
};
</script>


<style>
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
</style>