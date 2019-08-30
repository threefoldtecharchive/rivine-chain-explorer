<template lang="html">
  <div>
    <h1>{{ msg }}</h1>
    <svg
      :height="height"
      :width="width"
    >
    <g transform="translate(50,50)">
        <line
          v-for="c in output"
          :key="c.timestamm"
          :r="c.r"
          :cx="c.timestamp"
          :cy="c.height"
          :fill="c.fill"
          :stroke="c.stroke"
        >
        </line>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: "BlockHeightChart",
  props: ["blockHeightData"],
  data () {
    return {
      msg: "Hello fromt blockheightChart",
      height: 600,
      width: 600,
      blockHeights: {},
      blockTimestamps: {},
      parsedData: {}
    }
  },
  created () {
    if (!this.$props.blockHeightData) return

    console.log("helo")
    const blockHeights = this.$props.blockHeightData[0]
    const blockTimestamps = this.$props.blockHeightData[1]
    console.log(blockHeights)
    console.log(blockTimestamps)
    this.parsedData = blockHeights.map((d, index) => {
      return {
        height: d,
        timestamp: blockTimestamps[index]
      }
    })

    this.colourScale = d3
      .scaleOrdinal()
      .range(["#5EAFC6", "#FE9922"])
  },
  methods: {
    lineChart() {
      const lineChart = d3.line()
        .x(function(d) { return x(d.timestamp); })
        .y(function(d) { return y(d.height); });
    }
  },
  computed: {
    output() {
      return this.lineChart();
    }
  }
}
</script>