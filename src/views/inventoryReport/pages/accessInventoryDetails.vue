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
import { getStockDetailInfo, getCommonBranchStorelist, stockDetailExcel } from '@/api/index'
import { download, dateFormat } from '@/utils/utils'

export default {
  name: 'AccessInventoryDetails',
  data () {
    return {
      formItem: [
        {
          prop: 'startdate&enddate',
          name: 'DcDatePicker'
        },
        {
          prop: 'storestocktype',
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
                value: 2
              },
              {
                label: '出库单',
                value: 3
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
      ]
    }
  },
  created () {
    if (window.IsStore) {
      this.formItem.splice(2, 1)
    }
  },
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getStockDetailInfo
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
              prop: 'sv_pc_noid',
              label: '单据编号'
            },
            {
              prop: 'sv_user_name',
              label: '门店'
            },
            {
              prop: 'sv_p_barcode',
              label: '商品编号'
            },
            {
              prop: 'sv_pc_name',
              label: '商品类别',
              emptyText: '暂无类别'
            },
            {
              prop: 'sv_p_name',
              label: '商品名称'
            },
            {
              prop: 'sv_type_name',
              label: '单据类型'
            },
            {
              prop: 'bill_date',
              label: '单据日期',
              formatter: (row) => {
                return dateFormat('YYYY-mm-dd HH:MM', new Date(row.bill_date))
              }
            },
            {
              prop: 'sv_in_num_0',
              label: '进项数量'
            },
            {
              prop: 'sv_out_num_0',
              label: '出项数量'
            },
            {
              prop: 'sv_p_specs',
              label: '规格'
            },
            {
              prop: 'sv_p_unit',
              label: '单位'
            },
            {
              prop: 'sv_pc_combined',
              label: '金额'
            }
          ]
        })
        .set('searchForm', {
          item: this.formItem,
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
    },
    handleExport (scope) {
      stockDetailExcel(scope).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
