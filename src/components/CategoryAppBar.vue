<template>
  <v-toolbar
    flat
    class="toolbar"
  >
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
      v-if="subcategories.length > 0"
      v-model="isSubcategoryOpen"
      :activator="activator"
      absolute
      offset-y
      :close-on-content-click="false"
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
      closeTimeout: null, // Добавлено
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
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
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
      if (this.closeTimeout) {
        return;
      }
      this.closeTimeout = setTimeout(() => {
        this.isSubcategoryOpen = false;
        this.subcategories = [];
        this.closeTimeout = null;
      }, 200); // Задержка 200ms
    },
    keepMenuOpen() {
      if (this.closeTimeout) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = null;
      }
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

.v-menu__content {
  margin-top: 0;
}
</style>
