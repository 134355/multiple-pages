<template>
  <div class="receipt1">
    <table>
      <tr>
        <td class="label">项目名称</td>
        <td class="label min-ta-right">数量</td>
        <td class="label min-ta-right">金额</td>
      </tr>
      <tr v-for="(item, index) in list" :key="index">
        <td class="label">{{item.label}}</td>
        <td class="min-ta-right">{{item.num}}</td>
        <td class="min-ta-right">{{item.money}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Receipt1',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang='scss' scoped>
.receipt1 {
  padding: 10px;
  width: 300px;
  font-size: 14px;
  color: #333333;
  line-height: 2;
  table {
    width: 100%;
    tr {
      width: 100%;
    }
    td {
      width: 33.33%;
    }
    .label {
      font-weight: 700;
    }
  }
}
</style>
