<template>
    <div style="margin-left:10px">
        <el-input placeholder="请输入内容" v-model="text" class="input-with-select">
            <el-select style="width:130px" v-model="type" slot="prepend" placeholder="请选择">
                <el-option label="爱宠类型" value="serviceName"></el-option>
                <el-option label="服务类型" value="serviceType"></el-option>
                <el-option label="服务员等级" value="serviceLevel"></el-option>
            </el-select>
            <el-button @click="searchBtn" slot="append" icon="el-icon-search"></el-button>
        </el-input>
</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "service"
);

export default {
  data() {
    return {
      type: "",
      text: ""
    };
  },

  computed: {
    ...mapState(["curpage", "eachpage", "maxpage", "rows", "total"])
  },

  methods: {
    ...mapActions(["asyncGetService"]),
    searchBtn() {
      console.log(this.curpage, this.eachpage);
      this.asyncGetService({ type: this.type, text: this.text });
    }
  }
};
</script>

<style scoped>
.input-with-select {
  width: 500px;
  background-color: #fff;
}
</style>


