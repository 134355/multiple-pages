<template>
  <div class="receipt">
    <table>
      <tr v-for="item in list" :key="item.label">
        <td class="label">{{item.label}}</td>
        <td class="min-ta-right">{{item.money}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Receipt',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang='scss' scoped>
.receipt {
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
    .label {
      font-weight: 700;
    }
  }
}
</style>
