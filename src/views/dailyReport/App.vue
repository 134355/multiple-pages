<template>
  <div class="dailyReport">
    <el-tabs v-model="activeName">
      <el-tab-pane label="每日对账单" name="dailyStatement">
        <DailyStatement v-if="activeName === 'dailyStatement'" />
      </el-tab-pane>
      <el-tab-pane label="交接班记录" name="handoverRecord">
        <HandoverRecord v-if="activeName === 'handoverRecord'" />
      </el-tab-pane>
      <el-tab-pane label="门店概况" name="storeOverview">
        <StoreOverview v-if="activeName === 'storeOverview'" />
      </el-tab-pane>
      <el-tab-pane label="营业报表" name="businessStatement" v-if="!isStore">
        <BusinessStatement v-if="activeName === 'businessStatement'" />
      </el-tab-pane>
      <el-tab-pane label="商品销售统计" name="commoditySalesStatistics">
        <CommoditySalesStatistics v-if="activeName === 'commoditySalesStatistics'" />
      </el-tab-pane>
      <el-tab-pane label="门店储值余额统计" name="storedValueBalanceStatistics">
        <StoredValueBalanceStatistics v-if="activeName === 'storedValueBalanceStatistics'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DailyStatement from './pages/dailyStatement'
import HandoverRecord from './pages/handoverRecord'
import CommoditySalesStatistics from './pages/commoditySalesStatistics'
import StoredValueBalanceStatistics from './pages/storedValueBalanceStatistics'
import StoreOverview from './pages/storeOverview'
import BusinessStatement from './pages/businessStatement'

export default {
  name: 'DailyReport',
  components: {
    DailyStatement,
    HandoverRecord,
    CommoditySalesStatistics,
    StoredValueBalanceStatistics,
    BusinessStatement,
    StoreOverview
  },
  data () {
    return {
      activeName: 'dailyStatement',
      isStore: false
    }
  },
  created () {
    const datamodel = JSON.parse(sessionStorage.getItem('datamodel')) || {}
    this.isStore = datamodel.isStore
  }
}
</script>
