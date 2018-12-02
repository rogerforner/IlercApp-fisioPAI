<template>
  <v-app id="app">
    <!-- Navegació
    =========================================================================-->
    <Navigation/>

    <!-- Contingut (pàgines)
    =========================================================================-->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from './components/Nav'
export default {
  name: "fisiopai",
  components: {
    Navigation,
  },
  data () {
    return {
      //
    }
  }
}
</script>