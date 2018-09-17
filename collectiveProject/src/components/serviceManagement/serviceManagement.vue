<template>
    <el-card class="box-card">
       <div class="btns">
            <addService />
            <!-- <el-button @click="dialogFormVisible = true" plain type="primary" icon="el-icon-plus">新增</el-button> -->
            <el-button plain type="primary" icon="el-icon-edit">修改</el-button>
            <el-button plain type="primary" icon="el-icon-delete">删除</el-button>
            <el-button plain type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <el-table :data="rows" border class="table">
            <el-table-column prop="serviceName" label="名称"></el-table-column>
            <el-table-column prop="serviceType" label="服务类别"></el-table-column>
            <el-table-column prop="serviceSchedule" label="排期"></el-table-column>
            <el-table-column prop="serviceCanFor" label="适用规格"></el-table-column>
            <el-table-column prop="serviceDetial" label="服务规格"></el-table-column>
            <el-table-column prop="serviceTime" label="耗时"></el-table-column>
            <el-table-column prop="serviceLevel" label="服务员等级"></el-table-column>
            <el-table-column prop="servicePrice" label="价格"></el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
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
  created() {
    this.asyncGetService();
  },
  computed: {
    ...mapState(["curpage", "eachpage", "maxpage", "rows", "total"])
  },
  methods: {
    ...mapActions(["asyncGetService"])
  }
};
</script>

<style scoped>
.btns {
  display: flex;
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