<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My little shop</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/auth/login">Login</v-btn>
      <v-btn text to="/auth/register">Register</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
/* Стили для кнопок навигации */
.v-btn {
  margin: 0 10px;
}
</style>
