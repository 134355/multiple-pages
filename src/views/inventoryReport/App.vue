<template>
  <div class="inventoryReport">
    <el-tabs v-model="activeName">
      <el-tab-pane label="出入库存明细" name="accessInventoryDetails">
        <AccessInventoryDetails v-if="activeName === 'accessInventoryDetails'" />
      </el-tab-pane>
      <el-tab-pane label="出入库汇总" name="inboundAndOutboundSummary">
        <InboundAndOutboundSummary v-if="activeName === 'inboundAndOutboundSummary'" />
      </el-tab-pane>
      <el-tab-pane label="盘点明细表" name="inventoryList">
        <InventoryList v-if="activeName === 'inventoryList'" />
      </el-tab-pane>
      <el-tab-pane label="盘点差异表" name="inventoryDifferenceTable">
        <InventoryDifferenceTable v-if="activeName === 'inventoryDifferenceTable'" />
      </el-tab-pane>
      <el-tab-pane label="进货额" name="purchaseAmount">
        <PurchaseAmount v-if="activeName === 'purchaseAmount'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AccessInventoryDetails from './pages/accessInventoryDetails'
import InboundAndOutboundSummary from './pages/inboundAndOutboundSummary'
import InventoryList from './pages/inventoryList'
import InventoryDifferenceTable from './pages/inventoryDifferenceTable'
import PurchaseAmount from './pages/purchaseAmount'

export default {
  name: 'InventoryReport',
  components: {
    AccessInventoryDetails,
    InboundAndOutboundSummary,
    InventoryList,
    InventoryDifferenceTable,
    PurchaseAmount
  },
  data () {
    return {
      activeName: 'accessInventoryDetails'
    }
  }
}
</script>

<style lang="scss" scoped>
.inventoryReport {
  padding: 20px;
}
</style>
