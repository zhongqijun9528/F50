<template>
<div>
    <storeHead />
    <el-table :data="tableData" style="width: auto">
      <el-table-column prop="shopName" label="店名" width="180"></el-table-column>
      <el-table-column prop="shopCorporate" label="法人代表" width="180"></el-table-column>
      <el-table-column prop="shopTel" label="联系电话" width="180"></el-table-column>
      <el-table-column prop="shopAdd" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-row>
            <!-- 点击弹出门店详情 -->
            <el-button type="success"  @click="storeDetails = true"  icon="el-icon-check" circle></el-button>
            <el-button type="danger" @click="remove" icon="el-icon-delete" circle></el-button>
            </el-row>
        </template>
      </el-table-column>
    </el-table>
<!-- 门店的详情 -->
<el-dialog fullscreen title="门店详情" :visible.sync="storeDetails">
  <el-table :data="tableData">
    <el-table-column prop="shopName" label="店名"></el-table-column>
    <el-table-column prop="shopLicenceNum" label="营业执照号" width="180"></el-table-column>
    <el-table-column prop="shopCorporate" label="法人代表" width="100"></el-table-column>
    <el-table-column prop="shopFeature" label="特色" width="180"></el-table-column>
    <el-table-column prop="shopLocation" label="定位"></el-table-column>
    <el-table-column prop="shopAdd" label="地址" width="300"></el-table-column>
    <el-table-column prop="shopTel" label="联系电话" width="180"></el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-row>
            <el-button type="success" icon="el-icon-edit" circle></el-button>
            </el-row>
        </template>
      </el-table-column>
  </el-table>
</el-dialog>

</div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          shopLicenceNum: "213332414133114",
          shopName: "萌宠一家",
          shopCorporate: "王小虎",
          shopLocation: "上海",
          shopAdd: "上海市普陀区金沙江路 1518 弄",
          shopTel: "12312312312",
          shopImg: "",
          shopFeature: "特色，特色，特色",
          shopEmployee: [
            {
              empName: "员工姓名",
              empLevel: "",
              empPhone: "12312312312"
            }
          ]
        },
        {
          shopLicenceNum: "213332414133114",
          shopName: "萌宠一家",
          shopCorporate: "王小虎",
          shopLocation: "上海",
          shopAdd: "上海市普陀区金沙江路 1518 弄",
          shopTel: "12312312312",
          shopImg: "",
          shopFeature: "特色，特色，特色",
          shopEmployee: [
            {
              empName: "员工姓名",
              empLevel: "",
              empPhone: "12312312312"
            }
          ]
        },
        {
          shopLicenceNum: "213332414133114",
          shopName: "萌宠一家",
          shopCorporate: "王小虎",
          shopLocation: "上海",
          shopAdd: "上海市普陀区金沙江路 1518 弄",
          shopTel: "12312312312",
          shopImg: "",
          shopFeature: "特色，特色，特色",
          shopEmployee: [
            {
              empName: "员工姓名",
              empLevel: "",
              empPhone: "12312312312"
            }
          ]
        },
        {
          shopLicenceNum: "213332414133114",
          shopName: "萌宠一家",
          shopCorporate: "王小虎",
          shopLocation: "上海",
          shopAdd: "上海市普陀区金沙江路 1518 弄",
          shopTel: "12312312312",
          shopImg: "",
          shopFeature: "特色，特色，特色",
          shopEmployee: [
            {
              empName: "员工姓名",
              empLevel: "",
              empPhone: "12312312312"
            }
          ]
        }
      ],
      storeDetails: false
    };
  },
  methods: {
    remove() {
      this.$confirm("确认是否删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "是",
        cancelButtonText: "否"
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "已删除"
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message: action === "cancel" ? "放弃删除" : "停留在当前页面"
          });
        });
    }
  }
};
</script>

<style>
</style>