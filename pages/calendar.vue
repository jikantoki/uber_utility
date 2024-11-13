<template lang="pug">
.about
  h1 カレンダー！
  p 開発中
</template>

<script>
import metaFunctions from '~/js/metaFunctions'
import mixins from '~/mixins/mixins'
import Setup from '~/js/setup'

export default {
  mixins: [mixins],
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Calendar')
    Setup.setDescription('稼働履歴をカレンダーで見る')
  },
  mounted() {
    this.setTitle('カレンダー')
  },
}
</script>
