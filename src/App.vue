<template>
  <v-app>
    <!-- Navegació -->
    <Nav/>

    <!-- Contingut -->
    <v-content>
      <Form/>
    </v-content>

    <!-- Configuració -->
    <Config/>
  </v-app>
</template>

<script>
import Nav from './components/Nav'
import Form from './components/Form'
import Config from './components/Config'

export default {
  name: "App",
  components: {
    Nav,
    Form,
    Config
  },
  data () {
    return {
      //
    }
  }
}
</script>
