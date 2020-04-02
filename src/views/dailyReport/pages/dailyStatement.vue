<template>
  <div class="dailyStatement p-lr-20 p-tb-10">
    <el-row>
      <el-col :span="12" class="min-flex min-flex-main-start">
        <el-button type="primary" icon="el-icon-printer" class="m-right-10">打印</el-button>
        <DcDatePicker v-model="date"/>
      </el-col>
      <el-col :span="12" class="min-ta-right">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      <el-col :span="styleStatus">
        <div class="title m-bottom-20">支付消费统计</div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="1">会员人数170</el-radio-button>
          <el-radio-button label="2">散客34</el-radio-button>
        </el-radio-group>
        <div id="chartColumn" style="width: 300px; height: 160px;"></div>
      </el-col>
      <el-col :span="styleStatus">
        <div class="title m-bottom-20">新增会员统计</div>
        <div id="chartColumn1" style="width: 300px; height: 160px;"></div>
      </el-col>
      <el-col :span="styleStatus">
        <div class="title">会员储值金额</div>
        <DcReceipt :list="list" />
      </el-col>
      <el-col :span="styleStatus">
        <div class="title">充次金额</div>
        <DcReceipt :list="list" />
      </el-col>
      <el-col :span="styleStatus">
        <div class="title">次卡售卡统计</div>
        <DcReceipt1 :list="list1" />
      </el-col>
      <el-col :span="styleStatus">
        <div class="title">退货金额</div>
        <DcReceipt :list="list" />
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
import { getDailyBillInfo } from '@/api'

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
      radio1: 1,
      styleStatus: 24,
      date: [],
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
      list1: [
        {
          label: '现金',
          num: 18,
          money: 500.0
        },
        {
          label: '微信',
          num: 98,
          money: 500.0
        },
        {
          label: '支付宝',
          num: 199,
          money: 500.0
        },
        {
          label: '银联卡',
          num: 189,
          money: 500.0
        }
      ],
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.drawPie('chartColumn')
      this.drawPie('chartColumn1')
    })
    getDailyBillInfo({}).then(res => {
      console.log(res)
      this.totalData = res.totalData
    })
  },
  methods: {
    drawPie (id) {
      this.charts = echarts.init(document.getElementById(id))
      this.charts.setOption({
        title: {
          zlevel: 0,
          text: [
            '{name|总金额}',
            '{value|￥' + 100000 + '}'

          ].join('\n'),
          top: 'center',
          left: '18%',
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
          x: 'right',
          y: 'center',
          formatter: (name) => {
            return this.obj[name]
          },
          data: this.opinion
        },
        series: [
          {
            name: '状态',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['20%', '50%'],
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
            data: this.opinionData
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
    background: #409EFF;
  }
}
</style>
