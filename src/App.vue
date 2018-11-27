<template>
  <v-app id="app">
    <!-- Navegació
    =========================================================================-->
    <Navigation/>

    <!-- SPA
    =========================================================================-->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from './components/Nav'
export default {
  name: "pai",
  components: {
    Navigation
  },
  data () {
    return {
      //
    }
  }
}
</script>