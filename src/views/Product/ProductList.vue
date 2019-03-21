<template>
    <v-container>
        <v-layout row v-if="!loading && myProducts.length !== 0">
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text--secondary mb-3">Список товаров</h1>
                <v-card 
                    class="elevation-10 mb-2"
                    v-for="(product, i) in myProducts"
                    :key="i"
                >
                    <v-layout row>
                        <v-flex xs5>
                         <router-link :to="'/product/' + product.id">
                            <v-img
                            :src="product.imgSrc"
                            height="250px"
                            ></v-img>
                            </router-link>
                        </v-flex>
                        <v-flex xs7 class="flex-column">
                            <v-card-text class="grow">
                                <h2 class="text--primary">{{product.title}}</h2>
                                <p>{{product.description}}</p>
                            </v-card-text>
                            <v-card-actions class="grow-0">
                                <v-spacer></v-spacer>
                                <v-btn 
                                    class="info"
                                    :to="'/product/' + product.id"
                                    >Открыть</v-btn>
                            </v-card-actions>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-else-if="!loading && myProducts.length === 0">
        <v-flex xs12 class="text-xs-center">
            <h1 class="text--primary">У вас еще нету товаров</h1>
                <v-btn 
                class="info"
                :to="'/new/'"
                >Создать новый товар</v-btn>
        </v-flex>
        </v-layout>
        <v-layout v-else>
        <v-flex xs12 class="text-xs-center">
            <v-progress-circular
                :size="70"
                :width="5"
                color="red"
                indeterminate
            ></v-progress-circular>
        </v-flex>
        </v-layout>        
    </v-container>
</template>

<script>
export default {
    computed: { // принимает зависимости от getters
        myProducts () {
            return this.$store.getters.myProducts
        },
        loading () {
            return this.$store.getters.loading
        }
    }
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
    flex-basis: 80%;
}
.grow-0 {
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 20%;
}
</style>