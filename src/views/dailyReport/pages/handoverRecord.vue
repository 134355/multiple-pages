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
      <div>
        <div>
          <div class="min-flex">收银对账单</div>
          <div class="min-flex"><span>{{startTime}}</span><span>{{endTime}}</span></div>
        </div>
        <el-row class="m-top-20">
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
              <div>综合总收入</div>
              <div class="money">0</div>
            </div>
          </div>
        </el-row>
        <!-- <el-row class="m-top-20">
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
        </el-row> -->

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getChangeShiftsInfo, getReconciliationInfo } from '@/api'
export default {
  name: 'HandoverRecord',
  data () {
    return {
      name: '管理员',
      dialogVisible: false,
      generalIncome: 0,
      startTime: '',
      endTime: ''
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
              label: '开始时间'
            },
            {
              prop: 'end_time',
              label: '结束时间'
            },
            {
              prop: 'succession_time',
              label: '交接时间'
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
      console.log(row.operator_id)
      getReconciliationInfo().then(res => {
        this.dialogVisible = true
        console.log(res)
        this.generalIncome = res.generalIncome
        this.startTime = res.startTime
        this.endTime = res.endTime
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
</style>
