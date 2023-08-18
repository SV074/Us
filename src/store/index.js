import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state() {
        return {
           cartSpares: [],
           categoriesSpares: [],
        }
    },
    mutations: {
        addSpareIdToCart(state, spareId) {
        state.cartSpares.push(spareId);
        localStorage.setItem('cartId', JSON.stringify(state.cartSpares));
        },
        removeSpareIdFromCart(state, spareId) {
           
            state.cartSpares = state.cartSpares.filter(item => item !== spareId);
           //state.cartSpares.splice(spareIndex, 1);        
        },
      
    },
    actions: {
        addSpareIdToCart({ commit }, spareId) {
            commit('addSpareIdToCart', spareId);
       },
       removeSpareIdFromCart({ commit }, spareIndex) {
            commit('removeSpareIdFromCart', spareIndex);
       }
    },
    getters: {
        cartSpares(state) {
            return state.cartSpares;
        },
       
    }
})

export default store;