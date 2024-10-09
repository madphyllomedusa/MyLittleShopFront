<template>
  <AppToolBar />
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-5 fill-card">
      <v-card-title class="text-h5 text-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
              v-model="identifier"
              label="Identifier (Email or Username)"
              required
              full-width
          ></v-text-field>
          <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              full-width
          ></v-text-field>
          <v-btn type="submit" class="mt-4 custom-btn" block>Login</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {AuthService} from "@/services/AuthService";
import AppToolBar from "@/components/AppToolBar.vue";

export default {
  components: {AppToolBar},
  data() {
    return {
      identifier: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthService.login(this.identifier, this.password);
        console.log('Login successful:', response.data);
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.fill-card {
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
  background-color: #222021;
  color: #d5dad9;
}
.custom-btn {
  color: #222021;
  background-color: #d5dad9;
}
</style>
