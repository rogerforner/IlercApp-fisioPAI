<template>
  <v-container>
    <v-card>
      <!-- Barra superior
      =======================================================================-->
      <v-toolbar dark color="primary">
        <v-toolbar-title>
          <v-icon right>fa-cog</v-icon> Configuració
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click="saveDataFormToFile()">Desar <v-icon right>fa-save</v-icon></v-btn>
        </v-toolbar-items>
        <!-- Pestanyes -->
        <v-tabs slot="extension" v-model="tabs" centered color="transparent" slider-color="white">
          <v-tab>
            Serveis
          </v-tab>
          <v-tab>
            Ubicacions
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <!-- Contingut (taules)
      =======================================================================-->
      <v-card-text>
        <v-tabs-items v-model="tabs">
          <!-- Servei
          ...................................................................-->
          <v-tab-item>
            <v-card>
              <v-card-text>
                <!-- Afegir servei -->
                <v-btn flat color="primary" @click="openForm('service', 'create')">Afegir <v-icon right>fa-plus-circle</v-icon></v-btn>
                <!-- Taula -->
                <v-data-table :items="dataTables.userServices.data" hide-headers>
                  <template slot="items" slot-scope="props">
                    <td>{{props.item.name}}</td>
                    <td class="text-xs-right">
                      <v-item-group class="v-btn-group">
                        <v-btn flat icon dark color="primary" @click="openForm('service', 'update', props.index, props.item.name)">
                          <v-icon small>fa-pencil-alt</v-icon>
                        </v-btn>
                        <v-btn flat icon dark color="error" @click="openForm('service', 'destroy', props.index, props.item.name)">
                          <v-icon small>fa-trash-alt</v-icon>
                        </v-btn>
                      </v-item-group>
                    </td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <!-- Ubicació
          ...................................................................-->
          <v-tab-item>
            <v-card>
              <v-card-text>
                <!-- Afegir ubicació -->
                <v-btn flat color="primary" @click="openForm('location', 'create')">Afegir <v-icon right>fa-plus-circle</v-icon></v-btn>
                <!-- Taula -->
                <v-data-table :items="dataTables.userLocations.data" hide-headers>
                  <template slot="items" slot-scope="props">
                    <td>{{props.item.name}}</td>
                    <td class="text-xs-right">
                      <v-item-group class="v-btn-group">
                        <v-btn flat icon dark color="primary" @click="openForm('location', 'update', props.index)">
                          <v-icon small>fa-pencil-alt</v-icon>
                        </v-btn>
                        <v-btn flat icon dark color="error" @click="openForm('location', 'destroy', props.index)">
                          <v-icon small>fa-trash-alt</v-icon>
                        </v-btn>
                      </v-item-group>
                    </td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>

    <!-- Formulari
    =========================================================================-->
    <v-dialog v-model="dialogs.form.isFormVisible" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{dialogs.form.title}}</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="dataForm.name" :label="dialogs.form.formLabel" type="text"></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click.native="closeForm()">Cancel·lar</v-btn>
          <v-btn color="primary" flat @click="manipulateItem(dialogs.form.submitType, dialogs.form.submitAction, dialogs.form.submitId)">{{dialogs.form.submitName}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  const fs = require("fs");
  const {app, dialog} = require("electron").remote;
  export default {
    name: "componentConfig",
    created () {
      this.readFromImaginaryDatabase();
      this.$eventBus.$on("dbChangeInfoToConfig", () => {
        this.readFromImaginaryDatabase();
      });
    },
    beforeDestroy() {
      this.$eventBus.$off("dbChangeInfoToConfig");
    },
    data: () => ({
      dialogs: {
        form: {
          isFormVisible: false,
          title: "",
          formLabel: "",
          submitName: "",
          submitAction: "",
        }
      },
      tabs: null,
      // Dades del formulari.
      dataForm: {
        name: ""
      },
      // Dades de la taula.
      dataTables: {
        userServices: {
          data: []
        },
        userLocations: {
          data: []
        }
      },
      // Desar fitxer.
      dataStore: {
        dataType: "fisiopaiConfig",
        data: []
      }
    }),
    methods: {
      /* FORMULARI ************************************************************/

      // Obrir -----------------------------------------------------------------
      // Permet obrir la finestra del formulari i també inserir els textos que
      // es corresponguin amb el CRUD, així com en el tipus d'ítem a crear.
      // -----------------------------------------------------------------------
      openForm(type, action, id = null, name = null) {
        this.dialogs.form.formLabel = "Nom";
        // Texts definits pel tipus.
        if (type == "service") {
          if (action == "create") {
            this.dialogs.form.title = "Nou servei";
          } else if (action == "update") {
            this.dialogs.form.title = "Modificar servei";
          } else {
            this.dialogs.form.title = "Esborrar servei";
          }
        } else if (type == "location") {
          if (action == "create") {
            this.dialogs.form.title = "Nova ubicació";
          } else if (action == "update") {
            this.dialogs.form.title = "Modificar ubicació";
          } else {
            this.dialogs.form.title = "Esborrar ubicació";
          }
        }

        // Texts generals.
        if (action == "create") {
          this.dialogs.form.submitName = "Afegir";
        } else if (action == "update") {
          this.dialogs.form.submitName = "Actualitzar";
          this.dataForm.name           = name;
        } else {
          this.dialogs.form.submitName = "Esborrar";
          this.dataForm.name           = name;
        }

        // Dades emprades en la funció "manipulateItem(type, action, id)".
        this.dialogs.form.submitType   = type;
        this.dialogs.form.submitAction = action;
        this.dialogs.form.submitId     = id;

        // Obrir.
        this.dialogs.form.isFormVisible = true;
      },
      
      // Tancar ----------------------------------------------------------------
      // Permet tancar la finestra del formulari i, també, resetejar els camps.
      // -----------------------------------------------------------------------
      closeForm() {
        this.dialogs.form.isFormVisible = false;
        this.dataForm.name = "";
      },

      /* CRUD *****************************************************************/

      // Crear / Editar / Esborrar ---------------------------------------------
      // Permet dur endavant la edició, creació i esborrat d'un ítem.
      // -----------------------------------------------------------------------
      manipulateItem(type, action, id) {
        if (type == "service") {
          if (action == "create") {
            // Insertem les dades en l'array.
            this.dataTables.userServices.data.push({name: this.dataForm.name});
          } else if (action == "update") {
            // Obtenim l'objecte d'index "id" i assignem el nou valor a "name".
            // L'id representa l'índex de l'objecte (mirar taula props.index).
            this.dataTables.userServices.data[id].name = this.dataForm.name;
          } else {
            // Obtenim l'arrai i eliminem l'element posicionat en l'index "id".
            // El número 1 representa el total d'elements a esborrar a partir
            // de l'index (només volem esborrar-ne 1).
            this.dataTables.userServices.data.splice(id, 1);
          }
        } else if (type == "location") {
          if (action == "create") {
            this.dataTables.userLocations.data.push({name: this.dataForm.name});
          } else if (action == "update") {
            this.dataTables.userLocations.data[id].name = this.dataForm.name;
          } else {
            this.dataTables.userLocations.data.splice(id, 1);
          }
        }

        // Guardar/Llegir dades en fitxer que simula la BD de la app.
        this.storeIntoImaginaryDatabase();
        this.readFromImaginaryDatabase();

        // Tancar.
        this.closeForm();
      },

      /* DESAR ****************************************************************/

      // Fitxer ----------------------------------------------------------------
      // Generar un fitxer JSON amb totes les dades per poder-les importar en un
      // altre moment.
      // -----------------------------------------------------------------------
      saveDataFormToFile() {
        // Guardar dades del formulari en array preparat per a aquestes.
        this.dataStore.data = []; // Buidar.
        this.dataStore.data.push(this.dataTables);

        // Ordenar arrays d'objectes.
        this.dataStore.data[0].userServices.data.sort(function (service1, service2) {
          if (service1.name > service2.name) return 1;
          if (service1.name < service2.name) return -1;
        });
        this.dataStore.data[0].userLocations.data.sort(function (location1, location2) {
          if (location1.name > location2.name) return 1;
          if (location1.name < location2.name) return -1;
        });

        // Convertir a JSON i Guardar en fitxer.
        let content = JSON.stringify(this.dataStore);

        // Definir opcions finestra per importar fitxer.
        let options = {
          title: "Desar configuració",
          // Ruta a directori per defecte + nom per defecte (modificable).
          defaultPath: app.getPath("documents") + "/fisiopai-configuració.json",
          filters: [{
            name: "fisioPAI",    // Nom del tipus de fitxer (desplegable).
            extensions: ["json"] // Extensions dels fitxers a visualitzar.
          }]
        }

        // Obrir finestra per guardar dades en fitxer.
        dialog.showSaveDialog(null, options, (filename) => {
          try {
            fs.writeFileSync(filename, content, "utf-8");
          } catch(e) {
            alert("No s'ha desat el fitxer.\n"+e);
          }
        });
      },

      /* BASE DE DADES ********************************************************/

      // Desar a la BD ---------------------------------------------------------
      // Desar les dades en un fitxer JSON, el qual serà tractat com la BD de la
      // app, permetent la recuperació d'aquestes.
      // -----------------------------------------------------------------------
      storeIntoImaginaryDatabase() {
        this.dataStore.data = []; // Buidar.
        this.dataStore.data.push(this.dataTables);

        // Ordenar arrays d'objectes.
        this.dataStore.data[0].userServices.data.sort(function (service1, service2) {
          if (service1.name > service2.name) return 1;
          if (service1.name < service2.name) return -1;
        });
        this.dataStore.data[0].userLocations.data.sort(function (location1, location2) {
          if (location1.name > location2.name) return 1;
          if (location1.name < location2.name) return -1;
        });

        let data     = JSON.stringify(this.dataStore.data);
        let filename = "fisiopai.config.json";

        try {
          fs.writeFileSync(filename, data, "utf-8");
        } catch(e) {
          alert("No s'han desat les dades.\n"+e);
        }
      },

      // Lectura de la BD ------------------------------------------------------
      // Llegir el JSON per extreure les dades. En el cas de que no existeixi el
      // fitxer, aquest es generarà de forma automàtica.
      // -----------------------------------------------------------------------
      readFromImaginaryDatabase() {
        let filename = "fisiopai.config.json";
        let content  = '[{"userServices":{"data":[]},"userLocations":{"data":[]}}]';

        try {
          content = JSON.parse(fs.readFileSync("fisiopai.config.json", "utf-8"));

          this.dataTables.userServices.data  = []; // Buidar.
          this.dataTables.userLocations.data = [];

          this.dataTables.userServices.data  = content[0].userServices.data;
          this.dataTables.userLocations.data = content[0].userLocations.data;
        } catch(e) {
          alert("No existeix cap base de dades.\n"+e);

          try {
            fs.writeFileSync(filename, content, "utf-8");
          } catch(e) {
            alert("No s'ha creat la base de dades.\n"+e);
          }
        }
      }
    }
  }
</script>

<style>

</style>