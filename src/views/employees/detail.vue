<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登陆账户设置" name="first">
          <component :is="currentView" />
        </el-tab-pane>
        <el-tab-pane label="个人详情" name="second">
          <component :is="personal" />
        </el-tab-pane>
        <el-tab-pane label="岗位信息" name="third">
          <component :is="job" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import User from '@/views/employees/components/User'
import personalDetail from '@/views/employees/components/personalDetail'
import JobCompoents from '@/views/employees/components/jobCompoents'
export default {
  name: 'HrsaasDetail',
  components: {
    User
  },
  data() {
    return {
      activeName: 'first',
      form: {
        username: '',
        password: ''
      },
      rules: {},
      currentView: User,
      personal: personalDetail,
      job: JobCompoents
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped></style>
