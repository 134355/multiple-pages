<template>
  <div class="storedValueBalanceStatistics">
    <min-view @load="handleLoad"></min-view>
  </div>
</template>
<script>
import { getValueCardStaInfo, getCommonBranchStorelist } from '@/api/index'
export default {
  name: 'StoredValueBalanceStatistics',
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
              placeholder: '请选择门店'
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
          page: getValueCardStaInfo
        })
        .set('table', {
          columns: [
            {
              type: 'selection',
              align: 'center',
              width: '50'
            },
            {
              prop: 'intelligent_datetime',
              label: '日期'
            },
            {
              prop: 'recharge_amount',
              label: '充值金额'
            },
            {
              prop: 'surplus_amount',
              label: '赠送金额'
            },
            {
              prop: 'consumption_amount',
              label: '消费金额'
            },
            {
              prop: 'return_amount',
              label: '退款金额'
            },
            {
              prop: 'give_amount',
              label: '结余余额'
            }
          ]
        })
        .set('searchForm', {
          item: this.formItem,
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
