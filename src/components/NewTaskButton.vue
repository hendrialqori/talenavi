<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()
</script>

<template>
    <button @click="todoStore.addNewTodo" class="inline-flex items-center text-white text-sm h-9 bg-blue-500 rounded-md">
        <span class="font-medium px-3">New task</span>
        <div class="px-2 border-l border-l-black h-full flex items-center justify-center">
            <ChevronDown class="size-5" />
        </div>
    </button>
</template>