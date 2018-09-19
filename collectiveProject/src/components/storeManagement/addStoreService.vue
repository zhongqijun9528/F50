<template>
    <div>
        <el-button @click="lookService" type="primary">添加{{name}}<i class="el-icon-plus el-icon--right"></i></el-button>
        <el-dialog @open="asyncGetDataPage" @close="click" fullscreen :title="name" :visible.sync="ifService" append-to-body>
            <el-table @selection-change="handleSelectionChange" ref="multipleTable" tooltip-effect="dark" highlight-current-row :data="storeServices" border class="table">
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
            <el-button @click="ifService = false">取 消</el-button>  
            <el-button @click="confirmBtn" type="primary">确认</el-button>   
        </el-dialog> 
        <el-dialog @open="asyncGetDataPage" fullscreen :title="name" :visible.sync="ifGoods" append-to-body>
            <el-table @selection-change="handleSelectionChange" ref="multipleTable" tooltip-effect="dark" highlight-current-row :data="storeGoods" border class="table">
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="goodsName" label="名称"></el-table-column>
                <el-table-column prop="goodsType" label="品类"></el-table-column>
                <el-table-column prop="goodsTaste" label="口味"></el-table-column>
                <el-table-column prop="goodsRegion" label="产地"></el-table-column>
                <el-table-column prop="goodsSupplier" label="供应商"></el-table-column>
                <el-table-column prop="goodsPrice" label="价格"></el-table-column>
            </el-table>
            <el-button @click="ifGoods = false">取 消</el-button>  
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
      ifService: false,
      ifGoods: false,
      storeServices: [],
      storeGoods: [],
      multipleSelection: []
    };
  },
  computed: {
    ...mapState(["curpage", "eachpage", "maxpage", "rows", "total"])
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
    click() {
      this.$emit("click")
    },
    lookService() {
      if (this.name == "服务") {
        this.ifService = true;
      } else {
        this.ifGoods = true;
      }
    },
    shutService() {
      if (this.name == "服务") {
        this.ifService = false;
      } else {
        this.ifGoods = false;
      }
    },
    getStoreService({ storeServices, storeGoods } = {}) {
      this.storeServices = storeServices;
      this.storeGoods = storeGoods;
    },
    async confirmBtn() {
      const data = await fetch(`/stores/addData`, {
        method: "post",
        body: JSON.stringify({
          name:this.name,
          storeId:this.store[0]._id,
          arr:this.multipleSelection
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        return response.json();
      });
      this.$message({
        showClose: true,
        message: "添加成功",
        type: "success"
      });
      this.shutService()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async asyncGetDataPage() {
      const data = await fetch(`/stores/data`, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        return response.json();
      });
      console.log(data)
      this.getStoreService(data);
    }
  }
};
</script>

<style>
</style>