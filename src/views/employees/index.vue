<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :flag="(flag = true)">
        <template #before>
          <span>总记录数{{ pageList.total }}</span>
        </template>
        <template #after>
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
          >导入</el-button>
          <el-button
            size="small"
            type="danger"
            @click="exportJson"
          >导出</el-button>
          <el-button
            size="small"
            type="primary"
            @click="handleDialog"
          >新增员工</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <el-table-column label="序号" type="index" sortable="" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="头像">
            <template slot-scope="{ row }">
              <img
                v-imageError="defaultImage"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                @click="showQrcode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column
            label="聘用形式"
            prop="formOfEmployment"
            sortable=""
            :formatter="handleFormatter"
          />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="">
            <template
              slot-scope="scope"
            >{{ scope.row.timeOfEntry | dateFormat("YYYY-MM-DD") }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState" sortable="">
            <template v-slot="{ row }">
              <el-switch :value="row.enableState === 1 ? true : false" />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            prop="username"
            sortable=""
            fixed="right"
            width="265"
          >
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/detail/${row.id}`)"
              >查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="showRdbc(row.id)">角色</el-button>
              <el-button
                type="text"
                size="small"
                @click="delEmployee(row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="center">
          <el-pagination
            :current-page="pageList.page"
            :page-size="pageList.size"
            layout="prev, pager, next"
            :total="pageList.total"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
    </div>
    <AddEmploers :dialog.sync="dialog" />
    <el-dialog
      title="二维码"
      :visible.sync="showQr"
      width="30%"
    >
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <AssignRole ref="roleList" :show-rdbc-dialog.sync="showRdbcDialog" :user-id="userId" />
  </div>
</template>
<script>

import AssignRole from '@/views/employees/components/assign-role.vue'
import { getEmployeeList, delEmployee } from '@/api/emploers'
import EmployeeList from '@/constant/employees'
import AddEmploers from '@/views/employees/components/add-employees.vue'
import QrCode from 'qrcode'
export default {
  components: {
    AddEmploers,
    AssignRole
  },
  data() {
    return {
      list: [],
      defaultImage: require('@/assets/common/img.jpeg'),
      pageList: {
        page: 1,
        size: 10,
        total: 0
      },

      dialog: false,
      showQr: false,
      showRdbcDialog: false,
      userId: ''
    }
  },
  created() {
    this.initGetEmployeeList()
  },

  methods: {
    async initGetEmployeeList() {
      this.loading = true
      const { data } = await getEmployeeList(this.pageList)
      this.list = data.rows
      this.pageList.total = data.total
      this.loading = false
    },
    currentChange(val) {
      this.pageList.page = val
      this.initGetEmployeeList()
    },
    handleFormatter(row) {
      const obj = EmployeeList.hireType.find(
        (item) => item.id === row.formOfEmployment
      )
      return obj ? obj.value : '未声明'
    },
    async delEmployee(id) {
      try {
        await this.$confirm('确认删除吗', {
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
        await delEmployee(id)
        this.initGetEmployeeList()
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
    },
    handleDialog() {
      this.dialog = true
    },
    // [{}]=>[[]]
    formatJson(headers, rows) {
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (key === '入职日期' || key === '转正日期') {
            if (item[headers[key]] === null) {
              item[headers[key]] = ''
              return item[headers[key]]
            } else {
              item[headers[key]] = this.$moment(item[headers[key]]).format(
                'YYYY-MM-DD'
              )
              return item[headers[key]]
            }
          } else if (key === '聘用形式') {
            const obj = EmployeeList.hireType.find(
              (itemEl) => itemEl.id === item[headers[key]]
            )
            return obj.value ? obj.value : '未声明'
          } else {
            return item[headers[key]]
          }
        })
      })
    },
    exportJson() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async(excel) => {
        const { data } = await getEmployeeList({
          page: 1,
          size: this.pageList.total
        })
        const list = this.formatJson(headers, data.rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data: list,
          multiHeader,
          merges
        })
      })
    },
    showQrcode(url) {
      if (url) {
        this.showQr = true
        this.$nextTick(() => QrCode.toCanvas(this.$refs.myCanvas, url))
      } else {
        this.$message.warning('头像未上传')
      }
    },
    showRdbc(id) {
      this.userId = id
      this.showRdbcDialog = true
      this.$refs.roleList.initRoleList(id)
    }

  }
}
</script>

<style></style>
