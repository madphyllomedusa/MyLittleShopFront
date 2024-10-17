<template>
  <v-toolbar flat class="toolbar">
    <div
        v-for="category in mainCategories"
        :key="category.id"
        class="toolbar-item"
    >
      <v-btn
          text
          @mouseenter="(event) => openSubcategoryMenu(category, event)"
          @mouseleave="closeSubcategoryMenu"
      >
        {{ category.title }}
      </v-btn>
    </div>

    <v-menu
        v-model="isSubcategoryOpen"
        :activator="activator"
        absolute
        offset-y
        :close-on-content-click="false"
        v-if="subcategories.length > 0"
        @mouseenter="keepMenuOpen"
        @mouseleave="closeSubcategoryMenu"
    >
      <v-list>
        <CategoryMenu
            v-for="subcategory in subcategories"
            :key="subcategory.id"
            :category="subcategory"
            :fetch-children="fetchCategoryChildren"
            @select-category="selectSubcategory"
        />
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import CategoryMenu from './CategoryMenu.vue';
import ProductService from '@/services/ProductService';

export default {
  components: {
    CategoryMenu,
  },
  data() {
    return {
      mainCategories: [],
      subcategories: [],
      isSubcategoryOpen: false,
      activator: null,
    };
  },
  async mounted() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const categories = await ProductService.getAllCategories();
        this.mainCategories = categories.filter(category => category.parentId === 0);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    },
    async fetchCategoryChildren(categoryId) {
      try {
        const children = await ProductService.getCategoryChildren(categoryId);
        return children;
      } catch (error) {
        console.error(`Не удалось загрузить подкатегории для категории ID ${categoryId}:`, error);
        return [];
      }
    },
    async openSubcategoryMenu(category, event) {
      this.activator = event.target;
      try {
        const children = await this.fetchCategoryChildren(category.id);
        this.subcategories = children;
        this.isSubcategoryOpen = true;
      } catch (error) {
        console.error('Ошибка при загрузке подкатегорий:', error.message);
      }
    },
    closeSubcategoryMenu() {
      this.isSubcategoryOpen = false;
      this.subcategories = [];
    },
    keepMenuOpen() {
      this.isSubcategoryOpen = true;
    },
    selectSubcategory(subcategory) {
      this.isSubcategoryOpen = false;
      // Переход по выбранной подкатегории
      this.$router.push(`/products/category/${subcategory.id}`);
    },
  },
};
</script>

<style scoped>
.toolbar {
  background-color: #222021;
  color: #d5dad9;
}

.toolbar-item {
  margin-right: 20px;
  position: relative;
}
</style>
