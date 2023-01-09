<template>
  <div>
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
      class="tree-card"
    >
      <div slot="header">
        <el-row type="flex" justify="space-between">
          <el-col><div class="grid-content bg-purple" />
            <span>江苏传智播客教育科技股份有限公司</span></el-col>
          <el-col :span="3">
            <el-row type="flex" justify="end">
              <el-col><div class="grid-content bg-purple-light" />
                <el-dropdown>
                  <span class="el-dropdown-link"> 负责人 </span></el-dropdown></el-col>
              <el-col><div class="grid-content bg-purple-light" />
                <el-dropdown>
                  <span class="el-dropdown-link">
                    操作<i class="el-icon-arrow-down el-icon--right" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu></el-dropdown></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <!-- card body -->
      <div class="custom-tree-container">
        <el-tree
          :data="departs"
          :props="defaultProps"
          default-expand-all="true"
          :render-content="renderContent"
        >
          <span slot-scope="{ data }" class="custom-tree-node">
            <span>{{ data.name }}</span>
            <span>
              <el-row type="flex">
                <el-col>
                  <el-dropdown class="dropper">
                    <span class="el-dropdown-link">
                      {{ data.manager }}
                    </span></el-dropdown>
                </el-col>
                <el-col><div class="grid-content bg-purple-light" />
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      操作<i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                    </el-dropdown-menu></el-dropdown></el-col>
              </el-row>
            </span>
          </span>
        </el-tree>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HrsaasIndex',

  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [
        {
          name: '总裁办',
          manager: '1',
          children: [{ name: '董事会', manager: '4' }]
        },
        { name: '行政部', manager: '2' },
        { name: '人事部', manager: '3' }
      ]
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
::v-deep .el-card__header {
  padding: 18px 0px !important;
}
.custom-tree-node {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-right: 8px;
}
.dropper {
  margin-right: 20px;
}
</style>
