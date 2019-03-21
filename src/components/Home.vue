<template>
    <div v-if="!loading">
        <v-container fluid >
            <v-layout row>
                <v-flex xs12>
                    <v-carousel hide-delimiters delimiter-icon="stop">
                        <v-carousel-item
                        :gradient="gradient"
                        v-for="(product, i) in promoProducts"
                        :key="i"
                        :src="product.imgSrc"
                        reverse-transition="fade"
                        interval="3000"
                        >
                        <div class="carousel-caption">
                            <h1>{{product.description}}</h1>
                        </div>
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container grid-list-lg>
            <v-layout row wrap>
                <v-flex 
                xs12
                sm6
                md4
                v-for="(product,i) in products"
                :key="i"                
                >
                <router-link
                :aria-label="product.title"
                :to="'/product/' + product.id"
                >
                <v-img
                :src="product.imgSrc"
                aspect-ratio="2.5"
                >
                </v-img>               
                </router-link> 
                    <v-card>
                        <v-card-title primary-title>
                            <div>
                                <h3 class="headline mb-0">{{product.title}}</h3>
                                <p>{{product.description.substring(0,60)}}...</p>
                                <p>Цена: {{product.price}}руб.</p>
                            </div>
                        </v-card-title>
                        <v-card-actions>
                            <v-layout row wrap align-right>
                            <!-- <v-spacer></v-spacer> -->
                            <v-flex sm12>
                                <v-btn block dark color="light-blue darken-4" :to="'/product/' + product.id">Описание</v-btn>
                                <v-spacer></v-spacer>
                                <!-- <v-btn block dark color="light-blue darken-4">Купить</v-btn> -->
                                <app-buy-dialog :product="product"></app-buy-dialog>
                            </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container> 
    </div>
    <div v-else>
        <v-container>
            <v-layout>
                <v-flex xs12 class="text-xs-center pt-5">
                    <v-progress-circular
                        :size="50"
                        :width="4"
                        color="red"
                        indeterminate
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div> 
</template>

<script>
export default {
    computed: { // принимает зависимости от getters
        promoProducts () {
            return this.$store.getters.promoProducts
        },
        products () {
            return this.$store.getters.products
        },
        loading () {
            return this.$store.getters.loading
        }
    },
    data(){
        return {
            gradient: 'to top, rgba(0,0,0, .7), rgba(255,255,255, .5)',
        }
    }
}
</script>
<style scoped>
.carousel-caption {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
