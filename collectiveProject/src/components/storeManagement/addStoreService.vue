<template>
    <div>
        <el-button @click="ifShopEmployee=true" type="primary">添加{{name}}<i class="el-icon-plus el-icon--right"></i></el-button>
        <el-dialog fullscreen :title="name" :visible.sync="ifShopEmployee" append-to-body>
            <el-table @selection-change="handleSelectionChange" ref="multipleTable" tooltip-effect="dark" highlight-current-row :data="rows" border class="table">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="serviceName" label="爱宠类型"></el-table-column>
                <el-table-column prop="serviceType" label="服务类型"></el-table-column>
                <el-table-column prop="serviceSchedule" label="服务时间"></el-table-column>
                <el-table-column prop="serviceCanFor" label="适用体型"></el-table-column>
                <el-table-column prop="serviceDetial" label="服务规格"></el-table-column>
                <el-table-column prop="serviceTime" label="耗费时长"></el-table-column>
                <el-table-column prop="serviceLevel" label="服务员等级"></el-table-column>
                <el-table-column prop="servicePrice" label="价格"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="curpage"
                :page-sizes="[2,5,10,20,30]"
                :page-size="eachpage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
            <el-button @click="ifShopEmployee = false">取 消</el-button>  
            <el-button @click="confirmBtn" type="primary">确认</el-button>   
        </el-dialog>      
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "service"
);
export default {
  name: "shopEmployee",
  data() {
    return {
      ifShopEmployee: false,
      multipleSelection:[]
    };
  },
  computed: {
    ...mapState(["curpage", "eachpage", "maxpage", "rows", "total"])
  },
  created() {
    this.asyncGetService();
  },
  props: {
    name: {
      default: ""
    },
    store: {
      default: []
    }
  },
  methods: {
      confirmBtn() {
      this.asyncUpdateService({multipleSelection:this.multipleSelection,storeId:this.store[0]._id});
      this.asyncGetService();
      this.$message({
        showClose: true,
        message: "修改成功！",
        type: "success"
      });
      this.ifShopEmployee = false;
    },
    ...mapMutations(["setEachpage"]),
    ...mapActions(["asyncGetService","asyncUpdateService", "asyncDeleteService", "updateBtn"]),

    handleSizeChange(val) {
      this.setEachpage(val);
      this.asyncGetService();
    },

    handleCurrentChange(val) {
      this.asyncGetService({ curpage: val });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style>
</style>