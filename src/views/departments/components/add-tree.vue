<template>
  <div class="custom-tree-node">
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      style="height: 40px; width: 100%"
    >
      <el-col>
        <!-- 名称应该变成 对应的节点中的name -->
        <span>{{ list.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col class="manner">{{ list.manager }}</el-col>
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown @command="handleCommand">
              <span> 操作<i class="el-icon-arrow-down" /> </span>
              <!-- 下拉菜单 -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item
                  v-if="!isRoot"
                  command="edit"
                >编辑部门</el-dropdown-item>
                <el-dropdown-item
                  v-if="!isRoot"
                  command="del"
                >删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HrsaasAddTree',
  props: {
    list: {
      type: Object,
      default() {
        return []
      }
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      debugger
      console.log(this.list)
      if (command === 'add') {
        this.$emit('command', command, this.list)
      } else if (command === 'edit') {
        console.log(command)
      } else if (command === 'del') {
        this.$confirm('确认删除部门吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        })
          .then(() => {
            return this.$emit('dropDownDelete', this.list)
          }).then(() => {
            // this.$message.success('success')
          })
        //   .catch(action => {
        //     this.$message({
        //       type: 'info'
        //     })
        //   })
      }
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
</style>
