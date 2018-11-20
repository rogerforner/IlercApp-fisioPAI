<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <!-- Barra superior -->
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>fa-times-circle</v-icon>
          </v-btn>
          <v-toolbar-title>Configuració</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Guardar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    name: "Config",
    created () {
      this.$eventBus.$on("navConfig:change", () => {
        this.dialog = true;
      })
    },
    data: () => ({
      dialog: false,
    })
  }
</script>

<style>

</style>