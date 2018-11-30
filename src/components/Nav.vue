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
      <v-list-tile @click="openPage('pai')">
        <v-list-tile-action>
          <v-icon color="primary">fa-keyboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Formulari</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- Configurar -->
      <v-list-tile @click="openPage('config')">
        <v-list-tile-action>
          <v-icon color="primary">fa-cog</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Configurar</v-list-tile-title>
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
  const fs = require("fs");
  const {app, dialog} = require("electron").remote;
  export default {
    name: "componentNav",
    data: () => ({
      // Definir ample del menú de navegació.
      mini: true,
    }),
    methods: {
      // Obrir pàgines (vue-router)
      // -----------------------------------------------------------------------
      openPage(pageVueRouterName) {
        this.$router.push({
          name: pageVueRouterName
        });
      },
      // Obrir modal "Informació"
      // -----------------------------------------------------------------------
      infoFisioPAI() {
        this.$eventBus.$emit("navInfo:change");
      },
      // Mostrar finestra "Importar fitxer de dades"
      // -----------------------------------------------------------------------
      openImport() {
        // Definir opcions finestra per importar fitxer.
        let options = {
          title: "Importar configuració / dades",
          // Ruta a directori per defecte + nom per defecte (modificable).
          defaultPath: app.getPath("documents"),
          filters: [{
            name: "fisioPAI",    // Nom del tipus de fitxer (desplegable).
            extensions: ["json"] // Extensions dels fitxers a visualitzar.
          }]
        }

        // Obrir finestra per obtenir dades del fitxer.
        dialog.showOpenDialog(null, options, (filePath) => {
          // Ha de ser una cadena per a "fs.readFileSync()".
          let filePathString = String(filePath);
          // "fs.readFileSync()" ens retorna en Buffer i ho passarem a JSON.
          let fileContentBuffer;
          let fileContentJSON;

          try {
            fileContentBuffer = fs.readFileSync(filePathString);
            fileContentJSON   = JSON.parse(fileContentBuffer);
            
            // Saber si ens passen les dades del formulari o de configuració.
            if (fileContentJSON.dataType == "fisiopaiForm") {
              // Crear fitxer temporal

            } else if (fileContentJSON.dataType == "fisiopaiConfig") {
              // Sobreescriure el fitxer de configuració.
              // Només passem les dades de Serveis i Ubicacions.
              this.storeIntoImaginaryDatabase(fileContentJSON.data);
            } else {
              alert("El fitxer que intentes carregar no es vàlid");
            }
            
          } catch(e) {
            alert("No s'ha importat el fitxer.");
          }
        });
      },
      // Tractar fitxer que simula la BD.
      // -----------------------------------------------------------------------
      storeIntoImaginaryDatabase(dataFile) {
        let data     = JSON.stringify(dataFile);
        let filename = "fisiopaiConfig.json";

        try {
          fs.writeFileSync(filename, data, "utf-8");
        } catch(e) {
          alert("No s'han desat les dades.");
        }
      },
    }
  }
</script>

<style>

</style>
