<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Регистрация</v-toolbar-title>
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
                    label="Password" 
                    type="password"
                  ></v-text-field>
                  <v-text-field 
                    prepend-icon="repeat" 
                    v-model="repeadPassword" 
                    :counter="6"
                    :rules="repeadPasswordRules"
                    name="repeadPassword" 
                    label="Repead Password" 
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
                >Создать аккаунт</v-btn>
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
            repeadPassword:'',
            valid: false,
            emailRules: [ 
                v => !!v || 'Требуется E-mail',
                v => /.+@.+/.test(v) || 'E-mail должен быть существующим'
            ],
            passwordRules: [
                v => !!v || 'Пароль обязателен',
                v => (v && v.length >= 6 && v.length <= 10) || 'Пароль должнен быть не менее 6 символов'
            ],
            repeadPasswordRules:[
                v => !!v || 'Повторите пароль',
                v => v === this.password || 'Пароли должны совпадать'
            ]
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
                // обращаемся к $store к его методу dispatch передаем объект user у которого его email и password которые мы обрабатываем registerUser (store -> modules -> user.js)
                // this.$store.dispatch('registerUser', user) 
                this.$store.dispatch('registerUser', user) 
                .then(()=> {
                  this.$router.push('/') // перенаправление на гл.страницу после регистрации
                })
                .catch(() => {}) // обработка ошибки
            }
        }
    }
}
</script>
