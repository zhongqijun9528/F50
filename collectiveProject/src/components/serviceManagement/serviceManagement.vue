<template>
    <el-card class="box-card">
       <div class="btns">
            <addService />
            <updateService :form="formData" />
            <el-button @click="deleteBtn" plain type="primary" icon="el-icon-delete">删除</el-button>
            <searchService />
        </div>
        <el-table @selection-change="handleSelectionChange" ref="multipleTable" tooltip-effect="dark" highlight-current-row :data="rows" border class="table">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="serviceName" label="爱宠名称"></el-table-column>
            <el-table-column prop="serviceType" label="服务类型"></el-table-column>
            <el-table-column prop="serviceSchedule" label="服务时间"></el-table-column>
            <el-table-column prop="serviceCanFor" label="适用体型"></el-table-column>
            <el-table-column prop="serviceDetial" label="服务规格"></el-table-column>
            <el-table-column prop="serviceTime" label="耗费时长"></el-table-column>
            <el-table-column prop="serviceLevel" label="服务员等级"></el-table-column>
            <el-table-column prop="servicePrice" label="价格"></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="curpage"
                :page-sizes="[5,10,20,30]"
                :page-size="eachpage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "service"
);

export default {
  name: "serviceList",
  data() {
    return {
      multipleSelection: [],
      formData: {}
    };
  },

  created() {
    this.asyncGetService();
  },

  computed: {
    ...mapState(["curpage", "eachpage", "maxpage", "rows", "total"])
  },

  methods: {
    ...mapActions(["asyncGetService", "asyncDeleteService", "updateBtn"]),

    handleSizeChange(val) {
      this.asyncGetService({ curpage: this.curpage, eachpage: val });
    },

    handleCurrentChange(val) {
      this.asyncGetService({ curpage: val });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.formData = val[0];
    },

    deleteBtn() {
      let ids = [];
      this.multipleSelection.forEach(item => {
        ids.push(item._id);
      });
      if (ids.length == 0) {
        this.$message("请至少选择一条服务！");
      } else {
        this.asyncDeleteService(ids);
        this.asyncGetService();
      }
    }
  }
};
</script>

<style scoped>
.btns {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
}

.table > el-table-column {
  width: 12.5%;
}
</style>