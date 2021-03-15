<template>
 <div class="app-container">
      <div class="filter-container">
         <el-input v-model="listQuery.order_num" placeholder="订单号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
         <el-button v-waves class="filter-item" type="primary" style="margin-left: 10px;" icon="el-icon-search" @click="handleFilter">
           搜索
         </el-button>


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
     <el-table-column label="订单号" align="center"  width="180">
       <template slot-scope="{row}">
         <span>{{ row.order_num}}</span>
       </template>
     </el-table-column>
     <el-table-column label="备注" align="center"  width="150">
       <template slot-scope="{row}">
         <span>{{ row.comment}}</span>
       </template>
     </el-table-column>
     <el-table-column label="后台回复内容" align="center"  width="150">
       <template slot-scope="{row}">
         <span>{{ row.reply}}</span>
       </template>
     </el-table-column>
     <el-table-column label="物品类型" align="center"  width="150">
       <template slot-scope="{row}">
         <span>{{ row.goods_name}}</span>
       </template>
     </el-table-column>
     <el-table-column label="劳务费" align="center"  width="100">
       <template slot-scope="{row}">
         <span>{{ row.cost +'元'}}</span>
       </template>
     </el-table-column>
     <el-table-column label="是否付款" class-name="status-col" width="100">
       <template slot-scope="{row}">
         <el-tag  >
           {{ row.status == 1 ? '未付款':'已付款' }}
         </el-tag>
       </template>
     </el-table-column>
     <el-table-column label="发货人" align="center"  width="120">
       <template slot-scope="{row}">
         <span>{{ row.send_name}}</span>
       </template>
     </el-table-column>
     <el-table-column label="发货人联系方式" align="center"  width="150">
       <template slot-scope="{row}">
         <span>{{ row.send_phone}}</span>
       </template>
     </el-table-column>
     <el-table-column label="发货人地址" align="center"  width="200">
       <template slot-scope="{row}">
         <span>{{ row.send_address}}</span>
       </template>
     </el-table-column>
     <el-table-column label="发货人详细地址" align="center"  width="200">
       <template slot-scope="{row}">
         <span>{{ row.send_detailed_address}}</span>
       </template>
     </el-table-column>

     <el-table-column label="收货人" align="center"  width="150">
       <template slot-scope="{row}">
         <span>{{ row.get_name}}</span>
       </template>
     </el-table-column>
     <el-table-column label="收货人联系方式" align="center"  width="150">
       <template slot-scope="{row}">
         <span>{{ row.get_phone}}</span>
       </template>
     </el-table-column>
     <el-table-column label="收货人地址" align="center"  width="200">
       <template slot-scope="{row}">
         <span>{{ row.get_address}}</span>
       </template>
     </el-table-column>
     <el-table-column label="收货人详细地址" align="center"  width="200">
       <template slot-scope="{row}">
         <span>{{ row.get_detailed_address}}</span>
       </template>
     </el-table-column>
     <el-table-column label="提交用户" align="center"  width="150">
       <template slot-scope="{row}">
         <span>{{ row.user_info.phone}}</span>
       </template>
     </el-table-column>


     <el-table-column label="创建时间" align="center"  width="180">
       <template slot-scope="{row}">
         <span>{{ row.created_at }}</span>
       </template>
     </el-table-column>

    <el-table-column
      fixed="right"
      align="center"
      label="操作"
      width="280">
      <template slot-scope="{row,$index}">
        <router-link :to="'/order/edit/'+row.id">
          <el-button type="primary" size="mini" style="margin-right: 10px;">
            回复订单
          </el-button>
        </router-link>
          <el-button v-if="row.status ==1" size="mini" @click="handleOrderStatus(row,'2')">
            点击付款
          </el-button>
          <el-button v-if="row.status ==2" size="mini" @click="handleOrderStatus(row,'1')">
            取消付款
          </el-button>

        <el-button v-if="row.status!='deleted'"  size="mini" type="danger" @click="handleDelete(row,$index)">
          删除
        </el-button>

      </template>
    </el-table-column>
   </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
</div>
</template>

<script>
   import { orderList , delOrder,updateOrder, changeOrder } from '@/api/order'
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
          order_num: undefined,
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
        console.log(this.listQuery);
        orderList(this.listQuery).then(response => { console.log(response);
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


      handleOrderStatus(row, status) {

        changeOrder(row.id,row).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.status = row.status==1?2:1
        })
      },

      handleDelete(index, row) {

        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delOrder(index.id).then(response => {
          this.$notify({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.tableData.splice(row, 1)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    }
  }
</script>
