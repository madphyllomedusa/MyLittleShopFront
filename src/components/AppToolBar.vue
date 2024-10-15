<template>
  <v-toolbar
    height="60"
    flat
    app
    class="toolbar"
  >
    <v-toolbar-title>
      <v-img
        class="logo mr-3"
        :src="require('@/assets/logo-logo.png')"
        @click="toMain"
      />
    </v-toolbar-title>

    <v-spacer />

    <v-text-field
      v-model="searchQuery"
      placeholder="Search for products"
      variant="outlined"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      class="search-field"
    />

    <v-spacer />

    <v-toolbar-items>
      <v-btn
        v-if="!isAuthenticated"
        text
        to="/auth/login"
      >
        Login
      </v-btn>
      <v-btn
        v-if="!isAuthenticated"
        text
        to="/auth/register"
      >
        Register
      </v-btn>

      <v-btn
        v-else
        @click="toMain"
      >
        {{ identifier }}
      </v-btn>

      <v-btn
        v-if="isAuthenticated"
        @click="logout"
      >
        <v-icon right>
          mdi-export
        </v-icon>
      </v-btn>
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

const isAuthenticated = computed(() => store.state.isAuthenticated);
const identifier = computed(() => store.state.identifier);

const logout = () => {
  store.commit('logout');
  router.push('/');
};
const toMain=()=>{
  router.push('/');
};
</script>

<style scoped>
.logo {
  height: auto;
  width: auto;
}

.toolbar {
  background-color: #222021;
  color: #d5dad9;
}
.search-field {
  max-width: 600px;
}

</style>
