<template lang="pug">
.index-page
  .wrap
    v-card.content(elevation="4")
      .text-h2 編集
      hr
      .editor
        .text-h6 稼働履歴を確認して、編集できます
        v-btn.text-h5.mx-0.py-4(
          size="large"
          color="var(--accent-color)"
          style="height: auto; width: 100%; border-radius: var(--border-radius);"
          @click="editDialog=true"
        ) 新規追加
        table(style="width: 100%;")
          thead
            tr
              th 日付
              th 稼働時間
              th 獲得報酬
              th 時給
              th 操作
          tbody
            tr(v-for="(work, cnt) in commission")
              td(style="font-weight: unset;") {{ dateToString(work.date) }}
              td(style="font-weight: unset;") {{ ('0' + Math.floor(work.time / 60)).slice(-2) }}時間{{ ('0' + work.time % 60).slice(-2) }}分
              td(style="font-weight: unset;") {{ work.commission }}円
              td(style="font-weight: unset;") {{ calcHourly(work.commission, work.time) }}円
              td(style="font-weight: unset; max-width: 5em;")
                v-btn.my-0(color="var(--accent-color)") 編集
                v-btn.my-0(color="var(--color-error)") 削除
  v-dialog(v-model="editDialog" persistent max-width="640px")
    v-card
      v-card-title 新規追加
      .editor-form
        table.px-4.vertical-table(
          style="width: 100%;"
        )
            thead
              tr
                th.px-2 日付
                th.px-2 稼働時間
                th.px-2 獲得報酬
                th.px-2 メモ
            tbody
              tr
                td.px-2(style="font-weight: unset;")
                  .td(style="display: flex; align-items: center;")
                    v-date-input(
                      placeholder="稼働日を選択"
                      v-model="editForm.date"
                    )
                td.px-2(style="font-weight: unset;")
                  .td(style="display: flex; align-items: center;")
                    v-number-input(
                      control-variant="stacked"
                      v-model="editForm.hour"
                      :max="23"
                      :min="0"
                    )
                    span.mx-2 時間
                    v-number-input(
                      control-variant="stacked"
                      v-model="editForm.min"
                      :max="59"
                      :min="0"
                    )
                    span.mx-2 分
                td.px-2(style="font-weight: unset;")
                  .td(style="display: flex; align-items: center;")
                    v-number-input(
                      control-variant="stacked"
                      v-model="editForm.commission"
                      :min="0"
                    )
                    span.mx-2 円
                td.px-2(style="font-weight: unset;")
                  .td(style="display: flex; align-items: center;")
                    v-text-field(
                      placeholder="現在実装中"
                      v-model="editForm.memo"
                    )
      .testtesttest {{ editForm }}
      v-card-actions
        v-btn(@click="editDialog=false" variant="elevated") キャンセル
        v-btn(
          @click="editDialog=false;addWorkData(editForm)"
          variant="elevated"
          color="var(--accent-color)"
        ) 保存
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
  name: 'edit',
  components: {},
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Edit')
    Setup.setDescription('Uber Utilityの編集画面')
  },
  data() {
    return {
      /** 編集ダイアログ開いているか？ */
      editDialog: false,
      editForm: {
        date: null,
        hour: null,
        min: null,
        commission: null,
        memo: null,
      },
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
    }
  },
  mounted() {
    this.setTitle('編集')
  },
  methods: {
    /** 稼働日の追加 */
    addWorkData: function (workData) {
      //日付が被った場合のエラー処理未実装
      if (workData.date && workData.commission !== null) {
        this.commission.push({
          date: workData.date,
          commission: workData.commission,
          time: workData.hour * 60 + workData.min,
          memo: workData.memo,
        })
      }
    },
  },
  watch: {
    commission: {
      handler: function () {
        this.commissionSort('date')
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.vertical-table {
  writing-mode: vertical-lr;
  th,
  td {
    writing-mode: horizontal-tb;
    height: 1em;
  }
  th {
    text-align: right;
  }
}
</style>
