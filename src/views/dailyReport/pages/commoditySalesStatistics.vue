<template>
  <div class="commoditySalesStatistics">
    <min-view @load="handleLoad" ref="minView">
      <template #table-sv_p_name="scope">
        <el-tooltip class="item" effect="dark" :content="scope.row.sv_p_name" placement="top-start">
          <span class="min-ellipsis">{{scope.row.sv_p_name}}</span>
        </el-tooltip>
      </template>
      <template #search-form-action-export="scope">
        <el-button @click="handleExport(scope)">导出</el-button>
      </template>
      <!-- <template #table-action-analysis="row">
        <el-button type="text" @click="handleReconciliation(row)">趋势分析</el-button>
      </template> -->
      <template #table-action-member="row">
        <el-button type="text" @click="handleMember(row)">会员记录</el-button>
      </template>
    </min-view>

    <el-dialog title="会员记录" :visible.sync="dialogTableVisible">
      <el-table :data="memberData">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="sv_mr_name" label="会员名称"></el-table-column>
        <el-table-column prop="member_card_no" label="会员卡号"></el-table-column>
        <el-table-column prop="sv_mr_mobile" label="会员电话"></el-table-column>
        <el-table-column prop="product_name" label="商品名称"></el-table-column>
        <el-table-column prop="sv_p_barcode" label="商品编码"></el-table-column>
        <el-table-column prop="product_num" label="数量"></el-table-column>
        <el-table-column prop="sv_p_unit" label="单位"></el-table-column>
        <el-table-column prop="product_type" label="类型"></el-table-column>
        <el-table-column prop="order_list_datetime" label="消费时间"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { getProSaleStaInfo, proSaleStaExcel, getFirstCategory, getCommonBranchStorelist, getMemberSaleStaDetailInfo } from '@/api/index'

export default {
  name: 'CommoditySalesStatistics',
  data () {
    return {
      memberData: [],
      dialogTableVisible: false,
      formItem: [
        {
          prop: 'is_exist_sale',
          name: 'el-select',
          component: {
            style: {
              width: '150px'
            },
            props: {
              placeholder: '请选择'
            },
            options: [
              {
                label: '全部',
                value: -1
              },
              {
                label: '有销量',
                value: 1
              },
              {
                label: '无销量',
                value: 0
              }
            ]
          }
        },
        {
          prop: 'sv_pc_id',
          name: 'el-select',
          service: getFirstCategory,
          component: {
            style: {
              width: '150px'
            },
            props: {
              placeholder: '请选择分类'
            }
          }
        },
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
      ]
    }
  },
  created () {
    if (window.IsStore) {
      this.formItem.splice(3, 1)
    }
  },
  methods: {
    handleLoad (app) {
      app
        .set('service', {
          page: getProSaleStaInfo
        })
        .set('table', {
          columns: [
            {
              type: 'selection',
              align: 'center',
              width: '50'
            },
            {
              prop: 'sv_p_name',
              label: '商品名称',
              fixed: 'left',
              width: '250px'
            },
            {
              prop: 'sv_p_barcode',
              label: '商品编码',
              width: '150px'
            },
            {
              prop: 'sv_p_specs',
              label: '规格'
            },
            {
              prop: 'address',
              label: '一级类别'
            },
            {
              prop: 'sv_p_unit',
              label: '单位'
            },
            {
              prop: 'sv_p_storage',
              label: '系统库存'
            },
            {
              prop: 'product_sale_num',
              label: '销售数量'
            },
            {
              prop: 'product_total_price',
              label: '商品总售价'
            },
            {
              prop: 'product_receivable',
              label: '实收金额'
            },
            {
              prop: 'product_rec_proportion',
              label: '实收占比'
            },
            {
              prop: 'product_profit',
              label: '销售毛利'
            },
            {
              prop: 'product_profit_margin',
              label: '毛利率'
            }
          ],
          action: {
            label: '操作',
            width: '210',
            item: ['analysis', 'member']
          }
        })
        .set('searchForm', {
          item: this.formItem,
          keyWords: {
            prop: 'keywards',
            placeholder: '输入商品名称/商品编码查询',
            style: {
              width: '270px'
            }
          },
          action: ['search', 'reset', 'export']
        })
        .set('action', [])
        .done()
    },
    handleExport (data) {
      proSaleStaExcel(data).then(res => {
        // 无闪现下载excel
        function download (url) {
          const iframe = document.createElement('iframe')
          iframe.style.display = 'none'
          function iframeLoad () {
            const win = iframe.contentWindow
            if (win.location.href === url) {
              iframe.parentNode.removeChild(iframe)
            }
          }
          if ('onload' in iframe) {
            iframe.onload = iframeLoad
          } else if (iframe.attachEvent) {
            iframe.attachEvent('onload', iframeLoad)
          } else {
            iframe.onreadystatechange = function onreadystatechange () {

            }
          }
          iframe.src = ''
          document.body.appendChild(iframe)

          setTimeout(function loadUrl () {
            iframe.contentWindow.location.href = url
          }, 50)
        }
        download(res)
      })
    },
    handleMember (data) {
      const { formData } = this.$refs.minView.searchForm
      const userId = formData.user_id ? formData.user_id[formData.user_id.length - 1] : ''
      const obj = {
        startdate: formData.startdate,
        enddate: formData.enddate,
        user_id: userId,
        product_id: data.product_id
      }
      this.dialogTableVisible = true
      getMemberSaleStaDetailInfo(obj).then(res => {
        this.memberData = res.dataList
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
