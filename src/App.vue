<template>
  <v-app>
    <!-- Navegació -->
    <Nav/>

    <!-- Contingut -->
    <v-content>
      <Form/>
    </v-content>
  </v-app>
</template>

<script>
import Nav from './components/Nav'
import Form from './components/Form'

export default {
  name: 'App',
  components: {
    Nav,
    Form
  },
  data () {
    return {
      //
    }
  }
}
</script>
