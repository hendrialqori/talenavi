<script setup lang="ts">
import { XCircle } from 'lucide-vue-next';
import { useTodoStore } from '@/stores/todo';

const todoStore = useTodoStore()

function clearDataSort() {
    todoStore.clearSortTodo()
}

</script>

<template>
    <button v-if="todoStore.isSort"
        class="h-9 rounded-md bg-background font-medium text-white text-sm inline-flex items-center gap-3 px-3 hover:outline-2 hover:outline-blue-500"
        @click="clearDataSort">
        <XCircle class="size-5" />
        <span>Clear data sort</span>
    </button>
</template>