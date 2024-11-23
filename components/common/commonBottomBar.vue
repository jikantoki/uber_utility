<template lang="pug">
.koukoku-space
  commonAdsense
.commonBottomBar
  .center(
    style="height: 100%;"
  )
    .nav-buttons
      .nav-button-div(
        v-for="(button,count) of buttons"
        ref="buttons"
        v-ripple
      )
        a.nav-a(
          :href="button.href"
        )
          v-icon {{ button.icon }}
          p {{ button.name }}
</template>

<script>
import mixins from '~/mixins/mixins'
import commonAdsense from './commonAdsense.vue'
export default {
  components: {
    commonAdsense,
  },
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
          href: '/analytics',
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
  watch: {
    $route: {
      handler: function (to) {
        this.buttonAddClass(to.path)
      },
    },
  },
  mounted() {
    this.buttonAddClass(location.pathname)
  },
  methods: {
    buttonAddClass: function (toUrl) {
      if (this.$refs.buttons) {
        this.buttons.forEach((button, count) => {
          this.$refs.buttons[count].classList.remove('active-button')
          if (toUrl == button.href) {
            this.$refs.buttons[count].classList.add('active-button')
          }
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.koukoku-space {
  position: fixed;
  bottom: 5em;
  left: 0;
  width: 100%;
}
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
    .nav-button-div {
      text-align: center;
      width: -webkit-fill-available;
      width: -moz-available;
      opacity: 0.6;
      .nav-a {
        display: block;
        color: white;
        text-decoration: none;
        width: 100%;
        i {
          font-size: 3em;
        }
        p {
          font-size: 1em;
        }
      }
    }
    .active-button {
      opacity: 1;
      font-weight: bold;
    }
  }
}
</style>
