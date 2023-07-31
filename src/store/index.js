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
            const spareIndex = state.cartSpares.findIndex(item => item.id === spareId);
            if(spareIndex > -1) {
                state.cartSpares.splice(spareIndex, 1);
            }
        },
        addQuantitySpare(state, spareId) {
            console.log(state.spare.quantity);
            const needSpare = state.cartSpares.find(item => item.id === spareId);
            
        }
    },
    actions: {
        addSpareIdToCart({ commit }, spareId) {
            commit('addSpareIdToCart', spareId);
       },
       removeSpareIdFromCart({ commit}, spareId) {
            commit('removeSpareIdFromCart', spareId)
       }
    },
    getters: {
        cartSpares(state) {
            return state.cartSpares;
        },
        spare(state) {
            return state.spare;
        }
    }
})

export default store;