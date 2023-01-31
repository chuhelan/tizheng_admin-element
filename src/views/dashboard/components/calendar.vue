<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" @change="dataChanged">
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select v-model="currentMonth" @change="dataChanged">
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{ date, data }">
        {{
          data.day.split("-").slice(2).join().startsWith("0")
            ? data.day.split("-").slice(2).join().substring(1)
            : data.day.split("-").slice(2).join()
        }}
        <div class="date-content">
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'HrsaasCalendar',
  props: {
    data: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      yearList: [],
      year: null,
      currentYear: null,
      currentMonth: null,
      currentDate: null
    }
  },
  created() {
    this.currentYear = this.data.getFullYear()
    this.yearList = Array.from(Array(10), (v, i) => i + this.currentYear - 5)
    this.currentMonth = this.data.getMonth() + 1
    this.dataChanged()
  },
  methods: {
    dataChanged() {
      const year = this.currentYear
      const month = this.currentMonth
      this.currentDate = new Date(`${year}-${month}`)
    },
    isWeek(value) {
      // console.log(value.getDay())
      return value.getDay() === 0 || value.getDay() === 6
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>
