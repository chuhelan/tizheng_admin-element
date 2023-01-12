<template>
  <div>
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
      class="tree-card"
    >
      <div slot="header">
        <AddTree :list="company" :is-root="true" @command="handleCommon" />
      </div>
      <!-- card body -->
      <div class="custom-tree-container">
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <AddTree
            slot-scope="{ data }"
            :list="data"
            :is-root="false"
            @dropDownDelete="handlerDropDownDelete"
            @command="handleCommon"
            @detailDepartment="handleDetailDepartment"
          />
        </el-tree>
      </div>
      <DiaLog
        ref="dialog"
        :dialog-visible.sync="dialogVisible"
        :list="node"
        @initGetDepartment="initGetDepartment"
      />
    </el-card>
  </div>
</template>
<script>
// 定义数组，封装请求，调用请求，将请求封装再函数中方便后面调用
// 将值传给数组，再将数组传给子节点
import { getDepartment, delDepartment } from '@/api/department'
import AddTree from './components/add-tree.vue'
import tranListToTreeData from '@/utils/transListToTreeData'
import DiaLog from './components/tree-dialog.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    AddTree,
    DiaLog
  },
  data() {
    return {
      dialogVisible: false,
      defaultProps: {
        label: 'name'
      },
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人',
        id: ''
      },
      departs: [],
      node: {}
    }
  },
  created() {
    this.initGetDepartment()
  },
  methods: {
    async initGetDepartment() {
      const { data } = await getDepartment()
      this.departs = tranListToTreeData(data.depts, '')
    },
    async handlerDropDownDelete(data) {
      try {
        await delDepartment(data.id)
        this.$message.success('删除成功')
      } catch (error) {
        console.log(error)
      }
      this.initGetDepartment()
    },
    handleCommon(data) {
      this.dialogVisible = true
      this.node = data
    },
    async handleDetailDepartment(data) {
      this.dialogVisible = true
      this.node = data
      this.$refs.dialog.detailDepartment(data.id)
      // this.$refs.form.detailDepartment
    }

  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
::v-deep .el-card__body {
  padding: 0px !important;
}
.custom-tree-node {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
::v-deep .el-card__header {
  padding: 18px 0px !important;
}
::v-deep .saveAsDialog {
  width: 700px !important;
}
// .el-dialog {
//   width: 800px !important;
// }
</style>
