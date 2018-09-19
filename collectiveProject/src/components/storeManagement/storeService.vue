<template>
    <div style="display: inline-block">
            <el-button @click="lookService" type="primary">{{name}}<i class="el-icon-view el-icon--right"></i></el-button>
            <el-dialog @open="asyncGetDataPage" fullscreen :title="name" :visible.sync="ifService" append-to-body>
                <addStoreService :name="name" @click="asyncGetDataPage" :store="store" />
                <el-table :data="storeServices" border style="width: auto">
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
            <el-dialog @open="asyncGetDataPage" fullscreen :title="name" :visible.sync="ifGoods" append-to-body>
                <addStoreService :name="name" :store="store" @click="asyncGetDataPage" />
                <el-table :data="storeGoods" border style="width: auto">
                    <el-table-column prop="goodsName" label="名称"></el-table-column>
                    <el-table-column prop="goodsType" label="品类"></el-table-column>
                    <el-table-column prop="goodsTaste" label="口味"></el-table-column>
                    <el-table-column prop="goodsRegion" label="产地"></el-table-column>
                    <el-table-column prop="goodsSupplier" label="供应商"></el-table-column>
                    <el-table-column prop="goodsPrice" label="价格"></el-table-column>
                </el-table>
            </el-dialog>     
    </div>
</template>
<script>
export default {
  name: "shopEmployee",
  data() {
    return {
      ifService: false,
      ifGoods: false,
      storeServices: [],
      storeGoods: []
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
    lookService() {
      if (this.name == "服务") {
        this.ifService = true;
      } else {
        this.ifGoods = true;
      }
    },
    getStoreService({ storeServices, storeGoods } = {}) {
      this.storeServices = storeServices;
      this.storeGoods = storeGoods;
    },
    async asyncGetDataPage() {
      let storeId = this.store[0]._id;
      const data = await fetch(`/stores/${storeId}`, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        return response.json();
      });
      this.getStoreService(data);
    }
  }
};
</script>

<style>
</style>