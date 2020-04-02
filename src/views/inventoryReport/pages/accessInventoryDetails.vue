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
  name: 'AccessInventoryDetails',
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
              label: '单据编号'
            },
            {
              prop: 'sv_p_barcode',
              label: '门店'
            },
            {
              prop: 'sv_p_specs',
              label: '商品编号'
            },
            {
              prop: 'address',
              label: '商品类别',
              emptyText: '暂无类别'
            },
            {
              prop: 'sv_p_unit',
              label: '商品名称'
            },
            {
              prop: 'sv_p_storage',
              label: '单据类型'
            },
            {
              prop: 'product_sale_num',
              label: '单据日期'
            },
            {
              prop: 'product_total_price',
              label: '进项数量'
            },
            {
              prop: 'product_receivable',
              label: '出项数量'
            },
            {
              prop: 'product_rec_proportion',
              label: '规格'
            },
            {
              prop: 'product_profit',
              label: '单位'
            },
            {
              prop: 'product_profit_margin',
              label: '金额'
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
              prop: 'is_exist_sale',
              name: 'el-select',
              component: {
                style: {
                  width: '150px'
                },
                props: {
                  placeholder: '请选择'
                },
                options: [
                  {
                    label: '全部',
                    value: -1
                  },
                  {
                    label: '销售单',
                    value: 1
                  },
                  {
                    label: '入库单',
                    value: 0
                  },
                  {
                    label: '出库单',
                    value: 2
                  },
                  {
                    label: '调拨单',
                    value: 4
                  }
                ]
              }
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
            placeholder: '输入商品名称/单据编号',
            style: {
              width: '270px'
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
