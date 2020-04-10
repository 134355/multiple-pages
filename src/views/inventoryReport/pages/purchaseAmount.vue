<template>
  <div class="purchaseAmount">
    <dc-form :form="form" @submit="submit" @export="handelexport"></dc-form>
    <div id="chartH" style="width: 100%; height: 350px;"></div>
    <el-table
      :data="dataList"
      style="width: 100%">
      <el-table-column
        prop="intelligent_datetime"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sv_in_amounts"
        label="进货额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sv_in_count"
        label="进货笔数">
      </el-table-column>
    </el-table>
    <el-pagination
      class="m-top-10"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
import echarts from 'echarts'
import { getCommonBranchStorelist, getProInStockStaInfoExcel, getProInStockStaInfo } from '@/api/index'
import { download } from '@/utils/utils'
export default {
  name: 'PurchaseAmount',
  data () {
    return {
      plainx1: [],
      plainReceivables1: [],
      dataList: [],
      total: 0,
      page: 1,
      pagesize: 10,
      startdate: '',
      enddate: '',
      keywards: '',
      user_id: '',
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
    const datamodel = JSON.parse(sessionStorage.getItem('datamodel')) || {}
    if (datamodel.isStore) {
      this.form.item.splice(1, 1)
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      this.getProInStockStaInfo()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getProInStockStaInfo()
    },
    submit (data) {
      this.startdate = data.startdate
      this.keywards = data.keywards
      this.enddate = data.enddate
      this.user_id = data.user_id
      this.getProInStockStaInfo()
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
        grid: {
          left: '5%',
          right: '5%'
        },
        legend: {
          data: ['进货额']
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
            name: '进货额',
            type: 'bar',
            color: '#3992F9',
            data: this.plainReceivables1
          }
        ]
      })
    },
    getProInStockStaInfo () {
      const data = {
        page: this.page,
        pagesize: this.pagesize,
        startdate: this.startdate,
        enddate: this.enddate,
        keywards: this.keywards,
        user_id: this.user_id
      }
      getProInStockStaInfo(data).then(res => {
        this.dataList = res.dataList
        this.total = res.total
        this.plainx1 = []
        this.plainReceivables1 = []
        res.allDataList.forEach(item => {
          this.plainx1.push(item.intelligent_datetime)
          this.plainReceivables1.push(item.sv_in_amounts)
        })
        this.drawPlain1('chartH')
        console.log(res)
      })
    },
    handelexport (data) {
      getProInStockStaInfoExcel({
        page: this.page,
        pagesize: this.pagesize,
        startdate: data.startdate,
        enddate: data.enddate,
        keywards: data.keywards,
        user_id: data.user_id
      }).then(res => {
        download(res)
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
