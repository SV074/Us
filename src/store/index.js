import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state() {
        return {
           cartSpares: [],
            spare: {
                
            },
        }
    },
    mutations: {
        addSpareIdToCart(state, spareId) {
        state.cartSpares.push(spareId);
        },
        removeSpareIdFromCart(state, spareId) {
            const spareIndex = cartSpares.indexOf(spareId);
            if(spareIndex > -1) {
                state.cartSpares.splice(spareIndex, 1);
            }
           
        }
    },
    actions: {
        
       addSpareIdToCart({ commit }, spareId) {
        console.log(spareId);
        commit('addSpareIdToCart', spareId);

       }
    },
    getters: {
        cartSpares(state) {
            return state.cartSpares;
        }
    }
})

export default store;