<template>
  <v-app dark>
    <Navbar/>
    <template v-if="error">
      <v-snackbar
      :top="y"
      :multi-line="true"
      :color="color"
      :timeout="timeout"
      @input="closeError"
      :value="true"
      >
      <!-- {{ error }} -->
    {{ error }}
      <v-btn
        color="black"
        dark
        flat
        @click.native="closeError"
      >
        Закрыть
      </v-btn>
      </v-snackbar>
    </template>
    <!-- <v-footer app></v-footer> -->
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  methods:{
    closeError(){
      this.$store.dispatch('clearError') // можно было взять и мутация commit(синхронные) -но взяли =>  действие метод dispatch(асинхронные) вызова метода (clearError - описывается в common.js)
    }
  },
  computed:{
    error(){
      return this.$store.getters.error
    }
  },
  data () {
    return {
      errors: 'Данные не корректны',
      y: 'top',
      timeout: 6000,
      color: 'error'
    }
  }
}
</script>
<style>
.application--wrap > div{
  flex-grow: 2;
}
</style> 