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
  name: 'InvoicingReport',
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
              label: '门店'
            },
            {
              prop: 'sv_p_name',
              label: '商品编码'
            },
            {
              prop: 'sv_p_barcode',
              label: '商品名称'
            },
            {
              prop: 'sv_p_artno',
              label: '商品分类'
            },
            {
              prop: 'sv_p_specs',
              label: '初期库存'
            },
            {
              prop: 'sv_pc_name',
              label: '入库数量'
            },
            {
              prop: 'sv_p_unit',
              label: '进货金额'
            },
            {
              prop: 'sv_instock_num',
              label: '进货均价'
            },
            {
              prop: 'sv_instock_amount',
              label: '销售数量'
            },
            {
              prop: 'sv_p_unit',
              label: '销售毛利润'
            },
            {
              prop: 'sv_instock_num',
              label: '销售均价'
            },
            {
              prop: 'sv_instock_amount',
              label: '期末库存'
            },
            {
              prop: 'sv_p_unit',
              label: '现成本单价'
            },
            {
              prop: 'sv_instock_num',
              label: '现成本总额'
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
            },
            {
              prop: 'uscser_id',
              name: 'el-select',
              component: {
                props: {
                  placeholder: '请选择商品库存',
                  filterable: true
                },
                options: [
                  {
                    label: '全部',
                    value: -1
                  },
                  {
                    label: '正库存',
                    value: 1
                  },
                  {
                    label: '零库存',
                    value: 2
                  },
                  {
                    label: '负库存',
                    value: 2
                  }
                ]
              }
            },
            {
              prop: 'sas',
              name: 'el-select',
              component: {
                props: {
                  placeholder: '请选择类别',
                  filterable: true
                },
                options: [
                  {
                    label: '全部',
                    value: -1
                  },
                  {
                    label: '正库存',
                    value: 1
                  },
                  {
                    label: '零库存',
                    value: 2
                  },
                  {
                    label: '负库存',
                    value: 2
                  }
                ]
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
