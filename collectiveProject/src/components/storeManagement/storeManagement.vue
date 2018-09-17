<template>
<div>
    <storeHead />
    <el-table :data="rows" style="width: auto">
      <el-table-column prop="shopName" label="店名" width="180"></el-table-column>
      <el-table-column prop="shopCorporate" label="法人代表" width="180"></el-table-column>
      <el-table-column prop="shopTel" label="联系电话" width="180"></el-table-column>
      <el-table-column prop="shopAdd" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
            <el-row>
            <!-- 点击弹出门店详情 -->
            <el-button type="success" row-key  @click="storeDetails(scope.$index, scope.row)"  icon="el-icon-check" circle></el-button>
            <el-button type="danger" @click="remove(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
            </el-row>
        </template>
      </el-table-column>
    </el-table>
<!-- 门店的详情 -->
<el-dialog fullscreen title="门店详情" :visible.sync="IsStoreDetails">
  <el-button  type="primary">添加服务<i class="el-icon-plus el-icon--right"></i></el-button>
  <el-button  type="primary">添加商品<i class="el-icon-plus el-icon--right"></i></el-button>
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
            <shopEmployee  />
            </el-row>
      </template>
    </el-table-column>
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
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeManagement"
);
export default {
  data(){
    return {
        IsStoreDetails: false,
        store:[]
    }
  },
  created() {
    this.asyncGetStores();
  },
  computed:{
    ...mapState(["rows"])
  },
  methods: {
    remove(index,row) {
      this.$confirm("确认是否删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "是",
        cancelButtonText: "否"
      })
        .then(() => {
          this.removeiStores(row._id)
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
    ...mapActions(["asyncGetStores","removeiStores"]),
    storeDetails(index, row){
      this.store=[]
      this.store.push(this.rows[index]);
      this.IsStoreDetails=true
    }
  }
};
</script>

<style>
</style>