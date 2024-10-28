<template lang="pug">
.index-page
  commonMainContent
</template>

<script>
/**
 * ページ推移ごとにmountedを実行する必要があるため、どのviewsでも読み込むこと
 */
import mixins from '~/mixins/mixins'
import webpush from '~/js/webpush'
import metaFunctions from '~/js/metaFunctions'
import Setup from '~/js/setup'
import commonMainContent from '~/components/common/commonMainContent.vue'

export default {
  name: 'index',
  mixins: [mixins],
  components: {
    commonMainContent,
  },
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Top')
    Setup.setDescription('個人事業主のためのユーティリティ')
  },
  data() {
    return {
      loading: true, //ページ読み込み中フラグ
      thisWeekCommission: 0, //今週の収益
      thisWeekHourly: 0, //今週の時給
      thisWeekOperateTime: 0, //今週の稼働時間
      /** 報酬リスト
       * サンプル
        {
          workId: 'hogefuga', //ランダムID
          date: new Date(2024, 8, 29), //稼働日時
          commission: 11136, //報酬（円）
          time: 60 * 4.7, //稼働時間（分）
          memo: 'piyo', //メモ
        },
       */
      commission: [],
      commissionHistory: [], //日付順の報酬額リスト
      hourlyHistory: [], //日付順の時給リスト
      timeHistory: [], //日付順の稼働時間リスト
      dateHistory: [], //historyで使う日付リスト
    }
  },
  async mounted() {
    this.setTitle(this.$t('index.title'))
  },
  methods: {},
  watch: {},
}
</script>

<style lang="scss" scoped></style>
