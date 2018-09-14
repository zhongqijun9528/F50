<template>
    <div>
        <el-button style="margin-right:10px" @click="dialogFormVisible = true" plain type="primary" icon="el-icon-plus">新增</el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="新增服务">
            <el-form label-width="100px" class="form">
                <el-form-item label="服务名称：">
                    <el-input v-model="form.serviceName"></el-input>
                </el-form-item>
                <el-form-item label="服务类别：">
                    <el-select v-model="form.serviceType" placeholder="请选择服务类别">
                        <el-option label="狗狗" value="cat"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排期：">
                    <el-date-picker v-model="form.serviceSchedule" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="适用规格：">
                    <el-checkbox-group v-model="form.serviceCanFor">
                        <el-checkbox label="迷你犬" name="type"></el-checkbox>
                        <el-checkbox label="小型犬" name="type"></el-checkbox>
                        <el-checkbox label="中型犬" name="type"></el-checkbox>
                        <el-checkbox label="大型犬" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="服务规格：">
                    <el-radio-group v-model="form.serviceDetial">
                        <el-radio label="优"></el-radio>
                        <el-radio label="良"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="耗时：">
                    <el-input v-model="form.serviceTime"></el-input>
                </el-form-item>
                <el-form-item label="服务员等级：">
                    <el-select v-model="form.serviceLevel" placeholder="请选择服务员等级">
                        <el-option label="1" value="first"></el-option>
                        <el-option label="2" value="second"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格：">
                    <el-input v-model="form.servicePrice"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="addService" type="primary">立即添加</el-button>
                    <el-button>取消</el-button>
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
  //   props: {
  //     dialogFormVisible: {
  //       default: false
  //     }
  //   },
  data() {
    return {
      form: {
        serviceName: "",
        serviceType: "",
        serviceSchedule: "",
        serviceCanFor: [],
        serviceDetial: "",
        serviceTime: "",
        serviceLevel: [],
        servicePrice: ""
      },
      dialogFormVisible: false
    };
  },
  methods: {
    ...mapActions(["asyncAddService"]),
    addService() {
      console.log(123);
      const service = {
        serviceName: this.form.serviceName,
        serviceType: this.form.serviceType,
        serviceSchedule: this.form.serviceSchedule,
        serviceCanFor: this.form.serviceCanFor,
        serviceDetial: this.form.serviceDetial,
        serviceTime: this.form.serviceTime,
        serviceLevel: this.form.serviceLevel,
        servicePrice: this.form.servicePrice
      };
      console.log(service);
      this.asyncAddService(service);
    }
  }
};
</script>

<style scoped>
.form {
  width: 500px;
  margin-top: 20px;
}
</style>


