<template>
  <v-toolbar
    height="50"
    flat
    class="toolbar"
  >
    <div v-if="mainCategories.length === 0">
      Нет доступных категорий
    </div>
    <v-list>
      <CategoryMenu
        v-for="category in mainCategories"
        :key="category.id"
        :category="category"
        :fetch-children="fetchCategoryChildren"
        @select-category="handleCategorySelect"
      />
    </v-list>
  </v-toolbar>
  <!-- Убедитесь, что ProductContainer получает categoryId как prop -->
  <ProductContainer
    v-if="selectedCategory"
    :category-id="selectedCategory.id"
  />
</template>

<script>
import ProductService from '@/services/ProductService';
import ProductContainer from '@/components/ProductContainer.vue';
import CategoryMenu from '@/components/CategoryMenu.vue';

export default {
  name: 'CategoryAppBar',
  components: {
    ProductContainer,
    CategoryMenu,
  },
  data() {
    return {
      allCategories: [],
      mainCategories: [],
      selectedCategory: null,
    };
  },
  async mounted() {
    try {
      await this.fetchCategories();
    } catch (error) {
      console.error('Не удалось загрузить категории:', error);
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const categories = await ProductService.getAllCategories();
        this.allCategories = categories;
        this.mainCategories = categories.filter(category => category.parentId === 0);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    },
    async fetchCategoryChildren(categoryId) {
      try {
        const children = await ProductService.getCategoryChildren(categoryId);
        if (children.length === 0) {
          console.log(`No children found for category ID: ${categoryId}`);
          return [];
        }
        return children;
      } catch (error) {
        console.error(`Не удалось загрузить подкатегории для категории ID ${categoryId}:`, error);
        return [];
      }
    },
    async handleCategorySelect(category) {
      this.selectedCategory = category;

      // Переход на страницу продуктов категории
      this.$router.push(`/products/category/${category.id}`).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          console.error('Navigation error:', err);
        }
      });
    },
  },
};
</script>

<style scoped>
.toolbar {
  background-color: #222021;
  color: #d5dad9;
}
</style>
