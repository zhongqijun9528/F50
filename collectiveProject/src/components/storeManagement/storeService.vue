<template>
    <div style="display: inline-block">
            <el-button @click="ifShopEmployee=true" type="primary">{{name}}<i class="el-icon-view el-icon--right"></i></el-button>
            <el-dialog :title="name" :visible.sync="ifShopEmployee" append-to-body>
                <el-button  type="primary">添加{{name}}<i class="el-icon-plus el-icon--right"></i></el-button>
                <el-table :data="rows" border style="width: auto">
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
      ifShopEmployee: false
    };
  },
  props: {
    name: {
      default: ""
    },
    store:{
      default:[]
    }
  },
  computed: {
    ...mapState(["curpage", "eachpage", "maxpage", "rows", "total"])
  },
  created() {
    this.asyncGetService({storeId:this.store[0]._id});
  },
  methods: {
    ...mapMutations(["setEachpage"]),
    ...mapActions(["asyncGetService", "asyncDeleteService", "updateBtn"]),

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