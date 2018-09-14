<template>
    <div>
        <h1>订单管理</h1>
    <!-- 查询按钮 -->
<el-input v-model="input" placeholder="输入查询内容" @blur="change()" style="width:300px;margin-right:20px"></el-input>
<el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button>
<!-- <el-button round @click="search()">查询</el-button> -->
<!-- 显示的订单信息部分 -->
    <el-table
    :data="rows"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="宠主"
      width="150">
    </el-table-column>
    <el-table-column
      fixed
      prop="shopName"
      label="门店"
      width="150">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsName"
      label="商品"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goodsNumber"
      label="商品数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="300">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
     >
      <template slot-scope="scope">
        <el-button @click="open" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <!-- 分页显示部分 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100">
    </el-pagination>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "orderManagement"
);
export default {
  name: "orders",
  created() {
    this.asyncGetEmpByPage();
  },
  //   计算属性
  computed: {
    ...mapState(["curpage", "eachpage", "maxpage", "rows", "total"])
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    ...mapActions(["asyncGetEmpByPage"]),
    // 分页功能
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 搜索按钮
    search() {
      console.log("search");
    },
    // 输入框失去焦点时触发
    change() {
      console.log("change");
    },
    // 删除的方法
    open() {
      this.$confirm("此操作将永久删除此订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      input: ""
    };
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>