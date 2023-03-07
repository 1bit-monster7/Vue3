const dayjs = require('dayjs')

const filterTimes = (val, format = 'YYYY-MM-DD') => {
  if (!isNull(val)) {
    val = val * 1000
    return dayjs(val).format(format)
  } else {
    return '--'
  }
}

export const isNull = (val) => {
  const JSON_VALUE = JSON.stringify(val)
  if (!val || JSON_VALUE === '{}' || JSON_VALUE === '[]') return true
}

export default (app) => {
  app.config.globalProperties.$filters = {
    filterTimes
  }
}
