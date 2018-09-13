<template>
<div>
<el-button-group style="display:flex">
    <el-button  @click="addStore = true" type="primary">新增门店<i class="el-icon-plus el-icon--right"></i></el-button>
     <el-input style="margin-left:20px;width:300px" placeholder="请输入内容" >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
</el-button-group>
<!-- 新增门店 -->
<el-dialog fullscreen title="新增门店" :visible.sync="addStore">
 <el-form ref="form" label-width="80px" size="mini">
    <el-form-item label="门店名字">
        <el-input style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="门店地址">
        <el-input style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="法人代表">
        <el-input style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
        <el-input style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="门店特色">
        <el-input style="width:300px" ></el-input>
    </el-form-item>
    <el-form-item label="门店照片">
    <el-upload action="http://192.168.43.106:8080/images" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    </el-form-item>
    <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
    </el-form-item>
    </el-form>
</el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      addStore: false,
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log("file",file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>


<style>
</style>