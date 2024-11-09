<template lang="pug">
.other-page
  .wrap
    v-card.content(elevation="4")
      .text-h5 収支
      .contents
        .other-content(v-for="button of shushiButtons")
          .a-cover(v-ripple)
            a.content-a(@click="activeDialog=true")
              .button-inner.pl-4.py-4
                v-icon {{ button.icon }}
                p.text-h7.ml-2 {{ button.name }}
                p.text-h7.right.pr-4 >
          hr.ma-0
      .text-h5 利益
      .contents
        .other-content(v-for="button of riekiButtons")
          .a-cover(v-ripple)
            a.content-a(@click="activeDialog=true")
              .button-inner.pl-4.py-4
                v-icon {{ button.icon }}
                p.text-h7.ml-2 {{ button.name }}
                p.text-h7.right.pr-4 >
          hr.ma-0
  v-dialog(v-model="activeDialog" max-width="640px")
    v-card
      .analytics-item.my-4.mx-6
        commonAnalytics(:data="commission[0]")
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
          href: '/settings',
        },
        {
          name: '年別収支',
          icon: 'mdi-calendar-expand-horizontal',
          href: '/settings',
        },
        {
          name: '月別収支',
          icon: 'mdi-moon-waning-crescent',
          href: '/settings',
        },
        {
          name: '日別収支',
          icon: 'mdi-sun-clock',
          href: '/settings',
        },
        {
          name: '曜日別収支',
          icon: 'mdi-calendar-week-begin',
          href: '/settings',
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
          value: '0',
          unit: '円',
        },
        /** 日割の最大収支 */
        maxCommission: {
          title: '最大収支',
          value: '0',
          unit: '円',
        },
      },
      /** 稼働実績リスト */
      commission: [],
      /** ダイアログ開くフラグ */
      activeDialog: false,
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
        return b.dateUnixtime - a.dateUnixtime
      })

      this.commission = worklist
      console.log(worklist)
    }
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
