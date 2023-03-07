import { watch } from 'vue'

import store from '@/store'

export const watchLang = (...taskList) => {
  watch(
    () => store.getters.lang,
    () => {
      taskList.forEach((task) => task(store.getters.lang))
    },
    { deep: true }
  )
}
