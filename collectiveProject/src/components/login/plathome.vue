<template>
<div>
    <el-container>
        <el-header>爱宠帮后台管理系统</el-header>
        
            <el-menu router 
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b" >
                <el-menu-item index="userManagement">用户管理</el-menu-item>
                <el-menu-item index="mains">商品管理</el-menu-item>
                <el-menu-item index="shopping">门店管理</el-menu-item>
                <el-menu-item index="shopping">订单管理</el-menu-item>
                <el-menu-item index="shopping">服务管理</el-menu-item>
                <el-menu-item index="shopping">宠主管理</el-menu-item>
            </el-menu>
    </el-container>
    <router-view/>
</div>
</template>

<script>
export default {
      name:"plathome",
   
  }
</script>

<style scoped>
.el-header{
  background-color: #42BD56;
  color: #333;
  text-align: center;
  line-height: 60px;
  font-size: 25px;
}

.el-aside {
  background-color: #d5e6d3;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}




</style>