<template>
    <div>
        <el-button type="primary" @click="ifShopEmployee=true" icon="el-icon-view" circle></el-button>
        <el-dialog title="店员" :visible.sync="ifShopEmployee" append-to-body>
            <el-table
            :data="_props.tableData[0].shopEmployee"
            style="width: 1000">
            <el-table-column
                prop="empName"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="empLevel"
                label="职位"
                width="180">
            </el-table-column>
            <el-table-column
                prop="empPhone"
                label="联系电话"
                width="180">
            </el-table-column>
            </el-table>
        </el-dialog>      
    </div>
</template>
<script>
export default {
  name: "shopEmployee",
  data() {
    return {
      ifShopEmployee: false
    };
  },
  props: {
    tableData: {
      default: []
    }
  }
};
</script>

<style>
</style>