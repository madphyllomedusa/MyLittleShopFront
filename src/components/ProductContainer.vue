<template>
  <div class="product-container">
    <v-container>
      <v-row>
        <v-col v-for="product in products" :key="product.name" cols="12" md="4">
          <v-card>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-subtitle>{{ product.price }} ₽</v-card-subtitle>
            <v-card-text>{{ product.description }}</v-card-text>
            <v-list>
              <v-list-item v-for="(value, key) in product.parameters" :key="key">
                {{ key }}: {{ value }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService';

export default {
  name: 'ProductContainer',
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      products: [],
    };
  },
  watch: {
    categoryId: {
      immediate: true,
      handler(newCategoryId) {
        this.fetchProducts(newCategoryId);
      },
    },
  },
  methods: {
    async fetchProducts(categoryId) {
      try {
        this.products = await ProductService.getProductsByCategory(categoryId);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },
  },
};
</script>

<style scoped>
.product-container {
  margin-top: 20px;
}
</style>
