import { createI18n } from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh'
import esLocale from './es'
import jaLocale from './ja'

const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale
  },
  es: {
    ...esLocale
  },
  ja: {
    ...jaLocale
  }
}

const getCurrentLanguage = () => {
  // 从浏览器获取语言并设置对应语言
  // const UALang = navigator.language // zh-CN
  // const langCode = UALang.indexOf('zh') !== -1 ? 'en' : 'en'
  // localStorage.setItem('lang', langCode)
  // return langCode // 根据浏览器语言判断
  localStorage.getItem('lang') // 从缓存中取 没有则默认英文
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage() || 'en',
  messages
})

export default i18n
