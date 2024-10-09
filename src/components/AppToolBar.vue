<template>
  <v-toolbar app class="toolbar">
    <v-toolbar-title>
      <v-img class="logo mr-3" :src="require('@/assets/logo-logo.png')" ></v-img>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-text-field
        v-model="searchQuery"
        placeholder="Search for products"
        variant="outlined"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        class="search-field"
    ></v-text-field>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text v-if="!isAuthenticated" to="/auth/login">Login</v-btn>
      <v-btn text v-if="!isAuthenticated" to="/auth/register">Register</v-btn>

      <v-btn text v-else @click="logout">{{ identifier }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const searchQuery = ref('');

// Авторизация
const isAuthenticated = computed(() => store.state.isAuthenticated);
const identifier = computed(() => store.state.identifier);

const logout = () => {
  store.commit('logout');
  router.push('/');
};
</script>

<style scoped>
.logo {
  height: 100%;  /* Логотип будет занимать всю высоту тулбара */
  width: auto;   /* Ширина будет подстраиваться под пропорции изображения */
  max-height: 64px; /* Ограничение максимальной высоты тулбара (можно менять по необходимости) */
}

.mr-3 {
  margin-right: 5px;
}

.toolbar {
  background-color: #222021;
  color: #d5dad9;
}
.search-field {
  max-width: 600px;
}

</style>
