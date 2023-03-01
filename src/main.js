import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/permission'
import '@/styles/index.scss' // css reset
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue' // 引入所有图标，并命名为 Icons
const app = createApp(App).use(store).use(router)
// 通过遍历的方式注册所有 svg组件，会牺牲一点点性能
for (const i in Icons) {
  app.component(i, Icons[i])
}
app.mount('#app')
