import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BuyDialogComponent from '@/views/Common/BuyDialog'
import store from './store'
import * as firebase from 'firebase/app'

// const firebase = require("firebase");
// require("firebase/firestore");

import './plugins/vuetify'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

Vue.component('app-buy-dialog', BuyDialogComponent)
Vue.config.productionTip = false

Vue.filter('capitalize', function (valstring) { 
  var capitalFirst = valstring.charAt(0).toUpperCase() 
  var noCaseTail = valstring.slice(1, valstring.length) 
    return capitalFirst + noCaseTail;
});
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyAVowidBTCq95fPY0OT7zSAtjsQK8eJpMs',
      authDomain: 'vuetifyjs.firebaseapp.com',
      databaseURL: 'https://vuetifyjs.firebaseio.com',
      projectId: 'vuetifyjs',
      storageBucket: 'vuetifyjs.appspot.com',
      messagingSenderId: '162576126618'
    }
    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged(user => { //firebase считывает коллбэк юзера
      if(user){
        this.$store.dispatch('autoLoginUser', user) // если что-то есть в dispatch(нашего $store) autologinUser передаем информацию в user.js
      }
    }),
      this.$store.dispatch('fetchProducts') // вызов метода реализован в products.js
    }
}).$mount('#app')
