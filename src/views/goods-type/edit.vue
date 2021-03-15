<template>
   <div class="app-container">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="类型名称" prop="title">
		  <el-input  v-model="ruleForm.title" ></el-input>
		</el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
  import { updateGoodsType, editGoodsType } from '@/api/goods-type'
  export default {
    data() {

      return {
        ruleForm: {
          id:'',
          title: '',
        },
        rules: {
          title: [
            { required: true, message: '请输入类型名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2到 10 个字符', trigger: 'blur' }
          ],

        }
      };
    },

    created() {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    },

    methods: {
      fetchData(id) {
        editGoodsType(id).then(response => {
          this.ruleForm.id = response.data.id;
          this.ruleForm.title = response.data.title;
        }).catch(err => {
          console.log(err)
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            updateGoodsType(this.ruleForm.id,this.ruleForm).then(response => {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
                    this.$router.go(-1);
              }
            );
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
