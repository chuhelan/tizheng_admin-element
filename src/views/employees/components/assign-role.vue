<template>
  <div>
    <el-dialog
      title="权限分配"
      :visible.sync="showRdbcDialog"
      width="30%"
      @close="btnCal"
    >
      <span>
        <el-checkbox-group v-model="roleList">
          <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
            {{ item.name }}
          </el-checkbox>
        </el-checkbox-group>

      </span>
      <span slot="footer">
        <el-button @click="btnCal">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getRole, assignRoles } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
export default {
  name: 'HrsaasAssignRole',
  props: {
    showRdbcDialog: {
      type: Boolean,
      default: false
    },
    userId: Number
  },
  data() {
    return {
      roleList: [],
      list: [],
      pageList: {
        page: 1,
        pagesize: 20
      }
    }
  },
  created() {
    this.initList()
  },
  mounted() {

  },
  methods: {
    async initList() {
      const { data } = await getRole(this.pageList)
      this.list = data.rows
    },
    async initRoleList(id) {
      const { data } = await getUserDetailById(id)
      this.roleList = data.roleIds
    },
    async submit() {
      await assignRoles({ id: this.userId, roleIds: this.roleList })
      this.$emit('update:showRdbcDialog', false)
    },
    btnCal() {
      this.roleList = []
      this.$emit('update:showRdbcDialog', false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
