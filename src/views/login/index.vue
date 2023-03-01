<template>
  <div class='login-container'>
    <div class='container'>
      <div class='login-wrapper'>
        <div class='header'>Login</div>
        <div class='form-wrapper'>
          <el-form ref='loginFormRef' :rules='rules' :model='form'>
            <el-form-item prop='username'>
              <el-input
                class='input-item'
                :prefix-icon='UserFilled'
                placeholder='user'
                v-model='form.username' />
            </el-form-item>
            <el-form-item prop='password'>
              <el-input
                type='password'
                placeholder='password'
                :prefix-icon='Edit'
                show-password
                class='input-item'
                v-model='form.password' />
            </el-form-item>
          </el-form>
          <el-button id='login' class='btn' @click='handlerLogin'>Login</el-button>
        </div>
        <div class='msg'>
          Don't have account? <a href=''>Sing up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserFilled, Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'

const store = useStore()
const loginFormRef = ref(null)

const form = ref({
  username: 'admin',
  password: '123456'
})

const rules = ref({
  username: [
    {
      required: true,
      message: 'Please input user',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Please input password',
      trigger: 'blur'
    }
  ]
})

const handlerLogin = () => {
  loginFormRef.value.validate(valid => {
    if (valid) {
      store.dispatch('app/login', form.value)
    }
  })
}

</script>

<style lang='scss' scoped>
.login-container {
  width: 100%;
  height: 100%;

  ::v-deep(.el-form-item) {
    margin-bottom: 20px;
  }
}

.container {
  height: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}

.login-wrapper {
  background-color: #fff;
  width: 250px;
  height: 500px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  border-radius: 15px;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login-wrapper .header {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}

.login-wrapper .form-wrapper .input-item::placeholder {
  text-transform: uppercase;
}

.login-wrapper .form-wrapper .btn {
  cursor: pointer;
  text-align: center;
  width: 100%;
  padding: 5px;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);;
  color: #fff;
  border-radius: 3px;
}

.login-wrapper .msg {
  text-align: center;
  line-height: 80px;
}

.login-wrapper .msg a {
  text-decoration-line: none;
  color: #a6c1ee;
}
</style>
