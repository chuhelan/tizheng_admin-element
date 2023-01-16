<template>
  <div>
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
// import user from 'mock/user'
import { importEmployee } from '@/api/emploers'
export default {
  name: 'HrsaasIndex',

  data() {
    return {}
  },

  mounted() {},

  methods: {
    async success({ headers, results }) {
      const obj = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = results.map((item) => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          if (key === '入职日期' || key === '转正日期') {
            userInfo[obj[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            userInfo[obj[key]] = item[key]
          }
        })
        return userInfo
      })
      await importEmployee(arr)
      this.$router.back()
      this.$message.success('导入成功')
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style lang="scss" scoped></style>
