<template>
    <div>
        <el-button type="success" @click="ifElterStore=true" icon="el-icon-edit" circle></el-button>
        <el-dialog title="门店修改" :visible.sync="ifElterStore" append-to-body>
            <el-form ref="form" label-width="80px" size="mini">
                <el-form-item label="门店名字">
                    <el-input v-model="rows[index].shopName" style="width:300px" ></el-input>
                </el-form-item>
                <el-form-item label="定位">
                    <el-input v-model="rows[index].shopLocation" style="width:300px" ></el-input>
                </el-form-item>
                <el-form-item label="门店地址">
                    <el-input v-model="rows[index].shopAdd" style="width:300px" ></el-input>
                </el-form-item>
                <el-form-item label="法人代表">
                    <el-input v-model="rows[index].shopCorporate" style="width:300px" ></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="rows[index].shopTel" style="width:300px" ></el-input>
                </el-form-item>
                <el-form-item label="门店特色">
                    <el-input v-model="rows[index].shopFeature" style="width:300px" ></el-input>
                </el-form-item>
                <el-form-item label="门店照片">
                    <el-upload
                    class="avatar-uploader"
                    action="/stores/addImg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="rows[index].shopImg" :src="rows[index].shopImg" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item size="large">
                    <el-button  @click="elterStore" type="primary">确认修改</el-button>
                    <el-button  @click="ifElterStore = false">取消</el-button>
                </el-form-item>
                </el-form>
        </el-dialog>      
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "storeManagement"
);
export default {
  name: "elterStore",
  data() {
    return {
      ifElterStore: false
    };
  },
  computed: {
    ...mapState(["rows"])
  },
  props: {
    index: {
      default: {}
    }
  },
  methods: {
    async elterStore() {
      const data = await fetch(`/stores/elter`, {
        method: "post",
        body: JSON.stringify(this.rows[this.index]),
        headers: {
          "Content-type": "application/json"
        }
      }).then(response => {
        return response.json();
      });
      this.ifElterStore = false;
      this.$message({
        message: "数据修改成功！",
        type: "success"
      });
      this.asyncGetStores();
    },
    handleAvatarSuccess(res, file) {
      this.rows[this.index].shopImg = res.shopImg;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    ...mapActions(["asyncGetStores"])
  }
};
</script>

<style>
</style>