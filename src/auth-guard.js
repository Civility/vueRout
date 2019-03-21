// запрет использования страниц не зарегистрированным пользователям
import store from './store/index' // store передает состояние пользователя
 // защита роутов
export default function(to, from, next) { // next-  делает навигацию с защитой роутеров
  if(store.getters.user){
    next()
  } else {
    next('/login?loginError=true') // (?loginError=true) get параметр с описанием ошибки 
  }
}
