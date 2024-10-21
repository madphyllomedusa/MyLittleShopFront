<template>
  <AppToolBar />
  <CategoryAppBar />
  <div class="product-container">
    <v-container>
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.name"
          cols="12"
          md="4"
        >
          <v-card>
            <v-carousel
              v-if="product.imageUrls && product.imageUrls.length > 0"
              hide-delimiters
              height="300"
            >
              <v-carousel-item
                v-for="(image, index) in product.imageUrls"
                :key="index"
              >
                <v-img
                  :src="image"
                  height="300px"
                />
              </v-carousel-item>
            </v-carousel>

            <v-card-title>{{ product.name }}</v-card-title>

            <v-card-text>{{ product.description }}</v-card-text>

            <v-list>
              <v-list-item
                v-for="(value, key) in product.parameters"
                :key="key"
              >
                <span>{{ key }}: {{ value }}</span>
              </v-list-item>
            </v-list>
            <v-card-subtitle class="price">
              {{ product.price }} ₽
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService';
import AppToolBar from "@/components/AppToolBar.vue";
import CategoryAppBar from "@/components/CategoryAppBar.vue";
//import CategoryAppBar from "@/components/CategoryAppBar.vue";

export default {
  name: 'ProductContainer',
  components: {CategoryAppBar, AppToolBar},
  props: {
    categoryId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      products: [], // Инициализация массива продуктов

    };
  },
  watch: {
    categoryId: {
      immediate: true,
      handler(newCategoryId) {
        if (newCategoryId) {
          this.fetchProducts(newCategoryId);
        } else {
          console.warn('categoryId is missing or invalid:', newCategoryId);
        }
      },
    },
  },
  methods: {
    async fetchProducts(categoryId) {
      try {
        const products = await ProductService.getProductsByCategory(categoryId);
        this.products = products;
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


.price {
  font-size: 24px; /* Сделаем цену больше */
  font-weight: bold;
  margin-top: 10px;
}
</style>
