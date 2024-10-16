<template>
  <div
    class="category-item"
    @mouseenter="handleHover"
    @click="selectCategory"
  >
    {{ category.title }}
    <div
      v-if="children && isOpen"
      class="subcategory-list"
    >
      <CategoryMenu
        v-for="child in children"
        :key="child.id"
        :category="child"
        :fetch-children="fetchChildren"
        @select-category="$emit('select-category', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  fetchChildren: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits(['select-category']);

// Локальное состояние для хранения подкатегорий
const children = ref([]);
const isOpen = ref(false);

const handleHover = async () => {
  if (children.value.length === 0) {
    const fetchedChildren = await props.fetchChildren(props.category.id);
    children.value = fetchedChildren;
  }
  isOpen.value = true;
};

const selectCategory = () => {
  emit('select-category', props.category);
};
</script>

<style scoped>
.category-item {
  cursor: pointer;
  padding: 5px;
}
.subcategory-list {
  margin-left: 20px;
}
</style>
