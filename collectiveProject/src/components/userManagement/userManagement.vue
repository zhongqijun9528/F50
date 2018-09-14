<template>
<div>
    <el-row>
        <el-button>增加按钮</el-button>
        <el-input
            style="width:300px"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            >
        </el-input>
    </el-row>
    <el-table
    
    border
    style="width: 100%">
    <el-table-column
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      label="手机号"
      width="120">
    </el-table-column>
    <el-table-column
      label="邮箱"
      width="120">
    </el-table-column>
    <el-table-column
      label="登录名"
      width="120">
    </el-table-column>
    <el-table-column
      label="角色"
      width="120">
    </el-table-column>
    <el-table-column
      label="状态"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  
</script>