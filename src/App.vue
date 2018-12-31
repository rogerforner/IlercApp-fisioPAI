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

    <!-- Missatge informatiu
    =========================================================================-->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color">
      {{snackbar.text}}
      <v-btn flat @click="snackbar.show = false">
        <v-icon>fa-times-circle</v-icon>
      </v-btn>
    </v-snackbar>

    <!-- Roger Forner Fabre
    =========================================================================-->
    <v-layout row justify-center>
      <v-dialog v-model="dialogs.rogerFornerFabre" persistent max-width="350">
        <v-card>
          <!-- Títol -->
          <v-card-title primary-title class="headline">Informació</v-card-title>
          <v-divider></v-divider>

          <!-- Cos -->
          <v-card-text>
            <v-list two-line>
              <v-list-tile @click="openWebsite('rff')">
                <v-list-tile-action>
                  <v-icon color="primary">fa-user-circle</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>Roger Forner Fabre</v-list-tile-title>
                  <v-list-tile-sub-title>Desenvolupador</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>fa-link</v-icon>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile @click="openWebsite('fisiopai')">
                <v-list-tile-action>
                  <v-icon color="primary">fa-code</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title>fisioPAI</v-list-tile-title>
                  <v-list-tile-sub-title>Versió {{fisiopai.version}}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>fa-link</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>

          <!-- Botons -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click.native="dialogs.rogerFornerFabre = false">Ok!</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-app>
</template>

<script>
import Navigation from './components/Nav'
const {app, shell} = require("electron").remote;
export default {
  name: "fisiopai",
  created () {
    this.$eventBus.$on("navInfo", () => {
      this.dialogs.rogerFornerFabre = true;
    });
    this.$eventBus.$on("showSnackbar", (data) => {
      this.snackbar.show  = true;
      this.snackbar.color = data.color;
      this.snackbar.text  = data.text;
    });
  },
  beforeDestroy() {
    this.$eventBus.$off("navInfo");
  },
  components: {
    Navigation,
  },
  data () {
    return {
      dialogs: {
        rogerFornerFabre: false,
      },
      snackbar: {
        show: false,
        color: "",
        text: ""
      },
      fisiopai: {
        version: app.getVersion()
      }
    }
  },
  methods: {
    /* rogerforner.com ********************************************************/
    openWebsite(page) {
      if (page == "rff") {
        shell.openExternal("https://rogerforner.com/");
      } else {
        shell.openExternal("https://rogerforner.com/project/fisiopai/");
      }
    }
  }
}
</script>