<template lang="pug">
.center
  .commission
    .commission-item
        .text-h6 収支
        div(style="display: flex; align-items: flex-end; margin: 8px 0;")
          .text-h2.ma-0 {{ data.commission }}
          .text-h6(style="margin-left: 0.5em;") 円
    .hourly-and-operate-time(style="display:flex;")
      .hourly.commission-item.mr-2(style="width:50%;")
        .text-h6 時給
        .hourly-text.text-h5 {{ calcHourly(data.commission, data.time) }}円
      .operate-time.commission-item.ml-2(style="width:50%;")
        .text-h6 稼働時間
        .operate-time-text.text-h5 {{ Math.floor(data.time / 60) }}時間{{ Math.floor(data.time % 60) }}分
</template>

<script>
import mixins from '~/mixins/mixins'
export default {
  mixins: [mixins],
  props: {
    /** 稼働データ（1件のみ受け付け） */
    data: {
      type: Object,
      default: {
        commission: 0,
        dateUnixtime: 1730732400,
        memo: '空のデータ',
        time: 0,
        workId: null,
      },
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.hitsuyou-mudana-space {
  height: 5em;
  width: 100%;
}
</style>
