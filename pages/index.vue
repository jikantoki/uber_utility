<template lang="pug">
.index-page
  .wrap
    .content(style="padding: 0px 0;")
      .commission
        .thisweek-commission.commission-item
          .text-h6 今週の収益
          div(style="display: flex; align-items: flex-end; margin: 8px 0;")
            .text-h2(style="margin: 0;") {{ thisWeekCommission }}
            .text-h6(style="margin-left: 0.5em;") 円
      .hourly-and-operate-time(style="display:flex;")
        .hourly.commission-item(style="width:40%;margin-right: 8px;")
          .text-h6 時給
          .hourly-text.text-h5 {{ thisWeekHourly }}円
        .operate-time.commission-item(style="width:60%;margin-left: 8px;")
          .text-h6 稼働時間
          .operate-time-text.text-h5 {{ Math.floor(thisWeekOperateTime / 60) }}時間{{ Math.floor(thisWeekOperateTime % 60) }}分
      .edit-work-button(style="display: flex;")
        a(href="/edit" style="width: 100%;")
          v-btn.text-h6(
            style="height: auto; width: 100%; padding: 8px; margin: 8px 0; border-radius: var(--border-radius);"
            prepend-icon="mdi-pencil"
            color="var(--accent-color)"
          ) 編集
  .wrap
    v-card.content
      p.text-h6.mb-4 稼働グラフ
      v-tabs(active-color="red" v-model="tab")
        v-tab.text-h7.v-tab-mainscreen(value='dafault') 全表示
        v-tab.text-h7.v-tab-mainscreen(value='date') 日付
        v-tab.text-h7.v-tab-mainscreen(value='commission') 収益
        v-tab.text-h7.v-tab-mainscreen(value='hourly') 時給
        v-tab.text-h7.v-tab-mainscreen(value='operateTime') 稼働時間
      v-window.tab-item-wrap(v-model="tab")
        v-window-item.tab-item(value='dafault')
          v-card.content
            v-sparkline(
              :model-value="commissionHistory"
              line-width=2
              padding=8
              stroke-linecap="round"
              smooth=10
              auto-draw
              show-labels
              :labels="dateHistory"
              )
              template(v-slot:label="item") {{ item.value }}
          table(style="width: 100%;")
            thead
              tr
                th 日付
                th 稼働時間
                th 獲得報酬
                th 時給
            tbody
              tr(v-for="(work, cnt) in commission")
                th(style="font-weight: unset;") {{ dateToString(work.date) }}
                th(style="font-weight: unset;") {{ ('0' + Math.floor(work.time / 60)).slice(-2) }}時間{{ ('0' + work.time % 60).slice(-2) }}分
                th(style="font-weight: unset;") {{ work.commission }}円
                th(style="font-weight: unset;") {{ calcHourly(work.commission, work.time) }}円
        v-window-item.tab-item(value='date')
          v-card.content
            v-sparkline(
              :model-value="commissionHistory"
              line-width=2
              padding=8
              stroke-linecap="round"
              smooth=10
              auto-draw
              show-labels
              :labels="dateHistory"
              )
              template(v-slot:label="item") {{ item.value }}
          table(style="width: 100%;")
            thead
              tr
                th 日付
                th 稼働時間
                th 獲得報酬
            tbody
              tr(v-for="(work, cnt) in commission")
                th(style="font-weight: unset;") {{ dateToString(work.date) }}
                th(style="font-weight: unset;") {{ ('0' + Math.floor(work.time / 60)).slice(-2) }}時間{{ ('0' + work.time % 60).slice(-2) }}分
                th(style="font-weight: unset;") {{ work.commission }}円
        v-window-item.tab-item(value='commission')
          v-card.content
            v-sparkline(
              :model-value="commissionHistory"
              line-width=2
              padding=8
              stroke-linecap="round"
              smooth=10
              auto-draw
              show-labels
              :labels="dateHistory"
              )
              template(v-slot:label="item") {{ item.value }}
          table(style="width: 100%;")
            thead
              tr
                th 順位
                th 日付
                th 獲得報酬
            tbody
              tr(v-for="(work, cnt) in commission")
                th(style="font-weight: unset;") {{ cnt + 1 }}
                th(style="font-weight: unset;") {{ dateToString(work.date) }}
                th(style="font-weight: unset;") {{ work.commission }}円
        v-window-item.tab-item(value='hourly')
          v-card.content
            v-sparkline(
              :model-value="hourlyHistory"
              line-width=2
              padding=8
              stroke-linecap="round"
              smooth=10
              auto-draw
              show-labels
              :labels="dateHistory"
              )
              template(v-slot:label="item") {{ item.value }}
          table(style="width: 100%;")
            thead
              tr
                th 順位
                th 日付
                th 時給
            tbody
              tr(v-for="(work, cnt) in commission")
                th(style="font-weight: unset;") {{ cnt + 1 }}
                th(style="font-weight: unset;") {{ dateToString(work.date) }}
                th(style="font-weight: unset;") {{ calcHourly(work.commission, work.time) }}円
        v-window-item.tab-item(value='operateTime')
          v-card.content
            v-sparkline(
              :model-value="timeHistory"
              line-width=2
              padding=8
              stroke-linecap="round"
              smooth=10
              auto-draw
              show-labels
              :labels="dateHistory"
              )
              //template(v-slot:label="item") {{ ('0' + Math.floor(item.value / 60)).slice(-2) }}時間{{ ('0' + item.value % 60).slice(-2) }}分
          table(style="width: 100%;")
            thead
              tr
                th 順位
                th 日付
                th 稼働時間
            tbody
              tr(v-for="(work, cnt) in commission")
                th(style="font-weight: unset;") {{ cnt + 1 }}
                th(style="font-weight: unset;") {{ dateToString(work.date) }}
                th(style="font-weight: unset;") {{ ('0' + Math.floor(work.time / 60)).slice(-2) }}時間{{ ('0' + work.time % 60).slice(-2) }}分
  .wrap
    v-card.content(elevation="4")
      .text-h1
        span UberUTL {{ PackageJson.version }}
        img.ontext(src="~/assets/logo.png")
      hr
      //.text-h6 {{ $t('index.nuxtSampleProject') }}
      .text-h6 Uber Utility
      .btns
        v-btn(@click="pushForMe()") {{ $t('index.buttons.notificationTest') }}
        //v-btn.is-not-pwa(@click="download('/download/nuxTemp.apk','vuetifyTemplate.apk')") Download APK
        v-btn(@click="a('https://github.com/jikantoki/nuxt3temp')") Github
        v-btn(@click="createPopup()") {{ $t('index.buttons.popup') }}
      .input-area
        v-text-field.my-4(
          :label="$t('index.hints.whatDoYouWantToSend')"
          v-model="notificationText"
          )
      .lang {{ $t('page.content') }}
  v-dialog(v-model="dialog" max-width="500")
    v-card
      v-card-title {{ dialogTitle }}
      v-card-text(v-html="dialogText")
      v-card-actions(v-if="dialogActions")
        v-spacer
        v-btn(
          v-for="btn, key in dialogActions"
          :key="key"
          @click="btn.action()"
          v-bind:class="[key === dialogActions.length - 1 ? 'btn-default' : 'btn-other']"
          ) {{ btn.value }}
  .wrap
    v-card.content(elevation="4")
      .text-h2 {{ $t('index.easyAndBeautiful') }}
      p {{ counter.count }}
      v-btn(@click="counter.increment") 追加
      hr
      .text NuxTempで理想の作業効率化
      p 吾輩は猫である。名前はまだない。どこで生れたか頓（とん）と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪（どうあく）な種族であったそうだ。この書生というのは時々我々を捕（つかま）えて煮て食うという話である。しかしその当時は何という考（かんがえ）もなかったから別段恐しいとも思わなかった。ただ彼の掌（てのひら）に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ち付いて書生の顔を見たのがいわゆる人間というものの見始（みはじめ）であろう。この時妙なものだと思った感じが今でも残っている。第一毛を以て装飾されべきはずの顔がつるつるしてまるで薬缶（やかん）だ。その後猫にも大分逢（あ）ったがこんな片輪には一度も出会（でく）わした事がない。のみならず顔の真中が余りに突起している。そうしてその穴の中から時々ぷうぷうと烟（けむり）を吹く。どうも咽（む）せぽくて実に弱った。これが人間の飲む烟草（タバコ）というものである事は漸（ようや）くこの頃（ごろ）知った。
  .wrap
    v-card.content(elevation="4")
      .text-h2 画像だって表示可能
      hr
      p このコンポーネントを使えば、エモい感じで画像を簡単に表示できます
      .img-wrap.my-4
        img.big-img(src="~/assets/img001.jpg")
        p.text-h1 テキストを入力
  .wrap
    v-card.content(elevation="4")
      .text-h2 いい感じの読み込み画面
      hr
      .flex
        .flex-child
          p.text-h0 H0テキスト
          p.text-h1 H1テキスト
          p.text-h2 H2テキスト
          p.text-h3 H3テキスト
          p.text-h4 H4テキスト
          p.text-h5 H5テキスト
          p.text-h6 H6テキスト
          p.text-h7 H7テキスト
        .flex-child
          ContentLoader.text-h0
          ContentLoader.text-h1
          ContentLoader.text-h2
          ContentLoader.text-h3
          ContentLoader.text-h4
          ContentLoader.text-h5
          ContentLoader.text-h6
          ContentLoader.text-h7
</template>

<script>
/**
 * ページ推移ごとにmountedを実行する必要があるため、どのviewsでも読み込むこと
 */
import mixins from '~/mixins/mixins'
import webpush from '~/js/webpush'
import metaFunctions from '~/js/metaFunctions'
import Setup from '~/js/setup'

export default {
  name: 'index',
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Top')
    Setup.setDescription('Uber Driver用のユーティリティ')
  },
  data() {
    return {
      notificationText: '通知テスト12345🤓',
      dialog: false,
      dialogTitle: null,
      dialogText: null,
      dialogActions: null,
      counter: useCounterStore(),
      tab: null,
      thisWeekCommission: 0, //今週の収益
      thisWeekHourly: 0, //今週の時給
      thisWeekOperateTime: 0, //今週の稼働時間
      commission: [
        {
          date: new Date(2024, 8, 29), //稼働日時
          commission: 11136, //報酬（円）
          time: 60 * 4.7, //稼働時間（分）
        },
        {
          date: new Date(2024, 8, 28),
          commission: 13756,
          time: 60 * 5.7,
        },
        {
          date: new Date(2024, 8, 27),
          commission: 4427,
          time: 60 * 2.5,
        },
        {
          date: new Date(2024, 8, 26),
          commission: 3036,
          time: 60 * 2.1,
        },
        {
          date: new Date(2024, 8, 25),
          commission: 11689,
          time: 60 * 4.5,
        },
        {
          date: new Date(2024, 8, 24),
          commission: 0,
          time: 60 * 0,
        },
        {
          date: new Date(2024, 8, 23),
          commission: 16371,
          time: 60 * 5.5,
        },
      ],
      commissionHistory: [], //日付順の報酬額リスト
      hourlyHistory: [], //日付順の時給リスト
      timeHistory: [], //日付順の稼働時間リスト
      dateHistory: [], //historyで使う日付リスト
    }
  },
  async mounted() {
    this.setTitle(this.$t('index.title'))
    let cnt = 0 //実際に稼働した日数をカウント
    for (const work of this.commission.reverse()) {
      const hourly = this.calcHourly(work.commission, work.time)

      this.commissionHistory.push(work.commission)
      this.hourlyHistory.push(hourly)
      this.timeHistory.push(work.time)
      this.dateHistory.push(
        `${('0' + (work.date.getMonth() + 1)).slice(-2)}/${(
          '0' + work.date.getDate()
        ).slice(-2)}`,
      )
      this.thisWeekCommission += work.commission
      this.thisWeekHourly += hourly
      this.thisWeekOperateTime += work.time
      if (hourly) cnt++
    }
    this.thisWeekHourly = Math.floor(this.thisWeekHourly / (cnt + 1))
    this.commission.reverse()
  },
  methods: {
    async pushForMe() {
      const keys = await webpush.get()
      if (!keys) {
        this.dialogTitle = '通知を送信できませんでした'
        this.dialogText =
          'プッシュ通知が許可されていないため、処理を完了できませんでした'
        this.dialog = true
        this.dialogActions = [
          {
            value: '閉じる',
            action: () => {
              this.dialog = false
            },
          },
        ]
        return false
      }
      this.sendAjaxWithAuth(
        '/sendPushForMe.php',
        {
          endpoint: keys.endpoint,
          publickey: keys.publicKey,
          authtoken: keys.authToken,
        },
        {
          message: this.notificationText,
          title: 'て～～～すと🤓',
          icon: 'https://nuxt.enoki.xyz/img/icon192.png',
        },
      )
      this.dialogTitle = '通知を送信しました'
      this.dialogText = 'プッシュ通知を確認してみてください！'
      this.dialog = true
      this.dialogActions = [
        {
          value: '閉じる',
          action: () => {
            this.dialog = false
          },
        },
      ]
      return true
    },
    createPopup() {
      this.dialogTitle = 'ポップアップテスト'
      this.dialogText = 'これはテストです'
      this.dialog = true
      this.dialogActions = [
        {
          value: 'ボタン2',
          action: () => {
            this.dialog = false
          },
        },
        {
          value: '閉じる',
          action: () => {
            this.dialog = false
          },
        },
      ]
    },
    commissionSort(sortBy) {
      switch (sortBy) {
        case 'commission':
          this.commission.sort((a, b) => {
            return b.commission - a.commission
          })
          break
        case 'operateTime':
          this.commission.sort((a, b) => {
            return b.time - a.time
          })
          break
        case 'hourly':
          this.commission.sort((a, b) => {
            return (
              this.calcHourly(b.commission, b.time) -
              this.calcHourly(a.commission, a.time)
            )
          })
          break
        case 'date':
        default:
          this.commission.sort((a, b) => {
            return b.date - a.date
          })
          break
      }
    },
    /**
     * Date型をN月N日に変換
     * @param date Date
     */
    dateToString(date) {
      return `${('0' + (date.getMonth() + 1)).slice(-2)}月${(
        '0' + date.getDate()
      ).slice(-2)}日`
    },
    /**
     * 時給計算
     * @param commission 報酬額
     * @param time 稼働時間
     */
    calcHourly(commission, time) {
      if (commission && time) {
        return Math.floor(commission / (time / 60))
      } else {
        return 0
      }
    },
  },
  watch: {
    tab: {
      handler: function (newValue) {
        this.commissionSort(newValue)
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.commission-item {
  margin: 8px 0;
  padding: 8px 16px;
  background: rgb(var(--v-theme-surface));
  border-radius: var(--border-radius);
}
.v-tab-mainscreen {
  margin: 0 !important;
  padding: 4px;
  height: auto !important;
}
.v-tab-item--selected {
  background: var(--accent-color);
  color: white;
}
.tab-item {
  padding: 8px;
}
</style>
