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
          <v-btn dark flat @click="dialogs.isConfigVisible = false">Desar <v-icon right>fa-save</v-icon></v-btn>
        </v-toolbar-items>
        <!-- Pestanyes -->
        <v-tabs slot="extension" v-model="tabs" centered color="transparent" slider-color="white">
          <v-tab>
            Servei
          </v-tab>
          <v-tab>
            Ubicació
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
                <v-data-table :items="dataTable.userServices.data" hide-headers>
                  <template slot="items" slot-scope="props">
                    <td>{{props.item.name}}</td>
                    <td class="text-xs-right">
                      <v-item-group class="v-btn-group">
                        <v-btn flat icon dark color="primary" @click="openForm('service', 'update')">
                          <v-icon small>fa-pencil-alt</v-icon>
                        </v-btn>
                        <v-btn flat icon dark color="error">
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
                <v-data-table :items="dataTable.userLocations.data" hide-headers>
                  <template>
                    <td>xxx</td>
                    <td>xxx</td>
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
          <v-btn color="primary" flat>{{dialogs.form.submitName}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: "Config",
    created () {
      //
    },
    data: () => ({
      dialogs: {
        form: {
          isFormVisible: false,
          title: "",
          formLabel: "",
          submitName: ""
        }
      },
      tabs: null,
      // Dades del formulari
      dataForm: {
        name: ""
      },
      // Dades de la taula
      dataTable: {
        userServices: {
          data: [
            {name: "Hola"},
          ]
        },
        userLocations: {
          data: []
        }
      }
    }),
    methods: {
      // Obrir la finestra amb el formulari
      // -----------------------------------------------------------------------
      openForm(type, action) {
        this.dialogs.form.formLabel = "Nom";
        if (type == "service") {
          // Texts segons el tipus d'acció a realitzar.
          if (action == "create") {
            this.dialogs.form.title = "Nou servei";
            this.dialogs.form.submitName = "Afegir";
          } else {
            this.dialogs.form.title = "Modificar servei";
            this.dialogs.form.submitName = "Actualitzar";
          }
        } else if (type == "location") {
          // Texts segons el tipus d'acció a realitzar.
          if (action == "create") {
            this.dialogs.form.title = "Nova ubicació";
            this.dialogs.form.submitName = "Afegir";
          } else {
            this.dialogs.form.title = "Modificar servei";
            this.dialogs.form.submitName = "Actualitzar";
          }
        }

        // Obrir
        this.dialogs.form.isFormVisible = true;
      },
      // Tancar la finestra amb el formulari
      // -----------------------------------------------------------------------
      closeForm() {
        this.dialogs.form.isFormVisible = false;
      },
      // Editar/Crear
      // -----------------------------------------------------------------------
    }
  }
</script>

<style>

</style>