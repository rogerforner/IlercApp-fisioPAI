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
      /* LINKS ****************************************************************/

      // vue-router ------------------------------------------------------------
      // Mostrar la pàgina. El paràmetre prendrà com a valor el nom de la ruta,
      // aquesta definida en la configuració de vue-router "/router/index.js".
      // Si passem de la pàgina "pai" a "config" hem d'emetre un event que ens
      // permeti desar les dades del formulari en un fitxer JSON temporal.
      // -----------------------------------------------------------------------
      openPage(pageVueRouterName) {
        // EventBus.
        if (this.$route.name != "config") {
          this.$eventBus.$emit("saveDataPaiTemp");
        }

        // Canviem de pàgina.
        this.$router.push({
          name: pageVueRouterName
        });
      },
      
      // Modal info fisioPAI ---------------------------------------------------
      // Obrir un modal de vuetify per mostrar informació de la app fisioPAI.
      // S'empra un "EventBus" per mostrar-lo, capturant-lo en App.vue.
      // -----------------------------------------------------------------------
      infoFisioPAI() {
        this.$eventBus.$emit("navInfo");
      },

      // Importar dades --------------------------------------------------------
      // Permet importar un fitxer de dades. Aquest fitxer pot ser un fitxer de
      // configuració (amb les dades de la pàgina corresponent) o un fitxer que
      // contingui les dades del formulari, desades per poder seguir treballant
      // en un altre moment.
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
          // Mostrar informació sobre l'acció realitzada (objecte).
          let info = {};
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
              // Saber sexe de usuari/a per mostrar en informació.
              let userSex = fileContentJSON.data[0].userSex;
              let text;

              // Sobreescriure el fitxer temporal.
              // Només passem les dades corresponents als camps del formulari.
              this.saveDataFormToFileTemp(fileContentJSON.data);

              if (userSex == "dona") {
                text = "Dades de l'usuària importades satisfactòriament.";
              } else {
                text = "Dades de l'usuari importades satisfactòriament.";
              }

              info = {
                color: "primary",
                text: text
              }
              this.$eventBus.$emit("showSnackbar", info);

            } else if (fileContentJSON.dataType == "fisiopaiConfig") {
              // Sobreescriure el fitxer de configuració.
              // Només passem les dades de Serveis i Ubicacions.
              this.storeIntoImaginaryDatabase(fileContentJSON.data);

              info = {
                color: "primary",
                text: "Configuració importada satisfactòriament."
              }
              this.$eventBus.$emit("showSnackbar", info);

            } else {
              info = {
                color: "error",
                text: "El fitxer seleccionat no es vàlid."
              }
              this.$eventBus.$emit("showSnackbar", info);
            }

          } catch(e) {
            info = {
              color: "amber darken-4",
              text: "No s'ha importat cap fitxer."
            }
            this.$eventBus.$emit("showSnackbar", info);
          }
        });
      },
      
      /* BASE DE DADES ********************************************************/

      // Desar a la BD ---------------------------------------------------------
      // Desar les dades en un fitxer JSON, el qual serà tractat com la BD de la
      // app, permetent la recuperació d'aquestes.
      // -----------------------------------------------------------------------
      storeIntoImaginaryDatabase(dataFile) {
        let data     = JSON.stringify(dataFile);
        let filepath = app.getPath("userData");
        let filename = "fisiopai.config.json";

        try {
          fs.writeFileSync(filepath+"/"+filename, data, "utf-8");
          this.$eventBus.$emit("dbChangeInfoToPai");
          this.$eventBus.$emit("dbChangeInfoToConfig");
        } catch(e) {
          alert("No s'han desat les dades\n"+e);
        }
      },

      /* FITXER (temporal) ****************************************************/

      // Fitxer temp -----------------------------------------------------------
      // Generar un fitxer JSON en el que emmagatzemar les dades en el cas de
      // que es canvie de pàgina. Mitjançant aquest s'evita la pèrdua de dades.
      // -----------------------------------------------------------------------
      saveDataFormToFileTemp(dataFile) {
        let data     = JSON.stringify(dataFile);
        let filepath = app.getPath("userData");
        let filename = "fisiopai.temp.json";

        try {
          fs.writeFileSync(filepath+"/"+filename, data, "utf-8");
          this.$eventBus.$emit("tempChangeInfoToPai");
        } catch(e) {
          alert("S'han perdut les dades del formulari.\n"+e);
        }
      },
    }
  }
</script>

<style>

</style>
