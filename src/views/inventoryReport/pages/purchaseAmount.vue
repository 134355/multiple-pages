<template>
  <div class="purchaseAmount">
    <dc-form :form="form"></dc-form>
  </div>
</template>
<script>
import { getCommonBranchStorelist, getProInStockStaInfo } from '@/api/index'
export default {
  name: 'PurchaseAmount',
  data () {
    return {
      form: {
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
      }
    }
  },
  created () {
    this.getProInStockStaInfo({})
  },
  methods: {
    getProInStockStaInfo (data) {
      getProInStockStaInfo(data).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.purchaseAmount {
  padding: 10px;
  background: #ffffff;
}
</style>
