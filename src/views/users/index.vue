<template>
  <el-form ref='queryForm' inline :model='queryParams'>
    <el-form-item prop='query' label='名称'>
      <el-input placeholder='请输入' v-model='queryParams.query' />
    </el-form-item>
    <el-form-item>
      <el-button type='primary' :icon='Search' @click='handleQuery'>搜索</el-button>
      <el-button type='primary' @click='resetQuery'>重置</el-button>
    </el-form-item>
  </el-form>
  <el-row style='margin-top: 10px'>
    <el-col :span='1.5'>
      <el-button @click='handleAdd' type='primary' :icon='Plus'>新增</el-button>
    </el-col>
  </el-row>
  <el-table :data='tableData' style='margin-top: 20px'>
    <el-table-column prop='username' label='名称' />
    <el-table-column prop='mobile' label='手机号' />
    <el-table-column prop='email' label='邮箱' />
    <el-table-column prop='mg_state' label='启用状态'>
      <template v-slot='{row}'>
        <el-switch @change='changeUserState(row)' v-model='row.mg_state' />
      </template>
    </el-table-column>
    <el-table-column prop='create_time' label='创建时间'>
      <template v-slot='{row}'>
        {{ $filters.filterTimes(row.create_time) }}
      </template>
    </el-table-column>
    <el-table-column width='300' label='操作' align='center' class-name='small-padding fixed-width'>
      <template #default='{row}'>
        <el-link :underline='false' type='info' :icon='View' @click='handleReadonly(row)'>查看</el-link>
        <el-link :underline='false' type='primary' @click='handleEdit(row)' :icon='Edit'>编辑</el-link>
        <el-link :underline='false' type='danger' :icon='Delete' @click='handleRemove(row)'>删除</el-link>
      </template>
    </el-table-column>
  </el-table>

  <Dialog :readonly='readonly' @getList='getList' v-model='dialogFormVisible' :rowForm='rowForm'
          v-model:title='title'></Dialog>

  <el-pagination
    style='margin-top: 20px'
    v-model:current-page='queryParams.pagenum'
    v-model:page-size='queryParams.pagesize'
    :page-sizes='[1, 10, 100, 1000]'
    @size-change='handleQuery'
    @current-change='getList'
    layout='-> ,total, sizes, prev, pager, next, jumper'
    :total='total'
  />
</template>

<script setup>
import { Search, Plus, Delete, Edit, View } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import { deleteUser, getUsersList, setUseState } from '@/api/users'
import { ElMessage, ElMessageBox } from 'element-plus'
import Dialog from './components/userDialog'

const queryParams = ref({
  pagesize: 10,
  pagenum: 1,
  query: null
})
const dialogFormVisible = ref(false)
const title = ref('')
const tableData = ref([])
const total = ref(0)
const queryForm = ref(null)
const readonly = ref(false)
let rowForm = reactive({})

const handleAdd = () => {
  readonly.value = false
  title.value = '新增用户'
  dialogFormVisible.value = true
}

const handleEdit = (row) => {
  readonly.value = false
  title.value = '修改用户'
  rowForm = reactive(JSON.parse(JSON.stringify(row)))
  dialogFormVisible.value = true
}

const handleReadonly = (row) => {
  title.value = '查看用户'
  readonly.value = true
  rowForm = reactive(JSON.parse(JSON.stringify(row)))
  dialogFormVisible.value = true
}

const handleRemove = (row) => {
  ElMessageBox.confirm(
    '确定要删除这个用户吗?',
    '标题',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    return deleteUser(row.id)
  }).then(() => getList())
}

const resetQuery = () => {
  queryParams.value = {
    pagesize: 10,
    pagenum: 1,
    query: null
  }
  handleQuery()
  queryForm.value.resetFields()
}

const getList = () => {
  return new Promise((resolve, reject) => {
    getUsersList(queryParams.value).then(r => {
      tableData.value = r.data.users
      total.value = r.data.total
    }).catch(err => {
      ElMessage.error('列表获取失败 ' + err) && reject(err)
    })
  })
}

const changeUserState = (row) => {
  setUseState(row.id, row.mg_state).then(r => {
    getList()
  })
}

// 重置页码并重新搜索
const handleQuery = () => {
  queryParams.value.pagenum = 1
  getList()
}

onMounted(() => {
  getList()
})

</script>

<style lang='scss' scoped>
</style>
