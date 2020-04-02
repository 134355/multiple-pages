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
import { getProSaleStaInfo, getCommonBranchStorelist } from '@/api/index'

export default {
  name: 'InboundAndOutboundSummary',
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getProSaleStaInfo
        })
        .set('table', {
          columns: [
            {
              type: 'index',
              label: '序号',
              align: 'center',
              width: '50'
            },
            {
              prop: 'sv_p_name',
              label: '门店'
            },
            {
              prop: 'sv_p_barcode',
              label: '库存盘点单号'
            },
            {
              prop: 'sv_p_specs',
              label: '商品条码'
            },
            {
              prop: 'address',
              label: '商品名称'
            },
            {
              prop: 'sv_p_unit',
              label: '规格'
            },
            {
              prop: 'sv_p_storage',
              label: '一级类别'
            },
            {
              prop: 'product_sale_num',
              label: '系统库存'
            },
            {
              prop: 'product_total_price',
              label: '盘点数量'
            },
            {
              prop: 'product_receivable',
              label: '进货价'
            },
            {
              prop: 'product_rec_proportion',
              label: '成本价'
            },
            {
              prop: 'product_profit',
              label: '盘点金额(成本价)'
            },
            {
              prop: 'product_profit',
              label: '盘点金额'
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
            placeholder: '输入盘点单号/商品条码/商品名称进行查询',
            style: {
              width: '350px'
            }
          },
          action: ['search', 'reset', 'export']
        })
        .set('action', [])
        .done()
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
