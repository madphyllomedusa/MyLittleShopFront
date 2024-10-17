<template>
  <div
    class="category-item"
    @mouseenter="handleHover"
    @mouseleave="handleMouseLeave"
    @click="selectCategory"
  >
    {{ category.title }}
    <v-icon v-if="!isOpen">
      mdi-menu-down
    </v-icon>
    <v-icon v-else>
      mdi-menu-up
    </v-icon>
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

const children = ref([]);
const isOpen = ref(false);

const handleHover = async () => {
  if (children.value.length === 0) {
    const fetchedChildren = await props.fetchChildren(props.category.id);
    children.value = fetchedChildren;
  }
  isOpen.value = true;
};

const handleMouseLeave = () => {
  isOpen.value = false;
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
