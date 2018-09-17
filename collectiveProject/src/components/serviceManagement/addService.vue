<template>
    <div>
        <el-button style="margin-right:10px" @click="dialogFormVisible = true" plain type="primary" icon="el-icon-plus">新增</el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="新增服务">
            <el-form label-width="100px" class="addServiceForm">
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
        servicePrice: ""
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
        servicePrice: this.form.servicePrice
      };
      this.asyncAddService(params);
      this.asyncGetService();
      this.$message({
        showClose: true,
        message: "新增成功！",
        type: "success"
      });
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
    },

    // 取消
    cancelBtn() {
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style scoped>
.addServiceForm {
  width: 550px;
  margin-top: 20px;
}
</style>


