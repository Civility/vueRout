import * as firebase from 'firebase'

class User { // пользователь с id
    constructor(id) {
        this.id = id // значение id = полученному id
    }
}

export default {
    state: {
        user: null, 
    },
    getters: {
        user(state) {
            return state.user
        },
        isUserLoggedIn(state){ // проверка на регистрацию пользователя
            return state.user !== null
        },
    },   
    mutations: {
        setUser(state, payload){ // изменяет state.user на pauload который пришел
            state.user = payload
        }
    },
    actions: {
        async registerUser({commit}, {email, password}){ // регистрация пользователя (вместо {email, password} можно было принимать данные через payload)
        // метод который содержиться в firebase (createUserWithEmailAndPassword возращает promis)
        commit('clearError') // вызывает мутации для очищения всех ошибок
        commit('setLoading', true) // показывает взаимодействие с сервером
        // firebase.auth().createUserWithEmailAndPassword(email, password)
        //
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
            commit('setUser', new User(user.uid))
            commit('setLoading', false) 
        } catch(error) {
            commit('setLoading', false)
            commit('setError', error.message)
            throw error
        }
        //
        // .then(user => { // через метод then получаем поле user в объекте user храниться id (оно называется uid в firebase)
        //     // uid
        //     commit('setUser', new User(user.uid)) // вызов мутации setUser полученный через uid
        //     commit('setLoading', false) // если ответ пришел с ошибкой
        // })
        // .catch(error =>{ // обработчик ошибок 
        //     commit('setLoading', false)
        //     commit('setError', error.message)
        // })
        },
        async loginUser({commit}, {email, password}){
            commit('clearError') 
            commit('setLoading', true) 
            //
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false) 
            } catch(error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
            //         
        },
        autoLoginUser ({commit}, payload) {
            commit('setUser', new User(payload.uid))
        },
        logoutUser ({commit}) { 
            firebase.auth().signOut() // разлогиниться метод signOut()
            commit('setUser', null) // вызвать мутацию на setUser и передаем значение null
        }
    },

}