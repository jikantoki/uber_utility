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
          style="height: auto; width: 100%; border-radius: var(--border-radius); color: white;"
          @click="clearWorkData();editDialog=true;editMode=false"
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
                v-btn.my-0(color="var(--accent-color)" style="color: white;" @click="editWorkData(cnt)") 編集
                v-btn.my-0(color="var(--color-error)" style="color: white;" @click="deleteWorkData(cnt)") 削除
        p.text-h5.ma-4(
          v-if="!commission[0]"
          style="text-align: center;"
        ) データが登録されていません！
  v-dialog(v-model="editDialog" persistent max-width="640px")
    v-card
      v-card-title {{ editMode ? '編集' : '新規追加' }}
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
                      :disabled="editMode"
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
      .error-message.ma-4.py-2.px-4(
        v-show="dialogErrorMessage"
        style=`
          background-color: var(--color-error);
          color: white;
          border-radius: var(--border-radius);
          display: flex;
          align-items: center;
        `
      )
        v-icon mdi-alert-circle-outline
        p.mx-4 {{ dialogErrorMessage }}
        v-icon(
          style="position: absolute; right: 1em;cursor: pointer;"
          @click="dialogErrorMessage = null"
        ) mdi-close
      v-card-actions
        v-btn(@click="editDialog=false" variant="elevated") キャンセル
        v-btn(
          @click="addWorkData(editForm)"
          variant="elevated"
          color="var(--accent-color)"
          style="color: white;"
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
      /** エラーメッセージ（nullで非表示） */
      dialogErrorMessage: null,
      /** 編集モード（trueは上書きを許可、falseは新規登録） */
      editMode: false,
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
    clearWorkData: function () {
      this.editForm = {
        date: null,
        hour: null,
        min: null,
        commission: null,
        memo: null,
      }
    },
    /** 稼働日の追加 */
    addWorkData: function (workData) {
      if (workData.date && workData.commission !== null) {
        const dates = this.commission.map((work) => {
          return work.date
        })
        let duplicationFlag = false
        let count = 0
        dates.forEach((date) => {
          if (workData.date - date == 0) {
            duplicationFlag = true
          }
          if (!duplicationFlag) count++ //breakできないためこのような記述
        })
        if (duplicationFlag) {
          if (this.editMode) {
            this.commission.splice(count, 1)
          } else {
            this.dialogErrorMessage = '既に登録されている日付です'
            return false
          }
        }

        this.dialogErrorMessage = null
        this.commission.push({
          date: workData.date,
          commission: workData.commission,
          time: workData.hour * 60 + workData.min,
          memo: workData.memo,
        })
        this.editDialog = false
      } else {
        this.dialogErrorMessage = '日付と報酬のnullは受け付けられません'
      }
    },
    /** 指定された場所のデータを編集する */
    editWorkData: function (indexNumber) {
      this.editForm.date = this.commission[indexNumber].date
      this.editForm.hour = Math.floor(this.commission[indexNumber].time / 60)
      this.editForm.min = this.commission[indexNumber].time % 60
      this.editForm.commission = this.commission[indexNumber].commission
      this.editForm.memo = this.commission[indexNumber].memo
      this.dialogErrorMessage = null
      this.editMode = true
      this.editDialog = true
    },
    deleteWorkData: function (indexNumber) {
      this.commission.splice(indexNumber, 1)
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
