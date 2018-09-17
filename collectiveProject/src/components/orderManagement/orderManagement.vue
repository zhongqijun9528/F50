<template>
    <div>
        <h1>订单管理</h1>
    <!-- 查询按钮 -->
    <div style="margin-top: 15px;width:500px">
      <el-input placeholder="请输入内容" v-model="text" class="input-with-select">
      <el-select style="width:130px" v-model="type" slot="prepend" placeholder="请选择">
        <el-option label="宠主" value="name"></el-option>
        <el-option label="门店" value="shopName"></el-option>
        <el-option label="电话" value="phone"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
    </el-input>
</div>
<!-- <el-input v-model="input" placeholder="输入宠主或门店"  style="width:300px;margin-right:10px"></el-input>
<el-button type="primary" @click="search" icon="el-icon-search">搜索</el-button> -->
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
     >
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
     >
      <template slot-scope="scope">
        <el-button @click="open(scope.row._id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页显示部分 -->
    <el-pagination
      @size-change="onClickEachpage"
      @current-change="onClickCurpage"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
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
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      type: "",
      text: ""
    };
  },
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
    //页面的渲染
    ...mapActions(["asyncGetEmpByPage", "asyncDeletData"]),
    // 分页功能方法的调用
    ...mapMutations(["setCurPage", "setEachPage"]),
    //翻页的方法
    // 当前页的条数
    onClickEachpage(val) {
      // console.log(val);
      this.setEachPage(val);
      this.asyncGetEmpByPage({ type: this.type, text: this.text });
    },
    //当前页val是分页element-ui里面自动触发时间的值
    onClickCurpage(val) {
      this.setCurPage(val);
      this.asyncGetEmpByPage({ type: this.type, text: this.text });
    },
    // 搜索按钮传入类型与输入框的值
    search() {
      this.setCurPage(1);
      this.asyncGetEmpByPage({ type: this.type, text: this.text });
    },
    // 删除的方法
    open(id) {
      this.$confirm("此操作将永久删除此订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确认过后调用删除数据的方法
          this.asyncDeletData(id);
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
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>