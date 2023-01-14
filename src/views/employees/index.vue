<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :flag="(flag = true)">
        <template #before>
          <span>总记录数{{ pageList.total }}</span>
        </template>
        <template #after>
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </PageTools>
      <el-card>
        <el-table v-loading="loading" border :data="list">
          <el-table-column label="序号" type="index" sortable="" />
          <el-table-column label="姓名" prop="username" sortable="" />
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
            width="280"
          >
            <template slot-scope="{ row }">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
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
  </div>
</template>
<script>
import { getEmployeeList, delEmployee } from '@/api/emploers'
import EmployeeList from '@/constant/employees'
export default {
  data() {
    return {
      list: [],
      pageList: {
        page: 1,
        size: 10,
        total: 0
      }
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
    }
  }
}
</script>

<style></style>
