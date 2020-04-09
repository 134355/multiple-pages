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
import { getStockSummaryInfo, stockSummaryExcel, getCommonBranchStorelist } from '@/api/index'
import { download, parseParams } from '@/utils/utils'

export default {
  name: 'InboundAndOutboundSummary',
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
          page: getStockSummaryInfo
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
              prop: 'sv_user_name',
              label: '门店'
            },
            {
              prop: 'bill_date',
              label: '月份'
            },
            {
              prop: 'sv_p_barcode',
              label: '商品编号'
            },
            {
              prop: 'sv_p_name',
              label: '商品名称'
            },
            {
              prop: 'sv_pc_name',
              label: '类别'
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
              prop: 'sv_in_num',
              label: '进项数量'
            },
            {
              prop: 'sv_in_amounts',
              label: '进项金额'
            },
            {
              prop: 'sv_out_num',
              label: '出项数量'
            },
            {
              prop: 'sv_out_amounts',
              label: '出项金额'
            }
          ]
        })
        .set('searchForm', {
          item: this.formItem,
          keyWords: {
            prop: 'keywards',
            placeholder: '输入商品名称/商品编号',
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
      stockSummaryExcel(parseParams(data)).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
