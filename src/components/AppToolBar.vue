<template>
  <v-toolbar app color="primary" dark>
    <v-toolbar-title>
      <img src="@/assets/logo.png" alt="Logo" height="32" class="mr-2" />
      My Little Shop
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="!isAuthenticated">
      <v-btn text to="/auth/login">Login</v-btn>
      <v-btn text to="/auth/register">Register</v-btn>
    </template>
    <template v-else>
      <v-btn text @click="logout">{{ identifier }}</v-btn>
    </template>
  </v-toolbar>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.state.isAuthenticated);

const identifier = computed(() => store.state.identifier);

const logout = () => {
  store.commit('logout');
  router.push('/auth/login');
};
</script>

<style scoped>
img {
  vertical-align: middle;
}
</style>
