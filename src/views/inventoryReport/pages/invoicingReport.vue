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
import { getInvStatementInfo, getCommonBranchStorelist, invStatementExcel, getFirstCategory } from '@/api/index'
import { download, parseParams } from '@/utils/utils'

export default {
  name: 'InvoicingReport',
  data () {
    return {
      formItem: [
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
          prop: 'storagenum',
          name: 'el-select',
          component: {
            props: {
              placeholder: '请选择商品库存',
              filterable: true
            },
            options: [
              {
                label: '全部',
                value: 0
              },
              {
                label: '正库存',
                value: 1
              },
              {
                label: '负库存',
                value: 2
              }
            ]
          }
        },
        {
          prop: 'sv_pc_id',
          name: 'el-select',
          service: getFirstCategory,
          component: {
            props: {
              placeholder: '请选择类别',
              filterable: true
            }
          }
        }
      ]
    }
  },
  created () {
    if (window.IsStore) {
      this.formItem.splice(1, 1)
    }
  },
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getInvStatementInfo
        })
        .set('table', {
          columns: [
            {
              prop: 'user_name',
              label: '门店'
            },
            {
              prop: 'sv_p_barcode',
              label: '商品编码'
            },
            {
              prop: 'sv_p_name',
              label: '商品名称'
            },
            {
              prop: 'sv_pc_name',
              label: '商品分类'
            },
            {
              prop: 'initial_stage_inventory',
              label: '初期库存'
            },
            {
              prop: 'in_storage_num',
              label: '入库数量'
            },
            {
              prop: 'in_storage_amounts',
              label: '进货金额'
            },
            {
              prop: 'in_storage_avgprice',
              label: '进货均价'
            },
            {
              prop: 'primary_sale_num',
              label: '销售数量'
            },
            {
              prop: 'sale_profitamount',
              label: '销售毛利润'
            },
            {
              prop: 'sale_avgprice',
              label: '销售均价'
            },
            {
              prop: 'sv_p_storage',
              label: '期末库存'
            },
            {
              prop: 'sv_p_originalprice',
              label: '现成本单价'
            },
            {
              prop: 'sv_p_originalamounts',
              label: '现成本总额'
            }
          ]
        })
        .set('searchForm', {
          item: this.formItem,
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
    handleExport (data) {
      invStatementExcel(parseParams(data)).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
