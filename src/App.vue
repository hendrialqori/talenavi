<script setup lang="ts">
import { House } from 'lucide-vue-next'
import { ref, onMounted } from 'vue';
import Table from '@/modules/mainTable/Table.vue'
import Board from './modules/kanban/Board.vue';
import { useTodoStore } from './stores/todo';
import { watchEffect } from 'vue';

const components = {
    'table': Table,
    'kanban': Board
}

const activeTab = ref<'table' | 'kanban'>('table')

function handleActive(key: typeof activeTab.value) {
    activeTab.value = key
}
const todoStore = useTodoStore()

watchEffect(() => console.log(todoStore.todoList.map((todo) => ({ title: todo.title, date: todo.date }))))

onMounted(async () => {
    await todoStore.fetchTodoFromAPI()
})

</script>

<template>
    <main class="px-10 mx-auto min-h-screen flex flex-col bg-background">
        <section class="w-full border-b gap-4 border-gray-700 flex justify-start">
            <button @click="handleActive('table')" class="flex items-start text-white text-sm gap-1 pb-3 px-4 font-medium"
                :class="{ 'border-b border-blue-600': activeTab === 'table' }">
                <House class="size-5" />
                <span>Main Table</span>
            </button>
            <button @click="handleActive('kanban')"
                class="inline-flex items-start text-white text-sm gap-1 pb-3 px-4 font-medium"
                :class="{ 'border-b border-blue-600': activeTab === 'kanban' }">
                Kanban
            </button>
        </section>
        <component :is="components[activeTab]" />
    </main>
</template>