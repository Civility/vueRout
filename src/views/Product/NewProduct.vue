<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 class="text-secondary mb-3">Создать Новый Продукт</h1>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    class="mb-3"            
                >
                  <v-text-field 
                    
                    v-model="title" 
                    :rules="[v => !!v || 'Ошибка в поле - ИМЯ']"
                    name="title" 
                    label="Имя товара" 
                    type="text"
                    required
                  ></v-text-field>
                  <v-text-field 
                    v-model="vendor" 
                    name="vendor" 
                    label="Производитель" 
                    type="text"
                  ></v-text-field>
                  <v-text-field 
                    v-model="color" 
                    name="color" 
                    label="Цвет товара" 
                    type="text"
                  ></v-text-field>
                  <v-text-field 
                    v-model="material" 
                    name="material" 
                    label="Материал товара" 
                    type="text"
                  ></v-text-field>
                  <v-text-field 
                    v-model="price" 
                    :rules="[v => !!v || 'Ошибка в поле - ЦЕНА']"
                    name="price" 
                    label="Цена товара" 
                    type="text"
                    value="0"
                    required
                  ></v-text-field>
                  <v-textarea
                    v-model="description" 
                    name="description" 
                    label="Описание товара" 
                    type="text"
                    auto-grow
                    rows="1"
                    hint="Опишите свои пожелания"
                  ></v-textarea>
                  <v-layout row class="mb-3">
                      <v-flex xs12>
                          <v-btn uploads class="warning" @click="upload">
                              Загрузить
                              <v-icon right dark>cloud_upload</v-icon>
                          </v-btn>
                          <input 
                            ref="fileInput" 
                            type="file" 
                            style="display: none;" 
                            accept="image/*"
                            @change="onFileChange"
                            >
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex xs12>
                          <img :src="imgSrc" alt="img" height="200" v-if="imgSrc">
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex xs12>
                        <v-switch
                            color="primary"
                            label="Акция"
                            v-model="promo" 
                        ></v-switch>
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex xs12>
                        <v-spacer></v-spacer>
                        <v-btn 
                            :loading="loading"
                            class="success"
                            @click="createProduct"
                            :disabled="!valid || loading || !image"
                        >Создать продукт</v-btn>
                      </v-flex>
                  </v-layout>                                         
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            title: '',
            vendor: '',
            color:'',
            material: '',
            price: '',
            description: '',
            promo: false,
            valid: false,
            image: null,
            imgSrc: ''
        }
    },
    computed: {
        loading () {
            return this.$store.getters.loading // загрузка firebase из products.js
        }
    },
    methods:{
        createProduct(){
            if(this.$refs.form.validate() && this.image){
                const product = {
                    title: this.title,
                    vendor: this.vendor,
                    color: this.color,
                    material: this.material,
                    price: this.price,
                    description: this.description, 
                    promo: this.promo,
                    image: this.image
                }
                this.$store.dispatch('createProduct', product)
                .then(() => { // диспатч роутера - после создания нового товара перекинуть на страницу list
                    this.$router.push('/list')
                })
                .catch(() => {}) // пустая функция с пустым объектом
                // т.к. стоит async, то можно вызвать callback к роутеру
            }
        },
        upload(){
            this.$refs.fileInput.click()
        },
        onFileChange (event) {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
            this.imgSrc = reader.result
        }
        reader.readAsDataURL(file)
        this.image = file
        }
    }
}
</script>
