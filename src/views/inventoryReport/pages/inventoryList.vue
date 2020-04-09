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
import { getStockCheckDetailInfo, stockCheckDetailExcel, getCommonBranchStorelist } from '@/api/index'
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
          page: getStockCheckDetailInfo
        })
        .set('table', {
          columns: [
            {
              label: '序号',
              prop: 'serialnum',
              align: 'center',
              width: '50'
            },
            {
              prop: 'sv_storestock_checkdetail_username',
              label: '门店'
            },
            {
              width: '160',
              prop: 'sv_storestock_check_list_no',
              label: '库存盘点单号'
            },
            {
              prop: 'sv_storestock_checkdetail_pbcode',
              label: '商品条码'
            },
            {
              prop: 'sv_storestock_checkdetail_pname',
              label: '商品名称'
            },
            {
              prop: 'sv_storestock_checkdetail_specs',
              label: '规格'
            },
            {
              prop: 'sv_storestock_checkdetail_categoryname',
              label: '一级类别'
            },
            {
              prop: 'sv_storestock_checkdetail_checkbeforenum',
              label: '系统库存'
            },
            {
              prop: 'sv_storestock_checkdetail_checknum',
              label: '盘点数量'
            },
            {
              prop: 'sv_storestock_checkdetail_checkprice',
              label: '进货价'
            },
            {
              prop: 'sv_storestock_checkdetail_checkoprice',
              label: '成本价'
            },
            {
              prop: 'sv_storestock_checkdetail_checkomoney',
              label: '盘点金额(成本价)'
            },
            {
              prop: 'sv_storestock_checkdetail_checkmoney',
              label: '盘点金额'
            }
          ]
        })
        .set('searchForm', {
          item: this.formItem,
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
    },
    handleExport (data) {
      stockCheckDetailExcel(parseParams(data)).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
