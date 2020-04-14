<template>
  <div class="dailyStatement p-lr-20 p-tb-10">
    <el-row>
      <el-col :span="12" class="min-flex min-flex-main-start">
        <el-button type="primary" icon="el-icon-printer" class="m-right-10">打印</el-button>
        <DcDatePicker v-model="date"/>
        <el-button type="primary" class="m-left-10" @click="getDailyBillInfo">搜索</el-button>
      </el-col>
      <el-col :span="12" class="min-ta-right" v-if="!showStore">
        <el-cascader v-model="value" :options="options" placeholder="请选择门店" @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>
    <el-row class="m-top-20">
      <div class="statistics min-flex min-flex-wrap-wrap">
        <div class="item" v-for="item in totalData" :key="item.payment">
          <div>{{item.payment}}</div>
          <div class="money">{{item.amount}}</div>
        </div>
      </div>
    </el-row>
    <el-row class="m-top-20">
      <!-- <el-col :span="styleStatus">
        <div class="title m-bottom-20">支付消费统计</div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="1">{{head1}}</el-radio-button>
          <el-radio-button label="2">{{head2}}</el-radio-button>
        </el-radio-group>
        <div v-show="radio1 === '1' && opinionData1.length !== 0" id="chartColumn" style="width: 500px; height: 400px;">
        </div>
        <div v-show="radio1 === '2' && iopinionData1.length !== 0" id="chartColumnx" style="width: 500px; height: 400px;"></div>
        <div v-if="radio1 === '1' && opinionData1.length === 0" style="padding: 20px;">暂无数据</div>
        <div v-if="radio1 === '2' && iopinionData1.length === 0" style="padding: 20px;">暂无数据</div>
      </el-col> -->
      <!-- <el-col :span="styleStatus">
        <div class="title m-bottom-20">新增会员统计</div>
        <div v-show="opinionData.length !== 0" id="chartColumn1" style="width: 500px; height: 400px;"></div>
        <div v-if="opinionData.length === 0" style="padding: 20px;">暂无数据</div>
      </el-col> -->
      <el-col :span="styleStatus" v-if="membert1">
        <div class="title">会员消费统计</div>
        <DcReceipt :list="list7" />
      </el-col>
      <el-col :span="styleStatus" v-if="sanke">
        <div class="title">散客消费统计</div>
        <DcReceipt :list="list6" />
      </el-col>
      <el-col :span="styleStatus" v-if="membert">
        <div class="title">新增会员统计</div>
        <DcReceipt :list="list5" />
      </el-col>
      <el-col :span="styleStatus" v-if="member">
        <div class="title">会员储值金额</div>
        <DcReceipt :list="list3" />
      </el-col>
      <el-col :span="styleStatus" v-if="mitsuji">
        <div class="title">充次金额</div>
        <DcReceipt :list="list4" />
      </el-col>
      <el-col :span="styleStatus" v-if="secondaryCard">
        <div class="title">次卡售卡统计</div>
        <DcReceipt1 :list="list1" />
      </el-col>
      <el-col :span="styleStatus" v-if="refund">
        <div class="title">退货金额</div>
        <DcReceipt :list="list2" />
      </el-col>
    </el-row>
    <el-button style="width: 300px;" type="primary" icon="el-icon-printer" class="m-right-10">打印</el-button>
  </div>
</template>

<script>
import echarts from 'echarts'
import DcDatePicker from '@/components/DcDatePicker'
import DcReceipt from '../components/DcReceipt'
import DcReceipt1 from '../components/DcReceipt1'
import { getDailyBillInfo, getCommonBranchStorelist } from '@/api'

export default {
  name: 'DailyStatement',
  components: {
    DcDatePicker,
    DcReceipt,
    DcReceipt1
  },
  data () {
    return {
      totalData: [],
      radio1: '1',
      styleStatus: 24,
      userId: '',
      date: [],
      head1: '会员人数',
      head2: '散客人数',
      list: [
        {
          label: '现金',
          money: 500.0
        },
        {
          label: '微信',
          money: 500.0
        },
        {
          label: '支付宝',
          money: 500.0
        },
        {
          label: '银联卡',
          money: 500.0
        }
      ],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      list7: [],
      charts: '',
      opinion: ['支付宝', '微信', '现金', '龙支付'],
      opinionData: [
        { value: 11312, name: '支付宝', itemStyle: '#1ab394' },
        { value: 18133, name: '微信', itemStyle: '#79d2c0' },
        { value: 11238, name: '现金', itemStyle: '#79d2c0' },
        { value: 12241, name: '龙支付', itemStyle: '#79d2c0' }
      ],
      obj: {
        支付宝: '支付宝   ￥11312  10%',
        微信: '微信   ￥11312  10%',
        现金: '现金   ￥11312  10%',
        龙支付: '龙支付   ￥11312  10%'
      },
      options: [],
      value: '',
      livemodel: {},
      mamount: 0,
      opinion1: [],
      obj1: {},
      opinionData1: [],
      iamount: 0,
      iopinion1: [],
      iobj1: {},
      iopinionData1: [],
      secondaryCard: false,
      refund: false,
      mitsuji: false,
      member: false,
      membert: false,
      sanke: false,
      membert1: false,
      showStore: true
    }
  },
  created () {
    const datamodel = JSON.parse(sessionStorage.getItem('datamodel')) || {}
    this.showStore = datamodel.isStore
  },
  mounted () {
    this.getDailyBillInfo()
    getCommonBranchStorelist().then(res => {
      this.options = res
    })
  },
  methods: {
    handleChange (e) {
      this.userId = e ? e[e.length - 1] : ''
      this.getDailyBillInfo()
    },
    getDailyBillInfo () {
      getDailyBillInfo({
        startdate: this.date[0],
        enddate: this.date[1],
        user_id: this.userId
      }).then(res => {
        this.refund = false
        this.secondaryCard = false
        this.mitsuji = false
        this.member = false
        this.membert1 = false
        this.membert = false
        this.sanke = false
        this.totalData = res.totalData
        // const opinion = []
        // const obj = {}
        // const liveCount = res.livemodel.liveCount
        // const opinionData = res.livemodel.livemodel.map(item => {
        //   opinion.push(item.name)
        //   const count = isNaN(item.count / res.livemodel.liveCount) ? 0 : ((item.count / res.livemodel.liveCount) * 100).toFixed(2)
        //   obj[item.name] = `${item.name}    ${item.count}￥    ${count}%`
        //   return {
        //     name: item.name,
        //     value: item.count
        //   }
        // })

        if (res.livemodel && res.livemodel.liveCount !== 0) {
          this.membert = true
          const liveCount = res.livemodel.liveCount
          res.livemodel.livemodel.forEach(item => {
            if (item.count !== '0') {
              this.list5.push({
                label: item.name,
                money: item.count
              })
            }
          })
          this.list5.push({
            label: '合计',
            money: liveCount
          })
        }

        // if (res.memberConsumeData) {
        //   this.mamount = res.memberConsumeData.amount
        //   this.opinion1 = []
        //   this.obj1 = {}
        //   this.head1 = res.memberConsumeData.head
        //   this.opinionData1 = res.memberConsumeData.consumeData.map(item => {
        //     this.opinion1.push(item.payment)
        //     const count = isNaN(item.amount / this.mamount) ? 0 : ((item.amount / this.mamount) * 100).toFixed(2)
        //     this.obj1[item.payment] = `${item.payment}   ${item.amount}￥   ${count}%`
        //     return {
        //       name: item.payment,
        //       value: item.amount
        //     }
        //   })
        // }

        if (res.memberConsumeData && res.memberConsumeData.amount !== 0) {
          this.membert1 = true
          const amount = res.memberConsumeData.amount
          res.memberConsumeData.consumeData.forEach(item => {
            this.list7.push({
              label: item.payment,
              money: item.amount
            })
          })
          this.list7.push({
            label: '合计',
            money: amount
          })
        }

        // if (res.individualConsumeData) {
        //   this.iamount = res.individualConsumeData.amount

        //   this.iopinion1 = []
        //   this.iobj1 = {}
        //   this.head2 = res.individualConsumeData.head
        //   this.iopinionData1 = res.individualConsumeData.consumeData.map(item => {

        //     this.iopinion1.push(item.payment)
        //     const count = isNaN(item.amount / this.iamount) ? 0 : ((item.amount / this.iamount) * 100).toFixed(2)
        //     this.iobj1[item.payment] = `${item.payment}   ${item.amount}￥   ${count}%`
        //     return {
        //       name: item.payment,
        //       value: item.amount
        //     }
        //   })
        // }

        if (res.individualConsumeData && res.individualConsumeData.amount !== 0) {
          this.sanke = true
          const amount = res.individualConsumeData.amount
          res.individualConsumeData.consumeData.forEach(item => {
            this.list6.push({
              label: item.payment,
              money: item.amount
            })
          })
          this.list6.push({
            label: '合计',
            money: amount
          })
        }

        let totalNum = 0
        let totalMoney = 0
        if (res.subcardsalescarddata) {
          this.secondaryCard = true
          this.list1 = res.subcardsalescarddata.subcardsalescard.map(item => {
            totalNum += item.number
            totalMoney += item.amount
            return {
              label: item.name,
              num: item.number,
              money: item.amount
            }
          })
          this.list1.push({
            label: '合计',
            num: totalNum,
            money: totalMoney
          })
        }

        let totalMoney1 = 0
        if (res.refundData) {
          this.refund = true
          this.list2 = res.refundData.consumeData.map(item => {
            totalMoney1 += item.amount
            return {
              label: item.payment,
              money: item.amount
            }
          })
          this.list2.push({
            label: '合计',
            money: totalMoney1
          })
        }

        let totalMoney2 = 0
        if (res.membeRechargeData) {
          this.member = true
          this.list3 = res.membeRechargeData.consumeData.map(item => {
            totalMoney2 += item.amount
            return {
              label: item.payment,
              money: item.amount
            }
          })
          this.list3.push({
            label: '合计',
            money: totalMoney2
          })
        }

        let totalMoney3 = 0
        if (res.membeChargeSubData) {
          this.mitsuji = true
          this.list4 = res.membeChargeSubData.consumeData.map(item => {
            totalMoney3 += item.amount
            return {
              label: item.payment,
              money: item.amount
            }
          })
          this.list4.push({
            label: '合计',
            money: totalMoney3
          })
        }
        // this.drawPie('chartColumn1', opinion, opinionData, obj, liveCount)
        // this.drawPie('chartColumn', this.opinion1, this.opinionData1, this.obj1, this.mamount)
        // this.drawPie('chartColumnx', this.iopinion1, this.iopinionData1, this.iobj1, this.iamount)
      })
    },
    drawPie (id, opinion, opinionData, obj, liveCount) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          zlevel: 0,
          text: [
            '{name|总金额}',
            '{value|￥' + liveCount + '}'

          ].join('\n'),
          top: 'center',
          left: '58%',
          textAlign: 'center',
          textStyle: {
            rich: {
              value: {
                color: '#303133',
                fontSize: 12,
                fontWeight: 'bold',
                lineHeight: 20
              },
              name: {
                color: '#303133',
                fontSize: 12,
                fontWeight: 'bold',
                lineHeight: 20
              }
            }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b}:￥{c} ({d}%)'
        },
        color: ['#3992F9 ', '#54E58B', '#FCD866', '#F79C2C', '#f16093', '#60d1f1', '#d1f160', '#f17460'],
        legend: {
          orient: 'center',
          x: 'left',
          y: 'center',
          formatter: (name) => {
            return obj[name]
          },
          data: opinion
        },
        series: [
          {
            name: '状态',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['60%', '50%'],
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
            data: opinionData
          }
        ]
      })
    }
  }
}
</script>
<style >
.dailyStatement .el-radio-button__inner {
  padding: 6px 14px;
  font-size: 12px;
}
</style>

<style lang="scss" scoped>
@import '../../../../element-variables.scss';
.w500 {
  width: 500px;
}
.w0 {
  width: 0px;
}
.dailyStatement {
  background: #ffffff;
}
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
    background: $--color-primary;
  }
}
</style>
