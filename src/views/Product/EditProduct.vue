<template >
  <v-dialog width="400px" v-model="dialog" class="v-btn--block">
    <v-btn block color="light-blue darken-4" slot="activator">Править</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Править товар</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="title" 
                label="Заголовок" 
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-text-field
                name="description" 
                label="Описание" 
                type="text"
                multi-line
                v-model="editedDescription"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark color="light-blue darken-4" outline @click="onCancel">Выход</v-btn>
              <v-btn dark color="light-blue darken-4" @click="onSave">Сохранить</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      dialog: false,
      editedTitle: this.product.title,
      editedDescription: this.product.description
    }
  },
  methods: {
    onCancel () {
      this.editedTitle = this.product.title
      this.editedDescription = this.product.description
      this.dialog = false
    },
    onSave () {
      if (this.editedTitle !== '' && this.editedDescription !== '') { // не пустые строки
        this.$store.dispatch('updateProduct', { // обновления в БД - метод назвали updateProduct
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.product.id
        })
        this.dialog = false
      }
    }
  }
}
</script>
