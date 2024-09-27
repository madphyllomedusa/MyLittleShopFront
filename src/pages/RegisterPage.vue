<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="pa-5 fill-card">
      <v-card-title class="text-h5 text-center">Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
              v-model="username"
              label="Username"
              required
              full-width
          ></v-text-field>
          <v-text-field
              v-model="email"
              label="Email"
              type="email"
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
          <v-text-field
              v-model="matchingPassword"
              label="Confirm Password"
              type="password"
              required
              full-width
          ></v-text-field>
          <v-btn color="primary" type="submit" class="mt-4" block>Register</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {AuthService} from "@/services/AuthService";

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      matchingPassword: ''
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthService.register(this.username, this.email, this.password, this.matchingPassword);
        console.log('Registration successful:', response.data);
        this.$router.push('/auth/login');
      } catch (error) {
        console.error('Registration failed:', error);
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
}

.v-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
