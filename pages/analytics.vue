<template lang="pug">
.other-page
  .wrap
    v-card.content(elevation="4")
      .text-h5 収支
      .contents
        .other-content(v-for="button of shushiButtons")
          .a-cover(v-ripple)
            a.content-a(@click="openData(button.mode)")
              .button-inner.pl-4.py-4
                v-icon {{ button.icon }}
                p.text-h7.ml-2 {{ button.name }}
                p.text-h7.right.pr-4 >
          hr.ma-0
      .text-h5 利益（収支と変わらないかも？）
      .contents
        .other-content(v-for="button of riekiButtons")
          .a-cover(v-ripple)
            a.content-a
              .button-inner.pl-4.py-4
                v-icon {{ button.icon }}
                p.text-h7.ml-2 {{ button.name }}
                p.text-h7.right.pr-4 >
          hr.ma-0
  v-dialog(v-model="activeDialog" max-width="640px")
    v-card(:title="dialogTitle")
      .analytics-item.my-4.mx-6
        .vfor-analytics(v-for="data of workData")
          commonAnalytics(:data="data" :mode="mode")
          hr.my-2(style="opacity: 0.3")
        .details.mt-4
          .detail(v-for="detail in detailList")
            p {{ detail.title }}:
            p.right {{ detail.value }}{{ detail.unit }}
      v-card-actions
        v-btn(
          @click="activeDialog=false"
          variant="elevated"
          color="var(--accent-color)"
          style="color: white;"
        ) 閉じる
</template>

<script>
import metaFunctions from '~/js/metaFunctions'
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'
import commonAnalytics from '~/components/common/commonAnalytics.vue'

export default {
  mixins: [mixins],
  components: {
    commonAnalytics,
  },
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Analytics')
    Setup.setDescription('収支分析ページ')
  },
  data: () => {
    return {
      shushiButtons: [
        {
          name: '生涯収支',
          icon: 'mdi-heart',
          mode: 'all',
        },
        {
          name: '年別収支',
          icon: 'mdi-calendar-expand-horizontal',
          mode: 'year',
        },
        {
          name: '月別収支',
          icon: 'mdi-moon-waning-crescent',
          mode: 'month',
        },
        {
          name: '日別収支',
          icon: 'mdi-sun-clock',
          mode: 'day',
        },
        {
          name: '曜日別収支（開発中）',
          icon: 'mdi-calendar-week-begin',
          mode: 'dayOfWeek',
        },
      ],
      riekiButtons: [
        {
          name: '生涯利益',
          icon: 'mdi-heart',
          href: '/settings',
        },
        {
          name: '年別利益',
          icon: 'mdi-calendar-expand-horizontal',
          href: '/settings',
        },
        {
          name: '月別利益',
          icon: 'mdi-moon-waning-crescent',
          href: '/settings',
        },
      ],
      detailList: {
        /** 稼働日数 */
        daycount: {
          title: '稼働日数',
          value: 0,
          unit: '日',
        },
        /** 日割の平均稼働時間 */
        averageTime: {
          title: '平均稼働時間',
          value: '0時間0分',
          unit: '',
        },
        /** 日割の平均収支 */
        averageCommission: {
          title: '平均収支',
          value: 0,
          unit: '円',
        },
        /** 日割の最大収支 */
        maxCommission: {
          title: '最大収支',
          value: 0,
          unit: '円',
        },
        /** 経費 */
        cost: {
          title: '経費',
          value: 0,
          unit: '円',
        },
      },
      /** propで渡す用データ */
      workData: [],
      /** 稼働実績リスト */
      commission: [],
      /** ダイアログ開くフラグ */
      activeDialog: false,
      /** ダイアログのタイトル */
      dialogTitle: '',
      /** 統計の表示モード */
      mode: null,
    }
  },
  async mounted() {
    this.setTitle('収支分析')

    //commissionリスト取得
    if (this.userStore && this.userStore.userId) {
      const getWork = await this.sendAjaxWithAuth('/getWork.php', {
        id: this.userStore.userId,
        token: this.userStore.userToken,
      })
      const worklist = JSON.parse(getWork.body.work)

      worklist.sort((a, b) => {
        return a.dateUnixtime - b.dateUnixtime
      })
      worklist.forEach((work, index) => {
        worklist[index].date = new Date(work.dateUnixtime * 1000)
        worklist[index].year = work.date.getFullYear()
        worklist[index].month = work.date.getMonth()
        worklist[index].dayOfWeek = work.date.getDay()
      })

      this.commission = worklist
    }
  },
  methods: {
    /** データを開く */
    openData(mode) {
      this.workData = []
      this.mode = mode
      switch (mode) {
        case 'all':
          this.dialogTitle = '生涯収支'
          this.workData[0] = {
            commission: 0,
            time: 0,
          }
          this.commission.forEach((data) => {
            this.workData[0].commission += data.commission
            this.workData[0].cost += data.cost
            this.workData[0].time += data.time
          })
          break
        case 'month':
          this.dialogTitle = '月別収支'
          this.commission.forEach((data) => {
            let findFlag = false
            this.workData.forEach((work, index) => {
              //年と月が同じなら統合
              if (
                work.year == data.year &&
                work.month == data.month &&
                !findFlag
              ) {
                this.workData[index] = {
                  commission: work.commission + data.commission,
                  cost: work.cost + data.cost,
                  date: work.date,
                  dateUnixtime: work.dateUnixtime,
                  year: work.year,
                  month: work.month,
                  time: work.time,
                }
                findFlag = true
              }
            })
            if (!findFlag) {
              this.workData.push(data)
            }
          })
          break
        case 'year':
          this.dialogTitle = '年別収支'
          this.commission.forEach((data) => {
            let findFlag = false
            this.workData.forEach((work, index) => {
              //年が同じなら統合
              if (work.year == data.year && !findFlag) {
                this.workData[index] = {
                  commission: work.commission + data.commission,
                  commission: work.cost + data.cost,
                  date: work.date,
                  dateUnixtime: work.dateUnixtime,
                  year: work.year,
                  month: work.month,
                  time: work.time,
                }
                findFlag = true
              }
            })
            if (!findFlag) {
              this.workData.push(data)
            }
          })
          break
        case 'day':
        default:
          this.dialogTitle = '日付別収支'
          this.workData = this.commission
          break
      }
      this.activeDialog = true
    },
  },
}
</script>

<style lang="scss" scoped>
.content-a {
  text-decoration: none;
  color: unset;
  cursor: pointer;
  .button-inner {
    display: flex;
    position: relative;
    align-items: center;
    .right {
      position: absolute;
      right: 0;
    }
  }
}
hr {
  width: 100% !important;
}
.details {
  .detail {
    display: flex;
    .right {
      margin-left: auto;
    }
  }
}
</style>
