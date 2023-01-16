<template>
  <div>
    <el-row
      :gutter="20"
      type="flex"
      align="middle"
      justify="center"
      style="margin-top: 30px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="姓名:" prop="username">
          <el-input v-model="form.username" style="width: 300px" />
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" style="width: 300px" type="password" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="saveUserDetailById">更新</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
export default {
  name: 'HrsaasUser',
  data() {
    return {
      id: this.$route.params.id,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }

    }
  },
  created() {
    this.getUserDetailById()
  },
  mounted() {},
  methods: {
    async getUserDetailById() {
      const { data } = await getUserDetailById(this.id)
      this.form = data
    },
    async saveUserDetailById() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById({ ...this.form })
        this.$message.success('密码更新成功，请重新登录')
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.getUserDetailById()
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped></style>
