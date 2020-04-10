<template>
  <div class="businessStatement">
    <dc-form :form="form" @submit="handleSubmit" @export="handleExport"></dc-form>
    <!-- <min-view @load="handleLoad">
      <template #search-form-action-export="scope">
        <el-button @click="handleExport(scope)">导出</el-button>
      </template>
    </min-view> -->
    <el-table
      :data="dataList"
      style="width: 100%">
      <el-table-column
        prop="intelligent_datetime"
        label="日期"
        width="150"
        align="center">
      </el-table-column>
      <el-table-column
        label="客服类型"
        align="center">
        <el-table-column
          prop="total_transactions"
          label="总成交笔数"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="member_consume_amount"
          label="会员消费"
          align="center">
        </el-table-column>
        <el-table-column
          prop="consume_amount"
          label="会员笔数"
          align="center">
        </el-table-column>
        <el-table-column
          prop="memnber_transactions_num"
          label="散客消费"
          align="center">
        </el-table-column>
        <el-table-column
          prop="transactions_num"
          label="散客笔数"
          align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="销售类型"
        align="center">
        <el-table-column
          prop="general_product_totalamount"
          label="产品总额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="service_product_totalamount"
          label="服务商品总额"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="recharge_totalamount"
          label="充值总额"
          align="center">
        </el-table-column>
        <el-table-column
          prop="timescount_totalamount"
          label="充次总额"
          align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="支付方式"
        align="center">
        <el-table-column
          prop="order_cashmoney"
          label="现金"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_bankcardmoney"
          label="银行卡"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_wechatmoney"
          label="微信"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_wechataccountmoney"
          label="微信记账"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_alipaymoney"
          label="支付宝"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_alipayaccountmoney"
          label="支付宝记账"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_cardmoney"
          label="储值卡"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_scanmoney"
          label="扫码支付"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_couponmoney"
          label="优惠劵"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_meituanmoney"
          label="美团"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_praisemoney"
          label="口碑"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_shanhuimoney"
          label="闪惠"
          align="center">
        </el-table-column>
        <el-table-column
          prop="order_oncreditmoney"
          label="赊账"
          align="center">
        </el-table-column>
        <el-table-column
          v-for="item in order_custompaymentlist"
          :key="item.custompayment_name"
          :label="item.custompayment_name"
          :prop="item.custompayment_name"
          align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column
        label="营业外收入"
        align="center">
        <el-table-column
          prop="rechargerecord_cashmoney"
          label="现金"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rechargerecord_bankcardmoney"
          label="银行卡"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rechargerecord_wechatmoney"
          label="微信"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rechargerecord_wechataccountmoney"
          label="微信记账"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rechargerecord_alipaymoney"
          label="支付宝"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rechargerecord_alipayaccountmoney"
          label="支付宝记账"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="rechargerecord_cardmoney"
          label="储值卡"
          align="center">
        </el-table-column>
        <el-table-column
          v-for="item in recharge_custompaymentlist"
          :key="item.custompayment_name"
          :label="item.custompayment_name"
          :prop="item.custompayment_name"
          align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="deserved_amount"
        label="优折赠"
        align="center">
      </el-table-column>
      <el-table-column
        prop="return_amount"
        label="退款金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="order_receivable"
        label="实收现金"
        align="center">
      </el-table-column>
    </el-table>
    <el-row class="m-top-10 min-ta-right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
import { getCommonBranchStorelist, getUserBusinessInfo, getUserBusinessExcel } from '@/api/index'
import { download } from '@/utils/utils'
export default {
  name: 'BusinessStatement',
  data () {
    return {
      page: 1,
      pagesize: 10,
      enddate: '',
      startdate: '',
      user_id: [],
      dataList: [],
      order_custompaymentlist: [],
      recharge_custompaymentlist: [],
      total: 0,
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
                placeholder: '请选择门店'
              }
            }
          }
        ],
        action: ['search', 'reset', 'export']
      }
    }
  },
  created () {
    const datamodel = JSON.parse(sessionStorage.getItem('datamodel')) || {}
    if (datamodel.isStore) {
      this.form.item.splice(1, 1)
    }
    this.getUserBusinessInfo()
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      this.getUserBusinessInfo()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getUserBusinessInfo()
    },
    handleSubmit (e) {
      this.enddate = e.enddate
      this.startdate = e.startdate
      this.user_id = e.user_id
      this.getUserBusinessInfo()
    },
    getUserBusinessInfo () {
      getUserBusinessInfo({
        page: this.page,
        pagesize: this.pagesize,
        enddate: this.enddate,
        startdate: this.startdate,
        user_id: this.user_id
      }).then(res => {
        this.total = res.total
        this.order_custompaymentlist = res.dataList[0] && res.dataList[0].order_custompaymentlist
        this.recharge_custompaymentlist = res.dataList[0] && res.dataList[0].recharge_custompaymentlist
        res.dataList.map(item => {
          item.recharge_custompaymentlist.forEach(i => {
            item[i.custompayment_name] = i.custompayment_amount
          })
          item.order_custompaymentlist.forEach(i => {
            item[i.custompayment_name] = i.custompayment_amount
          })

          return item
        })
        this.dataList = res.dataList
        console.log(this.dataList)
      })
    },
    handleExport (e) {
      this.enddate = e.enddate
      this.startdate = e.startdate
      this.user_id = e.user_id
      getUserBusinessExcel({
        page: this.page,
        pagesize: this.pagesize,
        enddate: this.enddate,
        startdate: this.startdate,
        user_id: this.user_id
      }).then(res => {
        download(res)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.businessStatement {
  padding: 10px;
  background: #ffffff;
}
</style>
