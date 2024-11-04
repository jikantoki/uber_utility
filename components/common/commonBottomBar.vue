<template lang="pug">
.commonBottomBar
  .center(
    style="height: 100%;"
  )
    .nav-buttons
      a(
        v-for="button of buttons"
        :href="button.href"
        v-ripple
      )
        v-icon {{ button.icon }}
        p {{ button.name }}
</template>

<script>
import mixins from '~/mixins/mixins'
export default {
  mixins: [mixins],
  data: () => {
    return {
      buttons: [
        {
          name: 'トップ',
          icon: 'mdi-home',
          href: '/',
        },
        {
          name: 'カレンダー',
          icon: 'mdi-calendar',
          href: '/calendar',
        },
        {
          name: '収益',
          icon: 'mdi-cash',
          href: '/commission',
        },
        {
          name: '燃費',
          icon: 'mdi-gas-station',
          href: '/fuel',
        },
        {
          name: 'その他',
          icon: 'mdi-cog',
          href: '/other',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.commonBottomBar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 5em;
  z-index: 5;
  overflow: hidden;
  color: white;
  background: var(--accent-color);
  white-space: nowrap;
  .nav-buttons {
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    a {
      color: white;
      text-decoration: none;
      width: -webkit-fill-available;
      text-align: center;
      i {
        font-size: 3em;
      }
      p {
        font-size: 1em;
      }
    }
  }
}
</style>
