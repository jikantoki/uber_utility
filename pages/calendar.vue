<template lang="pug">
  .other-page
    .wrap
      v-card.content(elevation="4")
        .text-h4 稼働カレンダー
        v-sheet
          v-calendar(
            transparent
            borderless
            ref="calendar"
            :attributes="attributes"
            :is-dark="nowTheme.theme == 'dark'"
            expanded
            first-day-of-week=2
            :masks="{ title: 'YYYY年MMM' }"
          )
</template>

<script>
import metaFunctions from '~/js/metaFunctions'
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'

export default {
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Calendar')
    Setup.setDescription('稼働履歴をカレンダーで見る')
  },
  data() {
    return {
      /** 報酬リスト
         * サンプル
          {
            workId: 'hogefuga', //ランダムID
            date: new Date(2024, 8, 29), //稼働日時
            commission: 11136, //報酬（円）
            cost: 810, //経費（円）
            time: 60 * 4.7, //稼働時間（分）
            memo: 'piyo', //メモ
          },
         */
      commission: [],
      /** カレンダーに表示するイベントリスト */
      attributes: [],
    }
  },
  async mounted() {
    this.setTitle('カレンダー')

    //commissionリスト取得
    if (this.userStore && this.userStore.userId) {
      const getWork = await this.sendAjaxWithAuth('/getWork.php', {
        id: this.userStore.userId,
        token: this.userStore.userToken,
      })
      const worklist = JSON.parse(getWork.body.work)

      worklist.sort((a, b) => {
        return b.dateUnixtime - a.dateUnixtime
      })

      worklist.forEach((workData, index) => {
        const date = new Date(workData.dateUnixtime * 1000)
        this.commission.push({
          date: date,
          workId: workData.workId,
          commission: workData.commission,
          cost: workData.cost,
          time: workData.time,
          memo: workData.memo,
        })
        this.attributes.push({
          key: `workdata${index}`,
          highlight: true,
          dates: date,
          popover: {
            label: `${workData.commission - workData.cost}円`,
          },
        })
      })
    }
  },
  methods: {},
}
</script>

<style lang="scss">
.vc-container {
  .vc-weekday-1,
  .vc-weekday-7 {
    color: red;
  }
  .vc-day {
    height: 4em;
    .vc-day-content,
    .vc-highlight {
      height: 90%;
      width: 90%;
    }
  }
}
</style>
