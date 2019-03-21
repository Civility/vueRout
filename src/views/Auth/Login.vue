<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Форма входа</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation                
                >
                  <v-text-field 
                    prepend-icon="person" 
                    v-model="email" 
                    :rules="emailRules"
                    name="email" 
                    label="Email" 
                    type="email"
                  ></v-text-field>
                  <v-text-field 
                    prepend-icon="lock" 
                    v-model="password" 
                    :counter="6"
                    :rules="passwordRules"
                    name="password" 
                    label="Параль" 
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    color="primary" 
                    @click="onSubmit"
                    :loading="loading"
                    :disabled="!valid || loading"
                >Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data(){
      return {
          email:'',
          password: '',
          valid: false,
          emailRules: [  // данные для всей страницы взял из документации https://vuetifyjs.com/
              v => !!v || 'Требуется E-mail',
              v => /.+@.+/.test(v) || 'E-mail должен быть существующим'
          ],
          passwordRules: [
              v => !!v || 'Пароль обязателен',
              v => (v && v.length >= 6 && v.length <= 10) || 'Пароль должнен быть не менее 6 символов'
          ],
      }
  },
  computed: {
      loading(){ // достает значение store по значению
      return this.$store.getters.loading
    }    
  },
  methods: {
      onSubmit() {
          if (this.$refs.form.validate()) {
              // this.snackbar = true;
              const user = {
                  email: this.email,
                  password: this.password
              }
              // console.log(user);
              this.$store.dispatch('loginUser', user)
              .then(()=> {
                this.$router.push('/')
              })
              .catch(() => {}) // вызов ошибки (axios ) прописан в App.vue (пустая функция вызывает пустой объект)
          }
      }
  },
  created() { // метод обработки Ошибки (проверки роутинга для доступа к страницам)
    // loginError описан в auth-guard.js (передает ошибку если зашел не туда)
    if(this.$route.query['loginError']) { // обращаемся к текущему $route - роуту(смотрим в query и если loginError есть, то)
      this.$store.dispatch('setError','Пожалуйста, зарегистрируйтесь, что бы зайти на страницу' ) // обратиться к $store
    }
  }
}
</script>
