<template lang="pug">
.index-page
  commonMainContent
</template>

<script>
/**
 * ページ推移ごとにmountedを実行する必要があるため、どのviewsでも読み込むこと
 */
import mixins from '~/mixins/mixins'
import webpush from '~/js/webpush'
import metaFunctions from '~/js/metaFunctions'
import Setup from '~/js/setup'
import commonMainContent from '~/components/common/commonMainContent.vue'

export default {
  name: 'index',
  mixins: [mixins],
  components: {
    commonMainContent,
  },
  setup() {
    //サーバーサイドで仮のタイトルを設定、mountedで言語ごとに再設定する
    Setup.setTitle('Top')
    Setup.setDescription('個人事業主のためのユーティリティ')
  },
  data() {
    return {}
  },
  async mounted() {
    this.setTitle(this.$t('index.title'))
  },
  methods: {},
  watch: {},
}
</script>

<style lang="scss" scoped></style>
