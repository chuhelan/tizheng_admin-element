<template>
  <div>
    <el-card class="page-tools">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col>
          <div v-if="flag" class="before">
            <i class="el-icon-info" />
            <!-- 定义前面得插槽 -->
            <slot name="before" />
          </div>
        </el-col>
        <el-col>
          <el-row type="flex" justify="end">
            <!-- 定义后面的插槽 -->
            <slot name="after" />
          </el-row> </el-col></el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'HrsaasIndex',
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
 .page-tools {
    margin: 10px 0;
    .before {
      line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
 }</style>
