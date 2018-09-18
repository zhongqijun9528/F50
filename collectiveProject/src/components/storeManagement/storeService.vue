<template>
    <div style="display: inline-block">
            <el-button @click="ifShopEmployee=true" type="primary">{{name}}<i class="el-icon-view el-icon--right"></i></el-button>
            <el-dialog @open="asyncGetService" fullscreen :title="name" :visible.sync="ifShopEmployee" append-to-body>
                <addStoreService :name="name" :store="store" />
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
      curpage: 1,
      eachpage: 5,
      maxpage: 0,
      rows: [],
      total: 0
    };
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
      getStoreService(data){
          if(data){
             let {curpage,eachpage,maxpage,rows,total}=data;
             this.curpage=curpage;
             this.eachpage=eachpage;
             this.maxpage=maxpage;
             this.rows=rows;
             this.total=total;
          }
      },
    async asyncGetService({ curpage, eachpage } = {}) {
      let storeId=this.store[0]._id 
      const data = await fetch(
        `/services?page=${curpage || this.curpage}&rows=${eachpage ||
          this.eachpage}&storeId=${storeId ? storeId : ""}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      ).then(response => {
        return response.json();
      });
      this.getStoreService(data)
    },
  }
};
</script>

<style>
</style>