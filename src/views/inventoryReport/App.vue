<template>
  <div class="inventoryReport">
    <el-tabs v-model="activeName">
      <el-tab-pane label="出入库存明细" name="accessInventoryDetails">
        <AccessInventoryDetails v-if="activeName === 'accessInventoryDetails'" />
      </el-tab-pane>
      <el-tab-pane label="出入库汇总" name="inboundAndOutboundSummary">
        <InboundAndOutboundSummary v-if="activeName === 'inboundAndOutboundSummary'" />
      </el-tab-pane>
      <el-tab-pane label="进销存报表" name="invoicingReport">
        <InvoicingReport v-if="activeName === 'invoicingReport'" />
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
      <el-tab-pane label="商品采购统计" name="commodityPurchasingStatistics">
        <CommodityPurchasingStatistics v-if="activeName === 'commodityPurchasingStatistics'" />
      </el-tab-pane>
      <el-tab-pane label="商品进货排行" name="commodityPurchaseRanking">
        <CommodityPurchaseRanking v-if="activeName === 'commodityPurchaseRanking'" />
      </el-tab-pane>
      <el-tab-pane label="供应商进货排行" name="supplierPurchaseRanking">
        <SupplierPurchaseRanking v-if="activeName === 'supplierPurchaseRanking'" />
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
import CommodityPurchasingStatistics from './pages/commodityPurchasingStatistics'
import CommodityPurchaseRanking from './pages/commodityPurchaseRanking'
import SupplierPurchaseRanking from './pages/supplierPurchaseRanking'
import InvoicingReport from './pages/invoicingReport'

export default {
  name: 'InventoryReport',
  components: {
    AccessInventoryDetails,
    InboundAndOutboundSummary,
    InventoryList,
    InventoryDifferenceTable,
    PurchaseAmount,
    CommodityPurchasingStatistics,
    CommodityPurchaseRanking,
    SupplierPurchaseRanking,
    InvoicingReport
  },
  data () {
    return {
      activeName: 'accessInventoryDetails'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
