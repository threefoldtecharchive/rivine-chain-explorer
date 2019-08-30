<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['blockHeightData', 'options'],
  mounted () {
    console.log(this.options)
    console.log(this.blockHeightData)
    this.renderChart(this.blockHeightData, this.options)
  }
}
</script>

<style>
</style>