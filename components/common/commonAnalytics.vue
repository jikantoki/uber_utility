<template lang="pug">
.center
  .commission
    .commission-item
        .text-h6 {{ title }}
        div.mb-2(style="display: flex; align-items: flex-end;")
          .text-h4.ma-0 {{ data.commission }}
          .text-h6(style="margin-left: 0.5em;") 円
    .hourly-and-operate-time(style="display:flex;")
      .hourly.commission-item.mr-2(style="width:50%;")
        .text-h7 時給
        .hourly-text.text-h6 {{ calcHourly(data.commission, data.time) }}円
      .operate-time.commission-item.ml-2(style="width:50%;")
        .text-h7 稼働時間
        .operate-time-text.text-h6 {{ Math.floor(data.time / 60) }}時間{{ Math.floor(data.time % 60) }}分
</template>

<script>
import mixins from '~/mixins/mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      title: '収支',
    }
  },
  props: {
    /** 稼働データ（1件のみ受け付け） */
    data: {
      type: Object,
      default: {
        commission: 0,
        dateUnixtime: 0,
        date: new Date(0),
        memo: '空のデータ',
        time: 0,
        workId: null,
        year: 1970,
        month: 0,
      },
      required: true,
    },
    mode: {
      type: String,
      default: null,
    },
  },
  mounted() {
    switch (this.mode) {
      case 'all':
        this.title = '今までの総収入'
        break
      case 'month':
        this.title = `${this.data.year}年${this.data.month + 1}月`
        break
      case 'year':
        this.title = `${this.data.year}年`
        break
      case 'day':
      default:
        this.title = this.dateToString(this.data.date)
        break
    }
  },
}
</script>

<style lang="scss" scoped>
.hitsuyou-mudana-space {
  height: 5em;
  width: 100%;
}
</style>
