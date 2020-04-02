<template>
  <div class="takeaway">
    <Logistics />
  </div>
</template>

<script>
import Logistics from './pages/logistics'
export default {
  name: 'Takeaway',
  components: {
    Logistics
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.takeaway {
  padding: 20px;
}
</style>
