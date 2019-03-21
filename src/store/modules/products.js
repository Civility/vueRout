// нужно устранить ошибку с сохранением картинки. 
/*
Ошибка при сохранении
(firebase__WEBPACK_IMPORTED_MODULE_12__.storage.ref is not a function)
*/
// обработка данных идет через Firebase
import * as firebase from 'firebase'

class Product {
    constructor (title = '', vendor, color, material, price, description, ownerId, imgSrc = '', promo = false, id = null) { // ownerId - кто создал товар
    //приватные поля
    this.title = title,
    this.vendor = vendor,
    this.color = color,
    this.material = material,
    this.price = price,
    this.description = description,
    this.ownerId = ownerId,
    this.imgSrc = imgSrc,
    this.promo = promo,
    this.id = id
    }
}

export default {
    state: { //начальные условия доступа
        products: [
            // {id: '1', title: 'One', color: 'black', vendor:'руки', material:'glass', description: 'Описание 1 продукта.', price: 358, promo: true, imgSrc: 'https://cdn.vuetifyjs.com/images/parallax/material2.jpg'}
        ]
    },
    mutations: {
        createProduct(state, payload) {
            state.products.push(payload)
        },
        loadProducts (state, payload) { // массив данных и изменяем state
            state.products = payload // в мутацию передаем массив товаров
        },
        updateProduct(state, {title, description, id}){ // вызов мутации, принимает state с payload значениями title, description, id
            const product = state.products.find(a => { // ищем product в массиве.
                return a.id === id 
            })
            product.title = title // переопределение полей
            product.description = description
        }
    },
    actions: {
        async createProduct({commit, getters}, payload) { // т.к. работаем firebase, то подключаем async (он возращает promysi)
            commit('clearError') // очищаем от ошибок
            commit('setLoading', true) // отображение загрузки firebase
            const image = payload.image
            try {
                const newProduct = new Product(
                    payload.title,
                    payload.vendor,
                    payload.color,
                    payload.material,
                    payload.price,
                    payload.description,
                    getters.user.id, // payload.ownerId, (etters.user - id пользователя создавшего товар)
                    '',
                    payload.promo
                )
                const product = await firebase.database().ref('products').push(newProduct)
                // обращаемся к сущностям бд (firebase.database) - метод идет aсинхронно к бд,  пишем в const productOwner
                // метод ref говорит к какой бд подключиться
                // для создания новой записи передаем (push) готовые данные товара, они берутся с class Product( и передаем их значения в newProduct (payload. перечесление данных))
                
                // console.log(productOwner)
                // const imageExt = image.name.slice(image.name.lastIndexOf('jpeg','jpg','png','JPEG','JPG','PNG'))
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                const fileData = await firebase.storage().ref(`products/${product.key}.${imageExt}`).put(image)
                const imgSrc = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
                await firebase.database().ref('products').child(product.key).update({imgSrc})
                commit('setLoading', false)
                commit('createProduct', {
                    ...newProduct, // разворачивание объекта из конструктора
                    id: product.key, // обновляем id и помещаем id (key) полученный firebase
                    // imgSrc: imgSrc
                    imgSrc
                })
            } catch(error) { // ошибки
                commit('setError', error.message) // отображение ошибки
                commit('setLoading', false) // остановка setloading
                throw error // возращается ошибка для обработки в promysi (throw error - избавляемся от ошибки)
            }
            // commit('createProduct', payload)
        },
        async fetchProducts({commit}) {
            commit('clearError') 
            commit('setLoading', true) 
            const resultProducts = [] // массив всех данных с firebase с таблицы products
            try {
                const productsVal = await firebase.database().ref('products').once('value')
                // обращаемся к firebase к таблице products обращаясь 1 раз(once)  с значением type = "value", "child_added", "child_removed", "child_changed", or "child_moved"
                const products = productsVal.val() // что бы получить определенные значения вызываем метод .val()
                // console.log(products)
                // получить все ключи productDB
                 // получаем новый объект key он принимает значения id товара
                Object.keys(products).forEach(key => { // интерация по всем товарам
                    const product = products[key] // все данные о товаре храняться в products
                    resultProducts.push(
                        new Product(
                            product.title,
                            product.vendor,
                            product.color,
                            product.material,
                            product.price,
                            product.description,
                            product.ownerId,
                            product.imgSrc,
                            product.promo,
                            key // id из БД
                        )
                    )
                    commit('loadProducts', resultProducts)
                    commit('setLoading', false)
                })
            } catch (error) { // ошибки
                commit('setError', error.message)
                commit('setLoading', false)
                throw error 
            }
        },
        async updateProduct({commit}, {title, description, id}){
            commit('clearError') 
            commit('setLoading', true)
            try {
                await firebase.database().ref('products').shild(id).update({
                    title, description
                })
                commit('updateProduct', {
                    title, description, id
                })
                commit('setLoading', false)
            } catch(error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error                 
            }
        }
    },    
    getters: { //доступ к state
        products(state){ // вернет весь список продукта
            return state.products
        },
        promoProducts (state) { // только те товары которые участвуют в акции
            return state.products.filter(product => { // фильтруем все продукты и для каждой интерации возврат функции которая возращает из массива promo
                return product.promo
            })
        },
        myProducts(state, getters) { // только те товары которые создал продовец
            return state.products.filter(product => {
                return product.ownerId === getters.user.id
              })
        },
        productById(state) { // замыкание с prodyct.vue
            return productId => {// возращает функцию где принимает параметр productId
                return state.products.find(product => product.id === productId) // на каждую интерацию принимает 
                // product => проверяет совпадает ли id c переданной функцией и если совпадает, то возражает вызванный продукт из массива
            }
        }
    }
}
