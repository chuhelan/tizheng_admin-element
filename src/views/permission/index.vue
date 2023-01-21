<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools class="pageTools">
        <template #after>
          <el-button
            type="primary"
            size="mini"
            @click="submit(1, '0')"
          >添加权限</el-button>
        </template>
      </PageTools>
      <el-table
        :data="tableData"
        border
        default-expand-all
        row-key="id"
        :tree-props="{ children: 'children', type: type === 1 }"
      >
        <el-table-column align="center" label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template slot-scope="{ row }">
            <el-button
              v-if="row.type === 1"
              type="text"
              @click="submit(2, row.id)"
            >添加</el-button>
            <el-button type="text" @click="edit(row.id)">编辑</el-button>
            <el-button type="text" @click="btnDel(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :title="form.id ? '编辑' : '新增'"
        :visible.sync="showDiaLog"
        width="40%"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
          :inline="false"
          size="normal"
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="标识" prop="code">
            <el-input v-model="form.code" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item label="开启">
            <el-tooltip placement="top">
              <el-switch
                v-model="form.enVisible"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
              />
            </el-tooltip>
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button @click="btnCal">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getPermission,
  addPermission,
  delPermission,
  getPermissionDetail,
  updatePermission
} from '@/api/permission'
import transListToTreeData from '@/utils/transListToTreeData'
export default {
  data() {
    let flag = null
    const validateName = async(rule, value, callback) => {
      // if (this.type === 1) {
      //   const { data } = await getPermission()
      //   data.forEach((element) => {
      //     element.id = '0'
      //   })
      //   this.arr = data
      //   console.log(data)
      // } else {
      //   const { data } = await getPermission()
      //   this.arr = data
      // }
      const { data } = await getPermission()
      if (this.form.id) {
        flag = data
          .filter(
            (item) => this.list.id === item.pid && this.list.id !== item.id
          )
          .some((element) => element.name === value)
      } else {
        flag = data
          .filter((item) => {
            return this.list.id === item.pid
          })
          .some((element) => element.name === value)
      }

      flag
        ? callback(new Error(`同级权限下已经有${value}的权限了`))
        : callback()
    }
    const validateCode = async(rule, value, callback) => {
      const { data } = await getPermission()
      this.list = data
      if (this.form.id) {
        flag = data
          .filter((item) => item.code !== this.list.code)
          .some((item) => item.code === value)
      } else {
        flag = this.list.some((item) => item.code === value)
      }
      flag
        ? callback(new Error(`同级权限下已经有${value}的编码了`))
        : callback()
    }
    return {
      tableData: [],
      list: [],
      arr: [],
      showDiaLog: false,
      form: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: 1, // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      type: '',
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initGetPermission()
  },
  methods: {
    async initGetPermission() {
      const { data } = await getPermission()
      this.tableData = transListToTreeData(data, '0')
    },
    btnCal() {
      this.form = {}
      this.showDiaLog = false
      this.$refs.form.resetFields()
    },
    async btnDel(id) {
      try {
        await delPermission(id)
        this.$message.success('删除成功')
        this.initGetPermission()
      } catch (error) {
        console.log(error)
      }
    },
    async submit(type, pid) {
      this.showDiaLog = true
      this.form.type = type
      this.form.pid = pid
      try {
        const { data } = await getPermissionDetail(pid)
        this.list = data
      } catch (error) {
        console.log(error)
      }
    },
    async edit(id) {
      this.showDiaLog = true
      const { data } = await getPermissionDetail(id)
      this.form = data
      this.list = data
    },
    async confirm() {
      await this.$refs.form.validate()
      try {
        if (this.form.id) {
          await updatePermission({ ...this.form })
        } else {
          await addPermission(this.form)
        }
        this.$message.success('新增成功')
        this.initGetPermission()
        this.btnCal()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style>
.pageTools {
  height: 78px !important;
}
</style>
