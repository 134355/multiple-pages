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
import { getProductsPurRankInfo, getCommonBranchStorelist, productsPurRankExcel } from '@/api/index'
import { download } from '@/utils/utils'

export default {
  name: 'CommodityPurchaseRanking',
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getProductsPurRankInfo
        })
        .set('table', {
          columns: [
            {
              prop: 'serialnum',
              label: '排名'
            },
            {
              prop: 'sv_p_name',
              label: '商品名称'
            },
            {
              prop: 'sv_p_barcode',
              label: '商品编码'
            },
            {
              prop: 'sv_p_artno',
              label: '货号'
            },
            {
              prop: 'sv_p_specs',
              label: '规格'
            },
            {
              prop: 'sv_pc_name',
              label: '一级类别'
            },
            {
              prop: 'sv_p_unit',
              label: '单位'
            },
            {
              prop: 'sv_instock_num',
              label: '进货数量'
            },
            {
              prop: 'sv_instock_amount',
              label: '进货总额'
            }
          ]
        })
        .set('searchForm', {
          item: [
            {
              prop: 'startdate&enddate',
              name: 'DcDatePicker'
            },
            {
              prop: 'user_id',
              name: 'el-cascader',
              service: getCommonBranchStorelist,
              component: {
                props: {
                  placeholder: '请选择门店',
                  filterable: true
                }
              }
            }
          ],
          keyWords: {
            prop: 'keywards',
            placeholder: '输入商品名称/商品编码查询',
            style: {
              width: '270px'
            }
          },
          action: ['search', 'reset', 'export']
        })
        .set('action', [])
        .done()
    },
    handleExport (scope) {
      productsPurRankExcel(scope).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
