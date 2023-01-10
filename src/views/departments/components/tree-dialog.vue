<template>
  <div>
    <el-dialog
      title="新增部门"
      :visible="dialogVisible"
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
            style="width: 90%"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="部门介绍" prop="desc">
          <el-input v-model="form.desc" type="textarea" style="width: 90%" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-row type="flex" justify="center">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
export default {
  name: 'HrsaasTreeDialog',
  props: {
    dialogVisible: {
      type: Boolean
    },
    list: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    var validateName = async(rule, value, callback) => {
      const { data } = await getDepartment()
      const flag = data.depts.filter(item => item.pid === this.list.id).some(item => item.name === value)
      flag ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    var validateCode = async(rule, value, callback) => {
      const { data } = await getDepartment()
      const flag = data.depts.some(item => item.code === value)
      flag ? callback(new Error(`同级部门下已经有${value}的编码了`)) : callback()
    }
    return {
      form: {
        name: '',
        code: '',
        manager: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请选择负责人', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入部门描述', trigger: 'blur' }
        ]
      }
    }
  },

  mounted() {},

  methods: {
    confirm() {
      this.$refs.form.validate((ok) => {
        if (ok) {
          this.$emit('addDepartment', this.form)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
