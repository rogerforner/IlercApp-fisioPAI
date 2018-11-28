<template>
  <v-navigation-drawer :mini-variant="mini" app permanent>

    <!-- Capçalera -->
    <v-list class="pa-1">
      <v-list-tile v-if="mini" @click="mini = !mini">
        <v-list-tile-action>
          <v-icon color="primary">fa-angle-right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile v-if="!mini" avatar>
        <v-list-tile-content>
          <v-list-tile-title>Fisioteràpia</v-list-tile-title>
          <v-list-tile-sub-title><em>Pla d'Atenció Individualitzat</em></v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn v-if="!mini" @click="mini = !mini;" icon>
            <v-icon color="primary">fa-angle-left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <!-- Botons -->
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <!-- Formulari -->
      <v-list-tile @click="openPai()">
        <v-list-tile-action>
          <v-icon color="primary">fa-keyboard</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Formulari</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- Importar -->
      <v-list-tile @click="openImport()">
        <v-list-tile-action>
          <v-icon color="primary">fa-file-import</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Importar</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- Configurar -->
      <v-list-tile @click="openConfig()">
        <v-list-tile-action>
          <v-icon color="primary">fa-cog</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>Configurar</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- FisioPAI -->
      <v-list-tile @click="infoFisioPAI()">
        <v-list-tile-action>
          <v-icon color="primary">fa-question-circle</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>fisioPAI</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "Nav",
    data: () => ({
      // Definir ample del menú de navegació.
      mini: true,
    }),
    methods: {
      // Mostrar pantalla "Formulari"
      // -----------------------------------------------------------------------
      openPai() {
        this.$router.push({
          name: "pai"
        });
      },
      // Mostrar modal "Importació Dades"
      // -----------------------------------------------------------------------
      openImport() {
        this.$eventBus.$emit("navImport:change");
      },
      // Mostrar pantalla "Configuració"
      // -----------------------------------------------------------------------
      openConfig() {
        this.$router.push({
          name: "config"
        });
      },
      // Obrir modal "Informació"
      // -----------------------------------------------------------------------
      infoFisioPAI() {
        this.$eventBus.$emit("navInfo:change");
      }
    }
  }
</script>

<style>

</style>
