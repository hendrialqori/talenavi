<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { Search } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

const todoStore = useTodoStore()
const { searchTask } = storeToRefs(todoStore)

</script>

<template>
    <div
        class="h-9 w-28 relative inline-flex bg-transparent rounded-md overflow-hidden text-white placeholder:text-white hover:outline-2 hover:outline-blue-500 focus-within:outline-2 focus-within:outline-blue-500">
        <div class="px-2 h-full inline-flex items-center justify-center bg-background ">
            <Search class="size-5" />
        </div>
        <input v-model="searchTask" type="text" class="font-medium bg-background focus:outline-none pl-1 pr-3 w-full placeholder:text-white" placeholder="Search">
    </div>
</template>