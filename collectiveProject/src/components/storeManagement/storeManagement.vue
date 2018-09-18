<template>
<div>
    <storeHead />
    <el-table :data="rows" border style="width: auto">
      <el-table-column prop="shopName" label="店名" width="180"></el-table-column>
      <el-table-column prop="shopCorporate" label="法人代表" width="180"></el-table-column>
      <el-table-column prop="shopTel" label="联系电话" width="180"></el-table-column>
      <el-table-column prop="shopAdd" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-row>
            <!-- 点击弹出门店详情 -->
            <el-button type="text" size="small" @click="storeDetails(scope.$index, scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="remove(scope.$index, scope.row)">删除</el-button>
            </el-row>
        </template>
      </el-table-column>
    </el-table>
<!-- 门店的详情 -->
<el-dialog fullscreen title="门店详情" :visible.sync="IsStoreDetails">
  <storeService :store="store" name="商品"/>
  <storeService :store="store" name="服务"/>
  <el-table :data="store" border>
    <el-table-column prop="shopName" label="店名"></el-table-column>
    <el-table-column prop="_id" label="营业执照号" width="180"></el-table-column>
    <el-table-column prop="shopCorporate" label="法人代表" width="100"></el-table-column>
    <el-table-column prop="shopFeature" label="特色" width="180"></el-table-column>
    <el-table-column prop="shopLocation" label="定位"></el-table-column>
    <el-table-column prop="shopAdd" label="地址" width="300"></el-table-column>
    <el-table-column prop="shopTel" label="联系电话" width="180"></el-table-column>
    <el-table-column label="店员" width="180">
      <template slot-scope="scope">
            <el-row>
              <!-- 查看店员 -->
            <shopEmployee :tableData="store" />
            </el-row>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-row>
              <!-- 修改门店信息 -->
              <elterStore  :index="index"/>
            </el-row>
        </template>
      </el-table-column>
  </el-table>
</el-dialog>
<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  style="width:800px;margin: auto;"
  background
  :current-page="curpage"
  :page-sizes="[5, 10, 15, 20]"
  :page-size="eachpage"
  layout="total, sizes, prev, pager, next, jumper"
  :total="total">
</el-pagination>
</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeManagement"
);
export default {
  name: "storeManagement",
  data() {
    return {
      IsStoreDetails: false,
      store: [],
      index: ""
    };
  },
  created() {
    this.asyncGetStores();
  },
  computed: {
    ...mapState(["curpage", "eachpage", "rows", "maxpage", "total"])
  },
  methods: {
    remove(index, row) {
      this.$confirm("确认是否删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "是",
        cancelButtonText: "否"
      })
        .then(() => {
          this.removeiStores(row._id);
          this.asyncGetStores();
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
    },
    ...mapMutations(["setCurPage", "setEachPage"]),
    handleSizeChange(val) {
      this.setEachPage(val)
      this.asyncGetStores();
    },
    handleCurrentChange(val) {
      this.asyncGetStores({ curpage: val });
    },
    ...mapActions(["asyncGetStores","removeiStores"]),
    storeDetails(index, row) {
      this.store = [];
      this.store.push(this.rows[index]);
      this.index = index;
      this.IsStoreDetails = true;
    }
  }
};
</script>

<style>
</style>