<template lang="pug">
.koukoku
  //-adsense(ad-client="ca-pub-8459277046412894"
    ad-slot="5423811324"
    ad-style="display:block"
    ad-format="auto")
  .koukoku-test
    .koukoku-body.py-2
      img.mx-4.koukoku-img(src="/img/icon512.png")
      .koukoku-text.ml-2
        h2 広告テスト
        .koukoku-content ここに広告を表示します
</template>

<script>
import vueAdsense from '~/items/vue-adsense'
export default {
  components: {
    adsense: vueAdsense,
  },
  data() {
    return {}
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.koukoku-test {
  background: #114514;
  .koukoku-body {
    display: flex;
    align-items: center;
    .koukoku-img {
      width: 3em;
      height: 3em;
    }
  }
}
</style>
