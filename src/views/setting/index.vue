<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button
              style="margin-bottom: 20px"
              icon="el-icon-plus"
              type="primary"
              size="small"
              @click="addRole"
            >新增角色</el-button>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="100"
              />
              <el-table-column
                align="center"
                prop="name"
                label="角色名称"
                width="180"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignPermissions(row.id)"
                  >分配权限</el-button>
                  <el-button
                    size="small"
                    type="primary"
                    @click="edit(row.id)"
                  >编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click="delCompany(row.id)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row type="flex" justify="center" align="middle">
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                :current-page.sync="pageList.page"
                :page-size="pageList.pageSize"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-form ref="form" :model="form" label-width="120px">
              <el-alert
                title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
                type="info"
                effect="light"
                show-icon
                :closable="false"
              />
              <el-form-item label="公司名称" style="margin-top: 40px">
                <el-input v-model="form.name" disabled style="width: 400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  v-model="form.companyAddress"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  v-model="form.mailbox"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="form.remarks"
                  type="textarea"
                  disabled
                  style="width: 400px"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- card body -->
      </el-card>
      <el-dialog
        title="编辑员工"
        :visible="dialog"
        width="40%"
        @close="btnCancel"
      >
        <el-form
          ref="formDate"
          :model="formDate"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formDate.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="formDate.description" />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="8">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button
              size="small"
              type="primary"
              @click="btnOK"
            >确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog
        title="分配权限"
        :visible.sync="isShow"
        width="30%"
        @close="btnPermissionsCal"
      >
        <el-tree
          ref="tree"
          :data="list"
          :props="defaultProps"
          show-checkbox
          default-expand-all
          :check-strictly="true"
          node-key="id"
          :default-checked-keys="permissionId"
          @close="btnPermissionsCal"
        />
        <span slot="footer">
          <el-row :span="6" type="flex" justify="center">
            <el-button @click="btnPermissionsCal">取消</el-button>
            <el-button
              type="primary"
              @click="btnPermissionsSubmit"
            >确认</el-button>
          </el-row>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  getRole,
  getCompanyList,
  delCompany,
  getRoleDetail,
  updateRoleDetail,
  addRole
} from '@/api/setting'
import { assignPrem } from '@/api/setting'
import { getPermission } from '@/api/permission'
import transListToTreeData from '@/utils/transListToTreeData'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      activeName: 'first',
      form: {},
      list: [],
      pageList: {
        page: 1,
        pageSize: 10
      },
      dialog: false,
      isShow: false,
      tableData: [],
      total: 1,
      formDate: {
        description: '',
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      defaultProps: {
        label: 'name'
      },
      permissionId: [],
      roleId: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.initRoleList()
    this.getCompanyList()
  },
  methods: {
    async initRoleList() {
      const { data } = await getRole(this.pageList)
      this.tableData = data.rows
      this.total = data.total
    },
    handleCurrentChange(val) {
      this.pageList.page = val
      this.initRoleList()
    },
    async getCompanyList() {
      const { data } = await getCompanyList(this.userInfo.companyId)
      this.form = data
    },
    async delCompany(id) {
      try {
        await this.$confirm('确认删除吗', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'success'
        })
        await delCompany(id)
        this.initRoleList()
        this.$message.success('删除角色成功')
      } catch (error) {
        console.log(error)
      }
    },
    addRole() {
      this.dialog = true
    },
    btnCancel() {
      this.dialog = false
      this.formDate = {}
      this.$refs.formDate.resetFields()
    },
    btnOK() {
      this.$refs.formDate.validate(async(valid) => {
        if (valid) {
          if (this.formDate.id) {
            await updateRoleDetail(this.formDate)
          } else {
            await addRole(this.formDate)
          }
          this.initRoleList()
          this.$message.success('操作成功')
          this.dialog = false
        }
      })
    },
    async edit(id) {
      this.dialog = true
      const { data } = await getRoleDetail(id)
      this.formDate = data
    },
    async assignPermissions(id) {
      this.roleId = id
      this.isShow = true
      const { data } = await getPermission()
      this.list = await transListToTreeData(data, '0')
      const res = await getRoleDetail(id)
      this.permissionId = res.data.permIds
    },
    async btnPermissionsSubmit() {
      await assignPrem({ id: this.roleId, permIds: this.$refs.tree.getCheckedKeys() })
      this.$message.success('分配权限成功')
      this.isShow = false
    },
    btnPermissionsCal() {
      this.permissionId = []
      this.isShow = false
    }
  }
}
</script>

<style></style>
