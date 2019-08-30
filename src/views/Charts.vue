<template lang="html">
  <div>
    <Navigation />
    <div v-if="!loading" class="chart">
      <ChainHeightChart :blockHeightData=blockHeightData :options=options />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { API_URL } from "../common/config"
import Navigation from "../components/Navigation.vue"
import ChainHeightChart from "./Charts/ChainHeightChart.vue"
import { formatReadableDate } from '../common/helpers';

const history = 720

export default {
  name: "charts",
  data() {
    return {
      blockHeightData: {},
      loadData: {},
      options: {},
      loading: false
    }
  },
  components: {
    Navigation,
    ChainHeightChart
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      axios({ method: "GET", url: API_URL + "/explorer/stats/history?history=" + history}).then(result => {
        this.loadData = result.data
        this.mapDataForBlockHeightChart(result.data)
        console.log(this.blockHeightData)
      }, error => {
        console.error(error)
      })
    },
    mapDataForBlockHeightChart (result) {
      // const blockHeightData = [result.blockheights, result.blocktimestamps]
      const labels = result.blocktimestamps.map(x => formatReadableDate(x))
      this.blockHeightData = {
        labels,
        datasets: [
          {
            data: result.blockheights,
            label: 'Chain Height',
            pointBackgroundColor: 'white',
            pointBorderColor: '#249EBF',
            lineWidth: 0.1
          }
        ]
      }

      this.options = {
        scales: {
          yAxes: [{
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false,
        lineWidth: 0.1
      }
      this.loading = false
    }
  }
}
</script>
<style scoped>
.chart {
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
}
</style>