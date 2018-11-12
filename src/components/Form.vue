<template>
  <v-container>
    <v-card>
      <!-- Título -->
      <v-card-title primary-title>
        <h3 class="headline mb-0">Dades</h3>
      </v-card-title>

      <!-- Formulario -->
      <v-card-text>
        <v-form>
          <!-- SEXE
          ===================================================================-->
          <v-radio-group v-model="usuariSexe" :mandatory="false" row>
            <v-radio label="Dona" value="dona" color="primary"></v-radio>
            <v-radio label="Home" value="home" color="primary"></v-radio>
            <v-icon v-if="usuariSexe == 'dona'" color="primary">fa-venus</v-icon>
            <v-icon v-else color="primary">fa-mars</v-icon>
          </v-radio-group>

          <!-- EDAT
          ===================================================================-->
          <v-text-field label="Edat" type="number"></v-text-field>
        </v-form>
      </v-card-text>

      <!-- Botones -->
      <v-card-actions>
        <v-btn flat color="primary">Copiar text <v-icon right>fa-copy</v-icon></v-btn>
        <v-btn flat color="primary">Guardar <v-icon right>fa-save</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      usuariSexe: "dona"
    })
  }
</script>

<style>

</style>
