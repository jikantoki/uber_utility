<template lang="pug">
.center
  .copyRight &copy; 2019 - {{ new Date().getFullYear() }} エノキ電気
.hitsuyou-mudana-space
</template>

<script>
import mixins from '~/mixins/mixins'
export default {
  mixins: [mixins],
}
</script>

<style lang="scss" scoped>
.hitsuyou-mudana-space {
  height: 3em;
  width: 100%;
}
</style>
