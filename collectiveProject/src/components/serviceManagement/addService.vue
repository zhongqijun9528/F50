<template>
    <div>
        <el-button style="margin-right:10px" @click="dialogFormVisible = true" plain type="primary" icon="el-icon-plus">新增</el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="新增服务">
            <el-form :model="form" ref="form" label-width="100px" class="addServiceForm">
                <el-form-item label="爱宠类型：">
                    <el-select v-model="form.serviceName" placeholder="请选择爱宠类型">
                        <el-option label="猫猫" value="猫猫"></el-option>
                        <el-option label="狗狗" value="狗狗"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务类型：">
                    <el-select v-model="form.serviceType" placeholder="请选择服务类型">
                        <el-option label="洗护" value="洗护"></el-option>
                        <el-option label="美容" value="美容"></el-option>
                        <el-option label="寄养" value="寄养"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务时间：">
                    <el-time-select style="margin-right:10px" placeholder="起始时间" v-model="form.startTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"></el-time-select>
                    <el-time-select placeholder="结束时间" v-model="form.endTime" :picker-options="{start: '08:30',step: '00:15',end: '18:30',minTime: form.startTime}"></el-time-select>
                </el-form-item>
                <el-form-item label="适用体型：">
                    <el-radio-group v-model="form.serviceCanFor">
                        <el-radio label="迷你"></el-radio>
                        <el-radio label="小型"></el-radio>
                        <el-radio label="中型"></el-radio>
                        <el-radio label="大型"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="服务规格：">
                    <el-radio-group v-model="form.serviceDetial">
                        <el-radio label="优"></el-radio>
                        <el-radio label="良"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="耗费时长：">
                    <el-input v-model="form.serviceTime"></el-input>
                </el-form-item>
                <el-form-item label="服务员等级：">
                    <el-select v-model="form.serviceLevel" placeholder="请选择服务员等级">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格：">
                    <el-input v-model="form.servicePrice"></el-input>
                </el-form-item>
                <el-form-item label="图片：">
                    <el-upload
                        class="avatar-uploader"
                        action="/services/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="this.form.serviceImg" :src="this.form.serviceImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addBtn" type="primary">立即添加</el-button>
                    <el-button @click="cancelBtn">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "service"
);
export default {
  data() {
    return {
      form: {
        serviceName: "",
        serviceType: "",
        startTime: "",
        endTime: "",
        serviceCanFor: "",
        serviceDetial: "",
        serviceTime: "",
        serviceLevel: "",
        servicePrice: "",
        serviceImg: ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    ...mapActions(["asyncAddService", "asyncGetService"]),

    // 添加
    addBtn() {
      const params = {
        serviceName: this.form.serviceName,
        serviceType: this.form.serviceType,
        serviceSchedule: `${this.form.startTime}-${this.form.endTime}`,
        serviceCanFor: this.form.serviceCanFor,
        serviceDetial: this.form.serviceDetial,
        serviceTime: this.form.serviceTime,
        serviceLevel: this.form.serviceLevel,
        servicePrice: this.form.servicePrice,
        serviceImg: this.form.serviceImg
      };
      this.asyncAddService(params);
      this.asyncGetService();
      this.$message({
        showClose: true,
        message: "新增成功！",
        type: "success"
      });
      this.dialogFormVisible = false;
      this.$refs["form"].resetFields();
    },

    // 取消
    cancelBtn() {
      this.dialogFormVisible = false;
    },

    // 上传图片
    handleAvatarSuccess(res, file) {
      this.form.serviceImg = res;
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
    }
  }
};
</script>

<style scoped>
.addServiceForm {
  width: 550px;
  margin-top: 20px;
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
</style>


