<template>
    <v-container>
        <section class="mt-3 elevation-10" color="white" v-if="!loading" >
            <v-flex wrap align-center>
            <v-layout row wrap> 
                <v-flex xs12 lg6>
                    <v-img :src="product.imgSrc" :alt="product.title" contain class="grey darken-4" aspect-ratio="1.2"></v-img>
                </v-flex>
                <v-flex xs12 lg6 class="flex-column">
                    <div class="ml-5 grow">
                        <h4 class="headline mb-3 mt-3 primary--text text-uppercase font-weight-bold">{{product.title}}</h4>
                        <p><span class="primary--text text--lighten-1 title">Производитель: </span> {{product.vendor | capitalize}}</p>
                        <p><span class="primary--text text--lighten-1 title">Цена: </span>{{product.price}} руб.</p>
                        <p><span class="primary--text text--lighten-1 title">Цвет: </span>
                            <v-chip 
                                :color="product.color" 
                                :style="{background: product.color}"
                                class="px-3"
                            >
                            </v-chip>
                        </p>
                        <p><span class="primary--text text--lighten-1 title">Материал: </span>{{product.material | capitalize}}</p>
                        <div class="title mb-5">
                            <!-- <v-flex xs12 lg12 mr-3>
                                <v-expansion-panel popout>
                                    <v-expansion-panel-content>
                                        <div slot="header" class="primary--text text--lighten-1 title">Описание: </div>
                                        <v-card>
                                            <v-card-text  font-weight-normal>
                                                {{product.description}}
                                            </v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel> 
                            </v-flex>                           -->
                           <p><span class="primary--text text--lighten-1 title mb-2">Описание: </span>{{product.description}}</p>
                        </div>                   
                    </div>
                     <div class="ml-5 grow-0" >
                        <!-- <v-btn color="primary" class="headline">Править</v-btn> -->
                        <app-edit-product :product="product" v-if="isOwner"></app-edit-product>
                        <!-- <v-btn color="primary" class="headline">Купить</v-btn> -->
                        <app-buy-dialog :product="product"></app-buy-dialog>
                    </div>
                </v-flex>
            </v-layout>
            </v-flex>
        </section>
        <section v-else class="text-xs-center">
            <h1 pa-3 ma-3>Грузим</h1>
            <v-spacer></v-spacer>
            <v-progress-circular
                :size="50"
                :width="4"
                color="red"
                indeterminate
            ></v-progress-circular>
        </section>
    </v-container>
</template>

<script>
import EditProduct from './EditProduct'
export default {
    props:['id'], // получение id  через router
    computed: {
        product() {
            const id = this.id // вызываем id с той id которая у нас есть далее id передает в store.getters (см. store-> modules-> products.js)
            return this.$store.getters.productById(id) // получение продукта из массива по id (функция productId принимает id)
        },
        loading() {
            return this.$store.getters.loading
        },
        // id продавца совпадают с id продкта
        // isOwner() {
        // //    return this.product.ownerId === this.$store.getters.user.id
        // }
        isOwner() { // только те товары которые создал продовец можно править
        // return this.product.ownerId === this.$store.getters.user.id;
        if(this.$store.getters.user === null){
           return false;
        } 
        else if(this.product.ownerId === this.$store.getters.user.id) {
            return true;
        } else {
            return ('Нужно пройти регистрацию');
        }
        },
    },
    components:{
        appEditProduct: EditProduct

    },
    data(){
        return {
            
        }
    },
    // methods: {
    //     con() {
            
    //     }
    // }
}
</script>

<style scoped>
.flex-column {
    display: flex;
    flex-direction: column;
}
.grow {
     flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
}
.grow-0 {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 10%;
}
</style>