<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'fisiopai'
  }
</script>

<style lang="scss">
/* Color del tema */
$--color-primary: #6a1b9a;

/* Ubicación de la fuente, obligatoria */
$--font-path: '~element-ui/lib/theme-chalk/fonts';

@import "~element-ui/packages/theme-chalk/src/index";
</style>
