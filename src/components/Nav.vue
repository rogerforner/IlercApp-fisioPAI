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

      <v-list-tile v-for="item in items" :key="item.title" @click="">
        <v-list-tile-action>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  export default {
    data: () => ({
      mini: true,
      items: [
        { title: 'Importar', icon: 'fa-file-import' },
        { title: 'Configurar', icon: 'fa-cog' },
        { title: 'fisioPAI', icon: 'fa-question-circle' }
      ],
    })
  }
</script>

<style>

</style>
