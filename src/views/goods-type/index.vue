<template>
 <div class="app-container">
      <div class="filter-container">
         <router-link :to="{name:'CreateGoodsType'}">
          <el-button type="primary"  style="margin-left: 10px;"  plain>添加物品类型</el-button>
          </router-link>

      </div>
      <br>
   <el-table
     :key="tableKey"
    :data="tableData"
    v-loading="listLoading"
     border
     fit
     highlight-current-row
     style="width: 100%;"
   >
     <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" >
       <template slot-scope="{row}">
         <span>{{ row.id }}</span>
       </template>
     </el-table-column>

     <el-table-column label="物品类型名称" align="center">
       <template slot-scope="{row}">
         <span>{{ row.title}}</span>
       </template>
     </el-table-column>
     <el-table-column label="创建时间" align="center">
       <template slot-scope="{row}">
         <span>{{ row.created_at }}</span>
       </template>
     </el-table-column>
     <el-table-column label="更新时间" align="center">
       <template slot-scope="{row}">
         <span>{{ row.updated_at }}</span>
       </template>
     </el-table-column>
     <el-table-column label="状态"  align="center" class-name="status-col" width="100">
       <template slot-scope="{row}">
         <el-tag  >
           {{ row.status == 1 ? '正常':'已禁用' }}
         </el-tag>
       </template>
     </el-table-column>
    <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="180">
      <template slot-scope="{row,$index}">
        <router-link :to="'/goods-type/edit/'+row.id">
          <el-button type="primary" size="mini" style="margin-right: 10px;">
            编辑
          </el-button>
        </router-link>
          <el-button v-if="row.status ==1" size="mini" @click="handleModifyStatus(row,'0')">
            点击禁用
          </el-button>
          <el-button v-if="row.status ==0" size="mini" @click="handleModifyStatus(row,'1')">
            恢复正常
          </el-button>

      </template>
    </el-table-column>
   </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
</div>
</template>

<script>
   import { goodsTypeList, changeGoodsType } from '@/api/goods-type'
   import waves from '@/directive/waves' // waves directive
   import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  export default {
    components: { Pagination },
     directives: { waves },
    data() {
      return {
        tableKey: 0,
        tableData:null,
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          username: undefined,
        },
        temp: {
          id: undefined,
          name: '',
        },
        dialogPvVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        pvData: [],
        textMap: {
          update: '编辑',
          create: 'Create'
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true

        goodsTypeList(this.listQuery).then(response => {
          this.tableData = response.data.item;
          this.total = response.data.total;

          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },

      handleModifyStatus(row, status) {
        this.listLoading = true
        changeGoodsType(row.id,row).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.status = row.status==1?0:1
          this.listLoading = false
        })
      },

    }
  }
</script>
