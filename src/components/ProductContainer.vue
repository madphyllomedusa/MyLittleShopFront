<template>
  <div class="product-container">
    <v-container>
      <v-row>
        <v-col v-for="product in products" :key="product.name" cols="12" md="4">
          <v-card>
            <v-carousel v-if="product.imageUrls && product.imageUrls.length > 0" hide-delimiters height="300">
              <v-carousel-item v-for="(image, index) in product.imageUrls" :key="index">
                <v-img :src="image" height="300px"></v-img>
              </v-carousel-item>
            </v-carousel>

            <v-card-title>{{ product.name }}</v-card-title>

            <v-card-text>{{ product.description }}</v-card-text>

            <v-list>
              <v-list-item v-for="(value, key) in getRenamedParameters(product)" :key="key">
                <span>{{ key }}: {{ value }}</span>
              </v-list-item>
            </v-list>

            <v-card-subtitle class="price">{{ product.price }} ₽</v-card-subtitle>
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
      products: [], // Инициализация массива продуктов
      renamedParameters: {
        model: 'Модель',
        color: 'Цвет',
        storageCapacity: 'Объем памяти',
        // Добавьте любые другие параметры, которые необходимо переименовать
      },
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
    getRenamedParameters(product) {
      // Метод принимает продукт как аргумент
      const renamedParams = {};
      for (const [key, value] of Object.entries(product.parameters)) {
        const renamedKey = this.renamedParameters[key] || key;
        renamedParams[renamedKey] = value;
      }
      return renamedParams;
    },
  },
};
</script>

<style scoped>
.product-container {
  margin-top: 20px;
}

.v-card {
  margin-bottom: 20px;
}

.price {
  font-size: 24px; /* Сделаем цену больше */
  font-weight: bold;
  margin-top: 10px;
}
</style>
