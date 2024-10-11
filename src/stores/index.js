import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: false,
        identifier: '',
    },
    mutations: {
        login(state, payload) {
            state.isAuthenticated = true;
            state.identifier = payload.identifier;
        },
        logout(state) {
            state.isAuthenticated = false;
            console.log("User " + state.identifier + " logged out");
            state.identifier = '';
        }
    }
});

export default store;
