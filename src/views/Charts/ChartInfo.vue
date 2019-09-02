<template>
  <div class="info">
    <h1 class="info-title">Stats</h1>
    <div class="detail-info">
      <div class="detail-info-item">
        <span>{{ data.difficulty }}</span><span class="info-label">Current Difficulty </span>
      </div>
      <div class="detail-info-item">
        <span>{{ data.currentBlock }}</span><span class="info-label">Current Block</span>
      </div>
      <div class="detail-info-item">
        <span>{{ data.estimatedActiveBs }}</span><span class="info-label">Estimated Active BS:</span>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import { API_URL } from "../../common/config"

  export default {
    props: {
      data: {
        difficulty: {
          type: Number
        },
        currentBlock: {
          type: Number
        },
        estimatedActiveBs: {
          type: Number
        }
      }
    },
    mounted () {
      console.log(this.data)
    },
  }
</script>

<style scoped>
  .info {
    padding: 50px;
    background-color: #4F5566;
    border-radius: 2%;
    box-shadow: 0 2px 16px 0 rgba(0,0,0,0.30);
    color: #fff;
    text-align: center;
    min-width: 30vw;
  }
  .detail-info {
    display: flex;
    flex-direction: column;
  }
  .detail-info-item {
    display: flex;
    flex-direction: column;
    margin: 5px;
    color: #00C4C9;
    font-size: 20px;
  }
  .info-label {
    text-transform: uppercase;
    color: white;
    font-size: 16px;
  }
</style>