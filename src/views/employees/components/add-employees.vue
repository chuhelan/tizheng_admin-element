<template>
  <div>
    <el-dialog title="新增员工" :visible="dialog" @close="btnCanel">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="姓名" prop="username">
          <el-input
            v-model="form.username"
            style="width: 65%"
            placeholder="请输入姓名"
          />
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input
            v-model="form.mobile"
            style="width: 65%"
            placeholder="请输入手机"
          />
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="form.timeOfEntry"
            type="date"
            placeholder="选择日期"
            style="width: 65%"
          />
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="form.formOfEmployment"
            placeholder="请选择活动区域"
            style="width: 65%"
          >
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            v-model="form.workNumber"
            placeholder="请输入工号"
            style="width: 65%"
          />
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input
            v-model="form.departmentName"
            v-loading="loading"
            placeholder="请选择部门"
            style="width: 65%"
            @focus="handleFocus"
          />
          <el-tree v-if="flag" :data="tableDate" :props="defaultProps" default-expand-all />
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="form.correctionTime"
            type="date"
            placeholder="转正时间"
            style="width: 65%"
          />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-row type="flex" justify="center" style="margin-right: 65px">
          <el-col :span="6">
            <el-button size="small">取消</el-button>
            <el-button type="primary" size="small">确定</el-button>
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getDepartment } from '@/api/department'
import transListToTreeData from '@/utils/transListToTreeData.js'

export default {
  name: 'HrsaasAddEmploers',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      defaultProps: {
        label: 'name'
      },
      tableDate: [],
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      flag: false

    }
  },
  mounted() {},
  methods: {
    async handleFocus() {
      this.loading = true
      const { data } = await getDepartment()
      this.tableDate = transListToTreeData(data.depts, '')
      this.flag = true
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
