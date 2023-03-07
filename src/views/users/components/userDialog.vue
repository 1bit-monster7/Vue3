<template>
  <el-dialog :close-on-click-modal='false' :show-close='!loading' @closed='cancel' :before-close='cancel'
             :modelValue='dialogFormVisible'
             :title='title'>
    <el-form :disabled='readonly' ref='ruleForm' label-width='68px' :rules='rules' :model='form'>
      <el-form-item prop='username' label='用户名' v-if='title === "新增用户" || readonly '>
        <el-input v-model='form.username' />
      </el-form-item>
      <el-form-item prop='password' label='密码' v-if='title === "新增用户" '>
        <el-input v-model='form.password' />
      </el-form-item>
      <el-form-item prop='email' label='邮箱'>
        <el-input v-model='form.email' />
      </el-form-item>
      <el-form-item prop='mobile' label='手机'>
        <el-input v-model='form.mobile' />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class='dialog-footer'>
        <el-button v-if='!loading' @click='cancel'>取消</el-button>
        <el-button v-if='!readonly' :loading='loading' type='primary' @click='handlerSubmit'>
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { addUser, updateUser } from '@/api/users'
import { isNull } from '@/utils/filters'

const props = defineProps({
  dialogFormVisible: Boolean,
  title: String,
  readonly: Boolean,
  rowForm: Object
})

const emits = defineEmits(['update:modelValue', 'update:title', 'getList'])

const initForm = () => {
  return {
    username: null,
    password: null,
    email: null,
    phone: null
  }
}
const loading = ref(false)

const ruleForm = ref(null)

let form = reactive(initForm())

const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ]
})

watch(() => props.rowForm, (nv, ov) => {
  if (!isNull(nv)) {
    form = nv // 从父组件传递下来赋值给form
  }
}, {
  deep: true,
  immediate: true
})

const cancel = () => {
  form = reactive(initForm()) // 好像不手动重置 直接下面这样也行
  ruleForm.value.resetFields()
  emits('update:modelValue', false)
}

const handlerSubmit = () => {
  ruleForm.value.validate().then(() => {
    loading.value = true
    return form.id ? updateUser(form) : addUser(form)
  }).then(() => {
    cancel()
    emits('getList') // 触发父组件刷新列表
  }).finally(() => {
    loading.value = false
  })
}

</script>

<style scoped>

</style>
