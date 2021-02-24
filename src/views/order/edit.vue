<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">



    <el-form-item label="订单备注" prop="comment">
      <el-input type="textarea" v-model="form.comment" :disabled="true" style="width: 35rem;"></el-input>
    </el-form-item>

    <el-form-item label="回复内容" prop="reply">
      <el-input type="textarea" v-model="form.reply" style="width: 35rem;"></el-input>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">提交回复</el-button>
<!--     <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
    <!-- 编辑器 -->

  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
import { editOrder, updateOrder } from '@/api/order'

export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入标名称'))
      } else {
        callback()
      }
    }
    return {
      editor:null,//编辑器实例
      form:{
        id:'',
        comment:'',
        reply:'',
      },
        rules: {
          reply: [
            { required:true,validator: validateTitle, trigger: 'blur' }
          ],
        },
      option:[],
      imgFilesList:[],
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },

  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },


  methods: {

    fetchData(id) {
      editOrder(id).then(response => {
        this.form.comment= response.data.comment;
        this.form.id = response.data.id;
        this.form.reply = response.data.reply;
      }).catch(err => {
        console.log(err)
      })
    },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) { console.log(file.url)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUpSuccess(response){

          if(response.uploaded == true){
            this.form.icon = response.url;
            console.log(this.form.icon);
          }
      },


    onSubmit(){

      updateOrder(this.form.id,this.form).then(response => {
          this.$message({
            message: '回复成功',
            type: 'success'
          })
          this.$router.push({name:'OrderList'})
        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
