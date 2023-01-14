<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="form.id?'编辑部门':'新增部门'"
      width="30%"
      size="medium"
      custom-class="saveAsDialog"
    >
      <el-form ref="form" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            v-model="form.manager"
            placeholder="请选择"
            style="width: 90%"
            @focus="changeSelector"
          >
            <el-option
              v-for="item in people"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="desc">
          <el-input v-model="form.desc" type="textarea" style="width: 90%" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button @click="handleCandle">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDepartment, addDepartment, detailDepartment, editDepartments } from '@/api/department'
import { getManager } from '@/api/emploers'
export default {
  name: 'HrsaasTreeDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let flag = null
    var validateName = async(rule, value, callback) => {
      const { data } = await getDepartment()
      if (this.form.id) {
        flag = data.depts.filter((item) => item.pid === this.form.pid && item.id !== this.form.id).some(item => item.name === value)
      } else {
        flag = data.depts
          .filter((item) => item.pid === this.list.id)
          .some((item) => item.name === value)
      }
      flag
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback()
    }
    var validateCode = async(rule, value, callback) => {
      const { data } = await getDepartment()
      if (this.form.id) {
        flag = data.depts.filter(item => item.id !== this.form.id).some((item) => item.code === value)
      } else {
        flag = data.depts.some((item) => item.code === value)
      }

      flag
        ? callback(new Error(`同级部门下已经有${value}的编码了`))
        : callback()
    }
    return {
      form: {
        name: '',
        code: '',
        manager: '',
        desc: ''
      },
      people: [],
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '请选择负责人', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入部门描述', trigger: 'blur' }]
      }
    }
  },
  mounted() {},
  methods: {
    async changeSelector() {
      const { data } = await getManager()
      this.people = data
    },

    async detailDepartment(id) {
      const { data } = await detailDepartment(id)
      this.form = data
    },

    handleCandle() {
      this.$emit('update:dialogVisible', false)
      this.form = {}
      this.$refs.form.resetFields()
    },
    confirm() {
      this.$refs.form.validate(async(ok) => {
        if (ok) {
          if (this.form.id) {
            await editDepartments(this.form)
          } else {
            await addDepartment({ ...this.form, pid: this.list.id })
          }
          this.$emit('initGetDepartment')
          this.handleCandle()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
