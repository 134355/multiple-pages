<template>
  <div class="handoverRecord">
    <min-view @load="handleLoad">
      <template #table-action-reconciliation="row">
        <el-button type="primary" @click="handleReconciliation(row)">对账</el-button>
      </template>
    </min-view>

    <el-dialog
      :title="'交接员工： ' + name"
      :visible.sync="dialogVisible"
      width="350px">
      <div style="max-height: 500px; overflow: auto;">
        <div class="yd">
          <div class="min-flex">收银对账单</div>
          <div class="sp min-flex"><span>{{startTime}}</span><span style="padding: 0 4px;">—</span><span>{{endTime}}</span></div>
        </div>
        <!-- <el-row class="m-top-20">
          <div class="statistics min-flex min-flex-wrap-wrap">
            <div class="item">
              <div>综合总收入</div>
              <div class="money">{{generalIncome}}</div>
            </div>
            <div class="item">
              <div>综合总收入</div>
              <div class="money">0</div>
            </div>
            <div class="item">
              <div>综合总收入</div>
              <div class="money">0</div>
            </div>
            <div class="item">
              <div>综合总收入</div>
              <div class="money">0</div>
            </div>
            <div class="item">
              <div>计次消费次数</div>
              <div class="money">{{jici}}</div>
            </div>
            <div class="item">
              <div>免单金额</div>
              <div class="money">{{free_amount}}</div>
            </div>
            <div class="item">
              <div>折扣金额</div>
              <div class="money">{{discount_amount}}</div>
            </div>
            <div class="item">
              <div>现金结余</div>
              <div class="money">0</div>
            </div>
          </div>
        </el-row> -->
        <el-row>
          <el-col v-if="islist0">
            <div class="title">消费人数</div>
            <DcReceipt :list="list0" />
          </el-col>
          <el-col v-if="islist">
            <div class="title">会员储值金额</div>
            <DcReceipt :list="list" />
          </el-col>
          <el-col v-if="islist1">
            <div class="title">充次金额</div>
            <DcReceipt :list="list1" />
          </el-col>
          <el-col v-if="islist2">
            <div class="title">会员消费</div>
            <DcReceipt :list="list2" />
          </el-col>
          <el-col v-if="islist3">
            <div class="title">散客消费</div>
            <DcReceipt :list="list3" />
          </el-col>
          <el-col v-if="islist4">
            <div class="title">信息汇总</div>
            <DcReceipt :list="list4" />
          </el-col>
          <el-col v-if="!islist0&&!islist&&!islist1&&!islist2&&!islist3&&!islist4">
            <div style="font-weight: 700; text-align: center;">暂无数据</div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getChangeShiftsInfo, getReconciliationInfo } from '@/api'
import { dateFormat } from '@/utils/utils'
import DcReceipt from '../components/DcReceipt'
export default {
  name: 'HandoverRecord',
  components: {
    DcReceipt
  },
  data () {
    return {
      name: '管理员',
      dialogVisible: false,
      generalIncome: 0,
      startTime: '',
      endTime: '',
      jici: 0,
      free_amount: 0,
      discount_amount: 0,
      list: [],
      islist: false,
      islist0: false,
      islist1: false,
      islist2: false,
      islist3: false,
      islist4: false,
      list0: [],
      list1: [],
      list2: [],
      list3: [],
      list4: []
    }
  },
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getChangeShiftsInfo
        })
        .set('table', {
          columns: [
            // {
            //   type: 'index',
            //   label: '序号',
            //   align: 'center',
            //   width: '50'
            // },
            {
              prop: 'operator_id',
              hidden: true
            },
            {
              prop: 'order_operator',
              label: '员工姓名'
            },
            {
              prop: 'start_time',
              label: '开始时间',
              formatter: (row) => {
                return dateFormat('YYYY-mm-dd HH:MM', new Date(row.start_time))
              }
            },
            {
              prop: 'end_time',
              label: '结束时间',
              formatter: (row) => {
                return dateFormat('YYYY-mm-dd HH:MM', new Date(row.end_time))
              }
            },
            {
              prop: 'succession_time',
              label: '交接时间',
              formatter: (row) => {
                return dateFormat('YYYY-mm-dd HH:MM', new Date(row.succession_time))
              }
            },
            {
              prop: 'cash_money',
              label: '备用金'
            }
          ],
          action: {
            label: '操作',
            item: ['reconciliation']
          }
        })
        .set('searchForm', {
          item: [
            {
              prop: 'startdate&enddate',
              name: 'DcDatePicker'
            }
          ]
        })
        .set('action', [])
        .done()
    },
    handleReconciliation (row) {
      getReconciliationInfo({
        operator_id: row.operator_id,
        startdate: dateFormat('YYYY-mm-dd HH:MM', new Date(row.start_time)),
        enddate: dateFormat('YYYY-mm-dd HH:MM', new Date(row.end_time))
      }).then(res => {
        this.list0 = []
        this.islist0 = false
        this.list = []
        this.islist = false
        this.list1 = []
        this.islist1 = false
        this.list2 = []
        this.islist2 = false
        this.list3 = []
        this.islist3 = false
        this.list4 = []
        this.islist4 = false
        this.dialogVisible = true
        this.generalIncome = res.generalIncome
        this.startTime = res.startTime
        this.endTime = res.endTime
        this.jici = res.jici
        this.free_amount = res.free_amount
        this.discount_amount = res.discount_amount
        let free = 0
        let menubar = 0
        const s = res.freeSalesCustormPayment || []
        const ss = res.memberSalesCustormPayment || []
        for (let i = 0; i < s.length; i++) {
          free += (s[i].amount || 0)
        }
        for (let i = 0; i < ss.length; i++) {
          menubar += (ss[i].amount || 0)
        }
        const refund = res.bulkguestrefund_Total + (res.memberrefund_Total - res.memberStoredvalue)
        const totalIncome = res.xk_receivable + (res.xmoney + res.wmoney + res.wxjzmoney + res.ymoney +
          res.zmoney + res.zjzmoney + res.qxmoney + res.qwxmoney + res.qwxjzmoney + res.qymoney +
          res.qzmoney + res.qzjzmoney + res.xreceivable + res.wreceivable + res.wjzreceivable +
          res.yreceivable + res.zreceivable + res.zjzreceivable + free + menubar)

        if (res.individual !== 0) {
          this.islist0 = true
          this.list0.push({
            label: '散客消费(人数)',
            money: res.individual + '人'
          })
        }
        if (res.userindividual !== 0) {
          this.islist0 = true
          this.list0.push({
            label: '会员消费(人数)',
            money: res.userindividual + '人'
          })
        }

        if (res.xmoney !== 0) {
          this.islist = true
          this.list.push({
            label: '现金',
            money: res.xmoney
          })
        }
        if (res.wmoney !== 0) {
          this.islist = true
          this.list.push({
            label: '微信',
            money: res.wmoney
          })
        }
        if (res.wxjzmoney !== 0) {
          this.islist = true
          this.list.push({
            label: '微信记账',
            money: res.wxjzmoney
          })
        }
        if (res.ymoney !== 0) {
          this.islist = true
          this.list.push({
            label: '银联卡',
            money: res.ymoney
          })
        }
        if (res.zmoney !== 0) {
          this.islist = true
          this.list.push({
            label: '支付宝',
            money: res.zmoney
          })
        }
        if (res.zjzmoney !== 0) {
          this.islist = true
          this.list.push({
            label: '支付宝记账',
            money: res.zjzmoney
          })
        }

        if (res.qxmoney !== 0) {
          this.islist1 = true
          this.list1.push({
            label: '现金',
            money: res.qxmoney
          })
        }
        if (res.qwxmoney !== 0) {
          this.islist1 = true
          this.list1.push({
            label: '微信',
            money: res.qwxmoney
          })
        }
        if (res.qwxjzmoney !== 0) {
          this.islist1 = true
          this.list1.push({
            label: '微信记账',
            money: res.qwxjzmoney
          })
        }
        if (res.qymoney !== 0) {
          this.islist1 = true
          this.list1.push({
            label: '银联卡',
            money: res.qymoney
          })
        }
        if (res.qzmoney !== 0) {
          this.islist1 = true
          this.list1.push({
            label: '支付宝',
            money: res.qzmoney
          })
        }
        if (res.qzjzmoney !== 0) {
          this.islist1 = true
          this.list1.push({
            label: '支付宝记账',
            money: res.qzjzmoney
          })
        }

        if (res.xreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '现金',
            money: res.xreceivable
          })
        }
        if (res.wreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '微信',
            money: res.wreceivable
          })
        }
        if (res.wjzreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '微信记账',
            money: res.wjzreceivable
          })
        }
        if (res.yreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '银联卡',
            money: res.yreceivable
          })
        }
        if (res.zreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '支付宝',
            money: res.zreceivable
          })
        }
        if (res.zjzreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '支付宝记账',
            money: res.zjzreceivable
          })
        }
        if (res.mreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '美团支付',
            money: res.mreceivable
          })
        }
        if (res.kreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '口碑支付',
            money: res.kreceivable
          })
        }
        if (res.sreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '闪惠支付',
            money: res.sreceivable
          })
        }
        if (res.sszreceivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '赊账支付',
            money: res.sszreceivable
          })
        }
        if (res.hy_receivable !== 0) {
          this.islist2 = true
          this.list2.push({
            label: '会员消费总额',
            money: res.hy_receivable
          })
        }

        if (res.sxreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '现金',
            money: res.sxreceivable
          })
        }
        if (res.swreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '微信',
            money: res.swreceivable
          })
        }
        if (res.swjzreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '微信记账',
            money: res.swjzreceivable
          })
        }
        if (res.syreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '银联卡',
            money: res.syreceivable
          })
        }
        if (res.szreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '支付宝',
            money: res.szreceivable
          })
        }
        if (res.szjzreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '支付宝记账',
            money: res.szjzreceivable
          })
        }
        if (res.smreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '美团支付',
            money: res.smreceivable
          })
        }
        if (res.skreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '口碑支付',
            money: res.skreceivable
          })
        }
        if (res.ssreceivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '闪惠支付',
            money: res.ssreceivable
          })
        }
        if (res.xk_receivable !== 0) {
          this.islist3 = true
          this.list3.push({
            label: '散客消费总额',
            money: res.xk_receivable
          })
        }

        if (res.jici !== 0) {
          this.islist4 = true
          this.list4.push({
            label: '计次消费总次',
            money: res.jici
          })
        }
        if ((res.xmoney + res.qxmoney + res.sxreceivablebalance_new + res.xreceivablebalance_new) !== 0) {
          this.islist4 = true
          this.list4.push({
            label: '现金结余',
            money: res.xmoney + res.qxmoney + res.sxreceivablebalance_new + res.xreceivablebalance_new
          })
        }
        if ((totalIncome - refund) !== 0) {
          this.islist4 = true
          this.list4.push({
            label: '综合收入',
            money: totalIncome - refund
          })
        }
        if (res.free_amount !== 0) {
          this.islist4 = true
          this.list4.push({
            label: '免单金额汇总',
            money: res.free_amount
          })
        }
        if (res.discount_amount !== 0) {
          this.islist4 = true
          this.list4.push({
            label: '折扣金额汇总',
            money: res.discount_amount
          })
        }
        if (res.round_amount !== 0) {
          this.islist4 = true
          this.list4.push({
            label: '抹零金额汇总',
            money: res.round_amount
          })
        }
        if (res.presenter_amount !== 0) {
          this.islist4 = true
          this.list4.push({
            label: '赠送金额汇总',
            money: res.presenter_amount
          })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.statistics {
  width: 300px;
  font-size: 12px;
  color: #333333;
  .item {
    line-height: 2;
    text-align: center;
    width: 25%;
  }
  .money {
    font-size: 16px;
  }
}
.yd {
  line-height: 2;
  .sp {
    padding-bottom: 10px;
  }
}
.title {
  position: relative;
  padding-left: 12px;
  font-size: 16px;
  font-weight: 700;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 4px;
    width: 4px;
    height: 100%;
    background: #409EFF;
  }
}
</style>
