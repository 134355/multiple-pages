<template>
  <div class="businessStatement">
    <min-view @load="handleLoad">
      <template #search-form-action-export="scope">
        <el-button @click="handleExport(scope)">导出</el-button>
      </template>
    </min-view>
  </div>
</template>
<script>
import { getCommonBranchStorelist, getUserBusinessInfo, getUserBusinessExcel } from '@/api/index'
import { download } from '@/utils/utils'
export default {
  name: 'BusinessStatement',
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getUserBusinessInfo
        })
        .set('table', {
          columns: [
            {
              prop: 'intelligent_datetime',
              label: '日期',
              width: '150',
              align: 'center'
            },
            {
              label: '客服类型',
              align: 'center',
              children: [
                {
                  prop: 'total_transactions',
                  label: '总成交笔数',
                  width: '100',
                  align: 'center'
                },
                {
                  prop: 'member_consume_amount',
                  label: '会员消费',
                  align: 'center'
                },
                {
                  prop: 'memnber_transactions_num',
                  label: '会员笔数',
                  align: 'center'
                },
                {
                  prop: 'consume_amount',
                  label: '散客消费',
                  align: 'center'
                },
                {
                  prop: 'transactions_num',
                  label: '散客笔数',
                  align: 'center'
                }
              ]
            },
            {
              label: '销售类型',
              align: 'center',
              children: [
                {
                  prop: 'general_product_totalamount',
                  label: '产品总额',
                  align: 'center'
                },
                {
                  prop: 'service_product_totalamount',
                  label: '服务商品总额',
                  width: '120',
                  align: 'center'
                },
                {
                  prop: 'recharge_totalamount',
                  label: '充值总额',
                  align: 'center'
                },
                {
                  prop: 'timescount_totalamount',
                  label: '充次总额',
                  align: 'center'
                }
              ]
            },
            {
              label: '支付方式',
              align: 'center',
              children: [
                {
                  prop: 'order_cashmoney',
                  label: '现金',
                  align: 'center'
                },
                {
                  prop: 'order_bankcardmoney',
                  label: '银行卡',
                  align: 'center'
                },
                {
                  prop: 'order_wechatmoney',
                  label: '微信',
                  align: 'center'
                },
                {
                  prop: 'order_wechataccountmoney',
                  label: '微信记账',
                  align: 'center'
                },
                {
                  prop: 'order_alipaymoney',
                  label: '支付宝',
                  align: 'center'
                },
                {
                  prop: 'order_alipayaccountmoney',
                  label: '支付宝记账',
                  width: '120',
                  align: 'center'
                },
                {
                  prop: 'order_cardmoney',
                  label: '储值卡',
                  align: 'center'
                },
                {
                  prop: 'order_scanmoney',
                  label: '扫码支付',
                  align: 'center'
                },
                {
                  prop: 'order_couponmoney',
                  label: '优惠劵',
                  align: 'center'
                },
                {
                  prop: 'order_meituanmoney',
                  label: '美团',
                  align: 'center'
                },
                {
                  prop: 'order_praisemoney',
                  label: '口碑',
                  align: 'center'
                },
                {
                  prop: 'order_shanhuimoney',
                  label: '闪惠',
                  align: 'center'
                },
                {
                  prop: 'order_oncreditmoney',
                  label: '赊账',
                  align: 'center'
                }
              ]
            },
            {
              label: '营业外收入',
              align: 'center',
              children: [
                {
                  prop: 'rechargerecord_cashmoney',
                  label: '现金',
                  align: 'center'
                },
                {
                  prop: 'rechargerecord_bankcardmoney',
                  label: '银行卡',
                  align: 'center'
                },
                {
                  prop: 'rechargerecord_wechatmoney',
                  label: '微信',
                  align: 'center'
                },
                {
                  prop: 'rechargerecord_wechataccountmoney',
                  label: '微信记账',
                  align: 'center'
                },
                {
                  prop: 'rechargerecord_alipaymoney',
                  label: '支付宝',
                  align: 'center'
                },
                {
                  prop: 'rechargerecord_alipayaccountmoney',
                  label: '支付宝记账',
                  width: '120',
                  align: 'center'
                },
                {
                  prop: 'rechargerecord_cardmoney',
                  label: '储值卡',
                  align: 'center'
                }
              ]
            },
            {
              prop: 'deserved_amount',
              label: '优折赠',
              align: 'center'
            },
            {
              prop: 'return_amount',
              label: '退款金额',
              align: 'center'
            },
            {
              prop: 'order_receivable',
              label: '实收现金',
              align: 'center'
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
                  placeholder: '请选择门店'
                }
              }
            }
          ],
          action: ['search', 'reset', 'export']
        })
        .set('action', [])
        .done()
    },
    handleExport (data) {
      getUserBusinessExcel(data).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
