<template lang="pug">
.other-page
  .wrap
    v-card.content(elevation="4")
      .text-h5 収支
      .contents
        .other-content(v-for="button of shushiButtons")
          .a-cover(v-ripple)
            a.content-a(:href="button.href")
              .button-inner.pl-4.py-4
                v-icon {{ button.icon }}
                p.text-h7.ml-2 {{ button.name }}
                p.text-h7.right.pr-4 >
          hr.ma-0
      .text-h5 利益
      .contents
        .other-content(v-for="button of riekiButtons")
          .a-cover(v-ripple)
            a.content-a(:href="button.href")
              .button-inner.pl-4.py-4
                v-icon {{ button.icon }}
                p.text-h7.ml-2 {{ button.name }}
                p.text-h7.right.pr-4 >
          hr.ma-0
</template>

<script>
import metaFunctions from '~/js/metaFunctions'
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'

export default {
  mixins: [mixins],
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
    }
  },
  mounted() {
    this.setTitle('収支分析')
  },
}
</script>

<style lang="scss" scoped>
.content-a {
  text-decoration: none;
  color: unset;
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
</style>
