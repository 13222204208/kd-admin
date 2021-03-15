<template>
   <div class="app-container">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="物品类型" prop="title">
            <el-input v-model="ruleForm.title" placeholder="添加多个以逗号分隔, 例如 花生,大豆"></el-input>
          </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
  import { storeGoodsType } from '@/api/goods-type'
  export default {
    data() {

      return {
        ruleForm: {
          title: ''
        },
        rules: {
          title: [
            { required: true, message: '请输入类型名称', trigger: 'blur' },
            { min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur' }
          ],

        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm);
            storeGoodsType(this.ruleForm).then(response => {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
                this.$router.push({name:'GoodsTypeList'})
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
