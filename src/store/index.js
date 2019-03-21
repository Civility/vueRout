import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products';
import user from './modules/user';
import common from './modules/common';
import orders from './modules/orders';

Vue.use(Vuex); //как плагин

export default new Vuex.Store({ // экспорт новый экземпляр 
    modules:{ // т.к. много сущностей куда нужно передать информацию, создали объект конфигураций (для облегчения понимания кода)
        products, // имя модуля
        user,
        common,
        orders
    }, 

});