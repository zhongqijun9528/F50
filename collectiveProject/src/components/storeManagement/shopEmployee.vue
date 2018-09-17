<template>
    <div>
        <el-button type="primary" @click="ifShopEmployee = true" icon="el-icon-edit" circle></el-button>
        <el-dialog title="店员" :visible.sync="ifShopEmployee" append-to-body>
            <el-form ref="form" label-width="80px" size="mini">
                <el-form-item size="large">
                    <el-button type="primary">添加店员<i class="el-icon-plus el-icon--right"></i></el-button>
                </el-form-item>
            </el-form>
        </el-dialog>      
    </div>
</template>
<script>
export default {
    data(){
        return {
            ifShopEmployee:false
        }
    }
}
</script>

<style>

</style>