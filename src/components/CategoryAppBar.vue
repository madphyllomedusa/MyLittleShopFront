<template>
  <v-toolbar height="50" flat class="toolbar">
    <div v-if="mainCategories.length === 0">
      Нет доступных категорий
    </div>
    <v-menu
        v-for="category in mainCategories"
        :key="category.id"
        v-model="category.isOpen"
        offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            v-bind="attrs"
            v-on="on"
            class="mr-16"
            append-icon="mdi mdi-chevron-down"
            @click="toggleSubcategories(category)"
        >
          {{ category.title }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
            v-for="child in category.children"
            :key="child.id"
            @click="selectCategory(child)"
        >
          {{ child.title }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
  <ProductContainer v-if="selectedCategory" :categoryId="selectedCategory.id" />
</template>

<script>
import ProductService from '@/services/ProductService';
import ProductContainer from '@/components/ProductContainer.vue';

export default {
  name: 'CategoryAppbar',
  components: {
    ProductContainer,
  },
  data() {
    return {
      categories: [],
      mainCategories: [],
      selectedCategory: null,
    };
  },
  async mounted() { // Используем только mounted()
    try {
      await this.fetchCategories();
    } catch (error) {
      console.error('Failed to load categories:', error);
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const categories = await ProductService.getAllCategories();
        console.log('Fetched Categories:', categories); // Логирование полученных категорий

        this.categories = categories;

        // Отбираем основные категории (у которых parentId === 0)
        this.mainCategories = categories.filter(category => category.parentId === 0);
        console.log('Main Categories:', this.mainCategories); // Логирование основных категорий

        // Добавляем флаг hasChildren, чтобы определить, есть ли у категории потомки
        this.mainCategories.forEach(category => {
          category.hasChildren = categories.some(cat => cat.parentId === category.id);
          category.children = []; // Инициализация пустого массива для потомков
        });
        console.log('Main Categories with hasChildren:', this.mainCategories); // Логирование после добавления флага
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    async toggleSubcategories(category) {
      // Проверяем, есть ли у категории потомки и еще не загружены ли они
      if (!category.children || category.children.length === 0) {
        try {
          const children = await ProductService.getCategoryChildren(category.id);
          category.children = children;
        } catch (error) {
          console.error('Failed to load subcategories:', error);
          return;
        }
      }
      category.isOpen = !category.isOpen;
    },
    selectCategory(category) {
      // Устанавливаем выбранную категорию для отображения товаров
      this.selectedCategory = category;
      console.log('Выбрана категория:', category);
    },
  },
};
</script>

<style scoped>
.toolbar {
  background-color: #222021;
  color: #d5dad9;
}

.sub-category-btn {
  color: #d5dad9;
}
</style>