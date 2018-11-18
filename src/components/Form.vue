<template>
  <v-container>
    <v-card>
      <!-- Títol -->
      <v-card-title primary-title>
        <h3 v-if="userSex == 'dona'" class="headline mb-0">Dades de l'usuària</h3>
        <h3 v-else class="headline mb-0">Dades de l'usuari</h3>
      </v-card-title>

      <!-- Formulari -->
      <v-card-text>
        <v-form>
          <!-- Sexe
          ===================================================================-->
          <v-radio-group v-model="userSex" :mandatory="false" row>
            <v-radio label="Dona" value="dona" color="primary"></v-radio>
            <v-radio label="Home" value="home" color="primary"></v-radio>
            <v-icon v-if="userSex == 'dona'" color="primary">fa-venus</v-icon>
            <v-icon v-else color="primary">fa-mars</v-icon>
          </v-radio-group>

          <!-- Edat
          ===================================================================-->
          <v-text-field v-model="userAge" label="Edat" type="number"></v-text-field>

          <!-- Servei
          ===================================================================-->
          <v-select v-model="userService" :items="userServiceItems" label="Servei"></v-select>

          <!-- Ubicació
          ===================================================================-->
          <v-select v-model="userLocation" :items="userLocationItems" label="Ubicació"></v-select>

          <!-- Antecedents
          ===================================================================-->
          <v-textarea v-model="userAntecedents" label="Antecedents" rows="3"></v-textarea>

          <!-- Estat cognitiu
          ===================================================================-->
          <v-select v-model="userCognitiveState" :items="userCognitiveStateItems" label="Estat cognitiu"></v-select>

          <!-- Transferències
          ===================================================================-->
          <v-textarea v-model="userTransfers" label="Transferències" rows="3"></v-textarea>

          <!-- Marxa
          ===================================================================-->
          <v-textarea v-model="userMarch" label="Marxa" rows="3"></v-textarea>

          <!-- Productes de suport / Altres AT
          ===================================================================-->
          <v-textarea v-model="userSupportProducts" label="Productes de suport / Altres AT" rows="3"></v-textarea>

          <!-- Balanç muscular
          ===================================================================-->
          <v-textarea v-model="userMuscularBalance" label="Balanç muscular" rows="3"></v-textarea>

          <!-- Balanç articular
          ===================================================================-->
          <v-textarea v-model="userJointBalance" label="Balanç articular" rows="3"></v-textarea>

          <!-- Dolor/Clínica
          ===================================================================-->
          <v-textarea v-model="userPain" label="Dolor/Clínica" rows="3"></v-textarea>

          <!-- ttm de FST
          ===================================================================-->
          <v-textarea v-model="userTtm" label="ttm de FST" rows="3"></v-textarea>

          <!-- Evolució
          ===================================================================-->
          <v-textarea v-model="userEvolution" label="Evolució" rows="3"></v-textarea>

          <!-- Estat de la veu
          ===================================================================-->
          <v-textarea v-model="userVoiceStatus" label="Estat de la veu" rows="3"></v-textarea>

          <!-- Pautes específiques
          ===================================================================-->
          <v-textarea v-model="userSpecificGuidelines" label="Pautes específiques" rows="3"></v-textarea>

          <!-- Caigudes
          ===================================================================-->
          <v-textarea v-model="userFalls" label="Caigudes" rows="3"></v-textarea>

          <!-- Contencions
          ===================================================================-->
          <v-textarea v-model="userContentions" label="Contencions" rows="3"></v-textarea>

          <!-- TO
          ===================================================================-->
          <v-textarea v-model="userTo" label="TO" rows="3"></v-textarea>

          <!-- Grup de risc
          ===================================================================-->
          <v-select v-model="userRiskGroup" :items="userRiskGroupItems" label="Grup de risc"></v-select>

          <!-- Test Tinetti
          ===================================================================-->
          <v-text-field v-model="userTinettiTest" label="Test Tinetti" type="number"></v-text-field>

          <!-- Test Dawton
          ===================================================================-->
          <v-text-field v-model="userDawtonTest" label="Test Dawton" type="number"></v-text-field>

          <!-- Test Barthel
          ===================================================================-->
          <v-text-field v-model="userBarthelTest" label="Test Barthel" type="number"></v-text-field>

          <!-- Observacions sobre l'adaptació
          ===================================================================-->
          <v-textarea v-model="userObservations" label="Observacions sobre l'adaptació" rows="3"></v-textarea>

          <!-- Es detecta necessitat de
          ===================================================================-->
          <v-textarea v-model="userDetectionNeeds" label="Es detecta necessitat de" rows="3"></v-textarea>
        </v-form>
      </v-card-text>

      <!-- Botons -->
      <v-card-actions>
        <v-btn flat color="primary" @click.native="dialogWithGeneratedText = true">Generar text <v-icon right>fa-file-signature</v-icon></v-btn>
        <v-btn flat color="primary" @click="saveDataFormToFile()">Guardar <v-icon right>fa-save</v-icon></v-btn>
      </v-card-actions>
    </v-card>

    <!-- Modal Generar Text -->
    <v-layout row justify-center>
      <v-dialog v-model="dialogWithGeneratedText" scrollable>
        <v-card>
          <!-- Títol -->
          <v-card-title primary-title class="headline">Text generat</v-card-title>
          <v-divider></v-divider>

          <!-- Cos -->
          <v-card-text>
            <span v-if="userSex == 'dona'">Usuària</span><span v-else>Usuari</span> de {{userAge}} anys a la qual se li presta el servei de "{{userService}}"
          </v-card-text>
          <v-divider></v-divider>

          <!-- Botons -->
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click.native="dialogWithGeneratedText = false">Tancar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dialogWithGeneratedText: false,
      // Dades del formulari
      userSex: "dona",
      userAge: "",
      userService: null,
      userServiceItems: [
        "Residència",
        "Residència (IT)",
        "Centre de dia",
        "Centre de dia (IT)"
      ],
      userLocation: null,
      userLocationItems: [
        "La Petja",
        "Coll de l'Alba",
        "Mig Camí"
      ],
      userAntecedents: "",
      userCognitiveState: null,
      userCognitiveStateItems: [
        "Sense afecció",
        "Lleu",
        "Moderat",
        "Greu"
      ],
      userTransfers: "",
      userMarch: "",
      userSupportProducts: "",
      userMuscularBalance: "",
      userJointBalance: "",
      userPain: "",
      userTtm: "",
      userEvolution: "",
      userVoiceStatus: "",
      userSpecificGuidelines: "",
      userFalls: "",
      userContentions: "",
      userTo: "",
      userRiskGroup: null,
      userRiskGroupItems: [
        "A",
        "B",
        "C",
        "D",
        "E"
      ],
      userTinettiTest: "",
      userDawtonTest: "",
      userBarthelTest: "",
      userObservations: "",
      userDetectionNeeds: "",
      dataForm: "",
    }),
    methods: {
      saveDataFormToFile() {
        alert("Guardar");
      }
    }
  }
</script>

<style>

</style>
