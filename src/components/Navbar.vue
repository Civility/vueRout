<template>
<div>
    <v-navigation-drawer
    v-model="sideNav"
    app
    temporary
    >
        <v-list>
          <v-list-tile
            v-for="(link, i) in linksLogin"
            :key="i"
            :to="link.url"
          >
            <v-list-tile-action>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="link.title"> 
                <v-icon right>{{icon}}</v-icon>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          
          <v-list-tile
            @click="onLogout"
            v-if="isUserLoggedIn"
          >
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title v-text="logout"> 
                <v-icon right>{{icon}}</v-icon>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="primary">
    <v-toolbar-side-icon 
      @click="sideNav = !sideNav"
      class="hidden-md-and-up"
    ></v-toolbar-side-icon>
    <v-toolbar-title>
      <router-link
      to="/"
      tag="span"
      class="pointer"
      > {{title}}
      </router-link>
     
      <v-icon right>{{icon}}</v-icon>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn 
        flat
        v-for="(link, i) in linksLogin"
        :key="i"
        :to="link.url"
      >
        <v-icon left>{{link.icon}}</v-icon>
        {{link.title}}
      </v-btn>

      <v-btn 
        flat
        @click="onLogout"
        v-if="isUserLoggedIn"
      >
        <v-icon left>exit_to_app</v-icon>
        {{logout}}
      </v-btn>

    </v-toolbar-items>     
    </v-toolbar> 
    <v-content fluid>
      <router-view/>
    </v-content>
</div>  
</template>

<script>
  export default {
    data(){
      return {
        title: 'Имя сайта',
        icon: 'spa',
        url: '/',
        sideNav: false,
        logout: 'Выйти'
      }
    },
    methods:{
      onLogout(){
        this.$store.dispatch('logoutUser') // logoutUser описан в user.js
        this.$router.push('/')
      },
    },
    computed:{
      isUserLoggedIn(){
        return this.$store.getters.isUserLoggedIn // возращаем наш запрос(getters)
      },
      linksLogin(){
        if(this.isUserLoggedIn){
          return [
          {title: 'Покупки', icon:'shopping_cart', url: '/checkout'},
          {title: 'Добавить товар', icon:'add', url: '/new'},
          {title: 'Мои Товары', icon:'list', url: '/list'},
          ]
        }
        return [
          {title: 'Войти', icon:'account_box', url: '/login'},
          {title: 'Регистрация', icon:'face', url: '/register'},          
        ]
      }
    }
  }
</script>

<style scoped>
.pointer{
  cursor: pointer;
}
</style>
