<template>
  <div id="myChart" style="width: 100%; height: 500px; margin-top: 20px" />
</template>

<script>
export default {
  name: 'HrsaasRander',
  data() {
    return {
    }
  },
  mounted() {
    this.initRandar()
  },
  methods: {
    initRandar() {
      const myChart = this.$echarts.init(document.getElementById('myChart'))
      const option = {
        title: {
          text: '人力资源基础绩效表'
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          // shape: 'circle',
          radius: 150,
          center: ['50%', '50%'],
          indicator: [
            { name: '考勤', max: 6500 },
            { name: '工资', max: 16000 },
            { name: '社保', max: 30000 },
            { name: '代码行数', max: 38000 },
            { name: '工作效率', max: 52000 },
            { name: '知识分享', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending'
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
