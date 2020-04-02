<template>
  <div class="dcDatePicker">
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['00:00:00', '23:59:59']"
    >
    </el-date-picker>
  </div>
</template>

<script>

export default {
  name: 'DcDatePicker',
  props: ['value'],
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          // const curDate = (new Date()).getTime()
          // const day = 15552000000
          // const dateRegion = curDate - day
          const start = new Date()
          start.setHours(23)
          start.setMinutes(59)
          start.setSeconds(59)
          // return time.getTime() > start.getTime() || time.getTime() < dateRegion
          return time.getTime() > start.getTime()
        },
        shortcuts: [
          {
            text: '今日',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setHours(0)
              start.setMinutes(0)
              start.setSeconds(0)
              end.setHours(23)
              end.setMinutes(59)
              end.setSeconds(59)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨日',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setDate(start.getDate() - 1)
              start.setHours(0)
              start.setMinutes(0)
              start.setSeconds(0)
              end.setDate(end.getDate() - 1)
              end.setHours(23)
              end.setMinutes(59)
              end.setSeconds(59)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近七天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setDate(start.getDate() - 6)
              start.setHours(0)
              start.setMinutes(0)
              start.setSeconds(0)
              end.setHours(23)
              end.setMinutes(59)
              end.setSeconds(59)
              picker.$emit('pick', [start, end])
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setDate(start.getDate() - 30)
              start.setHours(0)
              start.setMinutes(0)
              start.setSeconds(0)
              end.setHours(23)
              end.setMinutes(59)
              end.setSeconds(59)
              picker.$emit('pick', [start, end])
              picker.$emit('pick', [start, end])
            }
          }
          // {
          //   text: '近三个月',
          //   onClick (picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setDate(start.getDate() - 90)
          //     start.setHours(0)
          //     start.setMinutes(0)
          //     start.setSeconds(0)
          //     end.setHours(23)
          //     end.setMinutes(59)
          //     end.setSeconds(59)
          //     picker.$emit('pick', [start, end])
          //     picker.$emit('pick', [start, end])
          //   }
          // },
          // {
          //   text: '近六个月',
          //   onClick (picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setDate(start.getDate() - 180)
          //     start.setHours(0)
          //     start.setMinutes(0)
          //     start.setSeconds(0)
          //     end.setHours(23)
          //     end.setMinutes(59)
          //     end.setSeconds(59)
          //     picker.$emit('pick', [start, end])
          //     picker.$emit('pick', [start, end])
          //   }
          // }
        ]
      }
    }
  },
  computed: {
    value1: {
      set (e) {
        function format (date, fmt) {
          var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
          }
          if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
          for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
          }
          return fmt
        }
        e = e || []
        e = e.map(item => {
          return format(item, 'yyyy-MM-dd hh:mm:ss')
        })
        this.$emit('input', e)
      },
      get () {
        return this.value
      }
    }

  }
}
</script>
