<template>
  <div>
    <min-view @load="handleLoad">
      <template #search-form-action-export="scope">
        <el-button @click="handleExport(scope)">导出</el-button>
      </template>
    </min-view>
  </div>
</template>
<script>
import { getSupplierPurRankInfo, supplierPurRankExcel } from '@/api/index'
import { download } from '@/utils/utils'

export default {
  name: 'SupplierPurchaseRanking',
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getSupplierPurRankInfo
        })
        .set('table', {
          columns: [
            {
              prop: 'serialnum',
              label: '排名'
            },
            {
              prop: 'sv_suname',
              label: '供应商名称'
            },
            {
              prop: 'sv_instock_num',
              label: '进货笔数'
            },
            {
              prop: 'sv_instock_amount',
              label: '进货总额'
            },
            {
              prop: 'sv_return_num',
              label: '退货笔数'
            },
            {
              prop: 'sv_return_amount',
              label: '退货总额'
            }
          ]
        })
        .set('searchForm', {
          item: [
            {
              prop: 'startdate&enddate',
              name: 'DcDatePicker'
            }
          ],
          action: ['search', 'export']
        })
        .set('action', [])
        .done()
    },
    handleExport (scope) {
      supplierPurRankExcel(scope).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
