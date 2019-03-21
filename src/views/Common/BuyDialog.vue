<template>
  <v-dialog width="400px" v-model="dialog"  class="v-btn--block">
    <!-- <v-btn block dark color="light-blue darken-4" class="headline" slot="activator">Купить</v-btn> -->
    <v-btn block color="light-blue darken-4" slot="activator">Купить!</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Вы хотите купить этот товар?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name" 
                label="Ваше Имя" 
                type="text"
                v-model="name"
                hint="Введите Ваше Имя"
              ></v-text-field>
              <v-text-field
                name="phone" 
                label="Ваш Телефон" 
                type="text"
                v-model="phone"
                hint="Введите Ваш Телефон"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                flat 
                outline 
                class="error"
                @click="onCancel" 
                :disabled="localLoading"
              >Закрыть</v-btn>
              <v-btn 
                flat
                class="success" 
                @click="onSave"
                :disabled="localLoading"
                :loading="localLoading"
              >Купить товар</v-btn>
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
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.dialog = false
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          productId: this.product.id,
          ownerId: this.product.ownerId
        })
        .finally(() => {
          this.name = ''
          this.phone = ''
          this.localLoading = false
          this.dialog = false
        })
      }
    }
  }
}
</script>
