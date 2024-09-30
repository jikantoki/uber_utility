<template lang="pug">
.index-page
  .wrap
    .content(style="padding: 0px 0;")
      .commission
        .thisweek-commission.commission-item
          .text-h6 今週の収益
          div(style="display: flex; align-items: flex-end; margin: 8px 0;")
            .text-h2(style="margin: 0;") 114514
            .text-h6(style="margin-left: 0.5em;") 円
      .hourly-and-operate-time(style="display:flex;")
        .hourly.commission-item(style="width:50%;margin-right: 8px;")
          .text-h6 時給
          .hourly-text.text-h4 1919円
        .operate-time.commission-item(style="width:50%;margin-left: 8px;")
          .text-h6 稼働時間
          .operate-time-text.text-h4 19 時間 19 分
  .wrap
    v-card.content
      v-sparkline(
        :model-value="commissionGraphList"
        fill=false
        line-width=2
        gradient-direction="top"
        padding=8
        auto-line-width=false
        stroke-linecap="round"
        type="trend"
        smooth=10
        auto-draw
        show-labels
        )
  .wrap
    v-card.content
      v-tabs(active-color="red" v-model="tab")
        v-tab.text-h6.v-tab-mainscreen(value='commission') 収益
        v-tab.text-h6.v-tab-mainscreen(value='hourly') 時給
        v-tab.text-h6.v-tab-mainscreen(value='operateTime') 時間
      v-window(v-model="tab")
        v-window-item.tab-item(value='commission')
          p a
        v-window-item.tab-item(value='hourly')
          p b
        v-window-item.tab-item(value='operateTime')
          p c
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
      commission: [
        {
          date: new Date(2024, 9, 29), //稼働日時
          commission: 8432, //報酬（円）
          time: 60 * 4.7, //稼働時間（分）
        },
        {
          date: new Date(2024, 9, 28),
          commission: 12897,
          time: 60 * 6.7,
        },
        {
          date: new Date(2024, 9, 27),
          commission: 4893,
          time: 60 * 3.2,
        },
      ],
      commissionGraphList: [],
    }
  },
  async mounted() {
    this.setTitle(this.$t('index.title'))
    for (const work of this.commission) {
      this.commissionGraphList.push(work.commission)
    }
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
.v-slide-group-item--active {
  background: var(--accent-color);
  color: white;
}
.tab-item {
  padding: 8px;
}
</style>
