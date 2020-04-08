<template>
  <div class="storeOverview">
    <div style="background: #ffffff; padding: 10px;">
      <dc-form :form="form" @submit="getProductAnalysisByShop" @export="getProAnaByShopExcel"></dc-form>
      <el-row class="min-flex">
        <div class="tol min-flex min-flex-1 min-flex-dir-top">
          <div>营业总额</div>
          <div class="money">￥{{this.order_total_receivables}}</div>
        </div>
        <div class="tol min-flex min-flex-1 min-flex-dir-top">
          <div>实收金额</div>
          <div class="money">￥{{this.order_total_receivable}}</div>
        </div>
        <div class="tol min-flex min-flex-1 min-flex-dir-top">
          <div>未结金额</div>
          <div class="money">￥{{this.order_total_unreceivable}}</div>
        </div>
        <div class="tol min-flex min-flex-1 min-flex-dir-top">
          <div>优折赠</div>
          <div class="money">￥{{this.order_total_pdgfee}}</div>
        </div>
      </el-row>
    </div>
    <el-row v-show="isSingle">
      <el-col class="min-flex">
        <div class="min-flex-1" style="text-align:center;line-height: 50px; background: #ffffff; margin: 10px 10px 10px 0;">
          <div>门店营业额统计</div>
          <div id="chartH" style="width: 100%; height: 350px;"></div>
        </div>
      </el-col>
    </el-row>
    <el-row v-show="!isSingle">
      <el-col class="min-flex">
        <div class="min-flex-3" style="text-align:center;line-height: 50px; background: #ffffff; margin: 10px 10px 10px 0;">
          <div>门店营业额统计</div>
          <div id="chartH1" style="width: 1200px; height: 350px"></div>
        </div>
        <div class="min-flex-1" style="text-align:center;line-height: 50px; background: #ffffff; margin: 10px 0;">
          <div>支付构成</div>
          <div id="chartY" style="width: 500px; height: 350px"></div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="dataList">
        <el-table-column
          prop="sv_us_name"
          label="门店名称">
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="门店编号">
        </el-table-column>
        <el-table-column
          prop="orderciunt"
          label="消费笔数">
        </el-table-column>
        <el-table-column
          prop="order_receivables"
          label="营业总额">
        </el-table-column>
        <el-table-column
          prop="storedsalesamount"
          label="储值消费金额">
        </el-table-column>
        <el-table-column
          prop="order_unreceivable"
          label="未结金额">
        </el-table-column>
        <el-table-column
          prop="order_aintegral"
          label="积分抵扣">
        </el-table-column>
        <el-table-column
          prop="order_pdgfee"
          label="优折赠">
        </el-table-column>
        <el-table-column
          prop="retrun_receivable"
          label="退货金额">
        </el-table-column>
        <el-table-column
          prop="clean_receivable"
          label="应清金额">
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="background: #ffffff; padding: 10px;" v-if="!isSingle">
      <el-col class="min-ta-right">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <el-row v-show="isSingle">
      <el-col class="min-flex">
        <div class="min-flex-3" style="text-align:center;line-height: 50px; background: #ffffff; margin: 10px 10px 10px 0;">
          <div>会员分析</div>
          <div class="min-flex">
            <div id="chartY1" style="width: 500px; height: 350px"></div>
            <div style="padding-left: 50px; width: 500px">
              <div>
                <div class="min-flex min-flex-main-between">
                  <div>会员总数</div>
                  <div>{{member_count}}人</div>
                </div>
                <el-progress color="#54E58B" :text-inside="true" :stroke-width="26" :percentage="newmember_order_receivable_ratio + oldmember_order_receivable_ratio"></el-progress>
              </div>
              <div>
                <div class="min-flex min-flex-main-between">
                  <div>新增会员</div>
                  <div>{{newmember_count}}人</div>
                </div>
                <el-progress color="#3992F9" :text-inside="true" :stroke-width="26" :percentage="newmember_order_receivable_ratio"></el-progress>
              </div>
              <div>
                <div class="min-flex min-flex-main-between">
                  <div>历史会员</div>
                  <div>{{oldmember_count}}人</div>
                </div>
                <el-progress color="#F79C2C" :text-inside="true" :stroke-width="26" :percentage="oldmember_order_receivable_ratio"></el-progress>
              </div>
            </div>
          </div>
        </div>
        <div class="min-flex-1" style="text-align:center;line-height: 50px; background: #ffffff; margin: 10px 0;">
          <div>支付构成</div>
          <div id="chartY11" style="width: 500px; height: 350px"></div>
        </div>
      </el-col>
    </el-row>

    <el-row v-show="isSingle">
      <el-table
        :data="dataList1">
        <el-table-column
          type="index"
          label="排名">
        </el-table-column>
        <el-table-column
          prop="sv_mr_name"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="sv_mr_cardno"
          label="商品条码">
        </el-table-column>
        <el-table-column
          prop="count"
          label="销售笔数">
        </el-table-column>
        <el-table-column
          prop="order_receivable"
          label="销售金额">
        </el-table-column>
        <el-table-column
          prop="maolili3"
          label="销售毛利">
        </el-table-column>
        <el-table-column
          prop="maolili"
          label="毛利率">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getCommonBranchStorelist, getProductAnalysisByShop, getPaymentAmountInfo, getProAnaByShopExcel, getProductSalesRank, getShopBusAnalysis, getStoreMemberSaleCountInfo, getMemberSalesAnalysis } from '@/api/index'
import { download } from '@/utils/utils'
export default {
  name: 'StoreOverview',
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
        action: ['search', 'reset', 'export']
      },
      member_count: 0,
      newmember_count: 0,
      oldmember_count: 0,
      newmember_order_receivable_ratio: 0,
      oldmember_order_receivable_ratio: 0,
      isSingle: true,
      page: 1,
      total: 10,
      pieData: [],
      pieOp: [],
      pieObj: {},
      pieTotal: 0,
      plainx: [],
      plainx1: [],
      plainReceivables: [],
      plainReceivables1: [],
      plainStoredsalesamount: [],
      plainStoredsalesamount1: [],
      plainPdgfee: [],
      plainPdgfee1: [],
      dataList: [],
      dataList1: [],
      order_total_receivables: 0,
      order_total_receivable: 0,
      order_total_unreceivable: 0,
      order_total_pdgfee: 0
    }
  },
  created () {
    if (window.IsStore) {
      this.form.item.splice(1, 1)
    }
  },
  mounted () {
    this.getProductAnalysisByShop({})
  },
  methods: {
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    getMemberSalesAnalysis (data) {
      getMemberSalesAnalysis(data).then(res => {
        this.member_count = res.member_count
        this.newmember_count = res.newmember_count
        this.oldmember_count = res.oldmember_count
        this.newmember_order_receivable_ratio = res.newmember_order_receivable_ratio * 100
        this.oldmember_order_receivable_ratio = res.oldmember_order_receivable_ratio * 100
      })
    },
    getProductSalesRank (data) {
      getProductSalesRank(data).then(res => {
        this.dataList1 = res && res.dataList
      })
    },
    getStoreMemberSaleCountInfo (data) {
      getStoreMemberSaleCountInfo(data).then(res => {
        let count = 0
        let pieData = []
        const pieOp = []
        const pieObj = {}
        pieData = res.dataList.map(item => {
          count += item.count
          pieOp.push(item.remark)
          return {
            value: item.ratio,
            name: item.remark
          }
        })
        pieData.forEach(item => {
          pieObj[item.name] = `${item.name}    ${item.value}%`
        })
        this.drawPie1('chartY1', '活跃人数', count + '人', pieOp, pieData, pieObj)
      })
    },
    getProductAnalysisByShop (data) {
      const data1 = JSON.parse(JSON.stringify(data))
      const data2 = JSON.parse(JSON.stringify(data))
      const data3 = JSON.parse(JSON.stringify(data))
      const data4 = JSON.parse(JSON.stringify(data))
      const data5 = JSON.parse(JSON.stringify(data))
      const data6 = JSON.parse(JSON.stringify(data))
      this.plainx = []
      this.plainReceivables = []
      this.plainStoredsalesamount = []
      this.plainPdgfee = []
      const userId = data1.user_id ? data1.user_id[data1.user_id.length - 1] : ''
      if (userId === -1) {
        this.isSingle = false
      } else {
        this.isSingle = true
      }
      getProductAnalysisByShop(data1).then(res => {
        this.dataList = res.dataList
        res.dataList.forEach(item => {
          this.plainx.push(item.sv_us_name)
          this.plainReceivables.push(item.order_receivables)
          this.plainStoredsalesamount.push(item.storedsalesamount)
          this.plainPdgfee.push(item.order_pdgfee)
        })
        this.order_total_receivables = res.order_total_receivables
        this.order_total_receivable = res.order_total_receivable
        this.order_total_unreceivable = res.order_total_unreceivable
        this.order_total_pdgfee = res.order_total_pdgfee

        this.drawPlain('chartH1')
      })
      this.getPaymentAmountInfo(data2)
      this.getProductSalesRank(data3)
      this.getShopBusAnalysis(data4)
      this.getStoreMemberSaleCountInfo(data5)
      this.getMemberSalesAnalysis(data6)
    },
    getShopBusAnalysis (data) {
      getShopBusAnalysis(data).then(res => {
        res.dataList.forEach(item => {
          this.plainx1.push(item.intelligent_datetime)
          this.plainReceivables1.push(item.order_receivable)
          this.plainStoredsalesamount1.push(item.order_cardmoney)
          this.plainPdgfee1.push(item.deserved_amount)
        })
        this.drawPlain1('chartH')
      })
    },
    getPaymentAmountInfo (data) {
      this.pieOp = []
      this.pieTotal = 0
      this.pieObj = {}
      getPaymentAmountInfo(data).then(res => {
        this.pieData = res.dataList.map(item => {
          this.pieOp.push(item.payment_method)
          this.pieTotal += item.payment_amount
          return {
            value: item.payment_amount,
            name: item.payment_method
          }
        })
        this.pieData.forEach(item => {
          const v = isNaN(item.value / this.pieTotal) ? 0 : item.value / this.pieTotal

          this.pieObj[item.name] = `${item.name}    ￥${item.value}    ${(v * 100).toFixed(2)}%`
        })
        this.drawPie('chartY')
        this.drawPie('chartY11')
      })
    },
    getProAnaByShopExcel (data) {
      getProAnaByShopExcel(data).then(res => {
        download(res)
      })
    },
    drawPie (id) {
      const charts = echarts.init(document.getElementById(id))
      charts.setOption({
        title: {
          zlevel: 0,
          text: [
            '{name|总金额}',
            '{value|￥' + this.pieTotal + '}'

          ].join('\n'),
          top: 'center',
          left: '29%',
          textAlign: 'center',
          textStyle: {
            rich: {
              value: {
                color: '#303133',
                fontSize: 20,
                fontWeight: 'bold',
                lineHeight: 40
              },
              name: {
                color: '#303133',
                fontSize: 20,
                fontWeight: 'bold',
                lineHeight: 40
              }
            }
          }
        },
        color: ['#3992F9 ', '#54E58B', '#FCD866', '#F79C2C', '#f16093', '#60d1f1', '#d1f160', '#f17460'],
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:￥{c} ({d}%)'
        },
        legend: {
          orient: 'center',
          x: 'right',
          y: 'center',
          formatter: (name) => {
            return this.pieObj[name]
          },
          data: this.pieOp
        },
        series: [
          {
            name: '提示',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            hoverOffset: 2,
            itemStyle: {
              emphasis: {
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: this.pieData
          }
        ]
      })
    },
    drawPie1 (id, title, pieTotal, pieOp, pieData, pieObj) {
      const charts = echarts.init(document.getElementById(id))
      charts.setOption({
        title: {
          zlevel: 0,
          text: [
            `{name|${title}}`,
            `{value|${pieTotal}}`

          ].join('\n'),
          top: 'center',
          left: '29%',
          textAlign: 'center',
          textStyle: {
            rich: {
              value: {
                color: '#303133',
                fontSize: 20,
                fontWeight: 'bold',
                lineHeight: 40
              },
              name: {
                color: '#303133',
                fontSize: 20,
                fontWeight: 'bold',
                lineHeight: 40
              }
            }
          }
        },
        color: ['#3992F9 ', '#54E58B', '#FCD866', '#F79C2C', '#f16093', '#60d1f1', '#d1f160', '#f17460'],
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:({d}%)'
        },
        legend: {
          orient: 'center',
          x: 'right',
          y: 'center',
          formatter: (name) => {
            return pieObj[name]
          },
          data: pieOp
        },
        series: [
          {
            name: '提示',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['30%', '50%'],
            avoidLabelOverlap: false,
            hoverOffset: 2,
            itemStyle: {
              emphasis: {
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              normal: {
                show: false
              }
            },
            data: pieData
          }
        ]
      })
    },
    drawPlain (id) {
      const charts = echarts.init(document.getElementById(id))
      charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['营业总额', '储值消费金额', '优折赠']
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: this.plainx
        },
        series: [
          {
            name: '营业总额',
            type: 'bar',
            color: '#3992F9',
            data: this.plainReceivables
          },
          {
            name: '储值消费金额',
            type: 'bar',
            color: '#54E58B',
            data: this.plainStoredsalesamount
          },
          {
            name: '优折赠',
            type: 'bar',
            color: '#F79C2C',
            data: this.plainPdgfee
          }
        ]
      })
    },
    drawPlain1 (id) {
      const charts = echarts.init(document.getElementById(id))
      charts.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['营业总额', '储值消费金额', '优折赠']
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: this.plainx1
        },
        series: [
          {
            name: '营业总额',
            type: 'bar',
            color: '#3992F9',
            data: this.plainReceivables1
          },
          {
            name: '储值消费金额',
            type: 'bar',
            color: '#54E58B',
            data: this.plainStoredsalesamount1
          },
          {
            name: '优折赠',
            type: 'bar',
            color: '#F79C2C',
            data: this.plainPdgfee1
          }
        ]
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.storeOverview {
  .tol {
    line-height: 2;
  }
  .money {
    text-align: center;
    color: #000;
    font-weight: 600;
    font-size: 26px;
  }
}
</style>
