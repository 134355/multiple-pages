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
import { getProductsPurStatInfo, getCommonBranchStorelist, productsPurStatExcel } from '@/api/index'
import { download } from '@/utils/utils'

export default {
  name: 'CommodityPurchasingStatistics',
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
    const datamodel = JSON.parse(sessionStorage.getItem('datamodel')) || {}
    if (datamodel.isStore) {
      this.formItem.splice(1, 1)
    }
  },
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getProductsPurStatInfo
        })
        .set('table', {
          columns: [
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
            },
            {
              prop: 'sv_return_num',
              label: '退货数量'
            },
            {
              prop: 'sv_return_amount',
              label: '退货总额'
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
    handleExport (scope) {
      productsPurStatExcel(scope).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
