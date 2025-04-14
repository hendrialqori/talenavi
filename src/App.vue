<script setup lang="ts">
import { House } from 'lucide-vue-next'
import { ref } from 'vue';
import Table from '@/modules/mainTable/Table.vue'

const activeTab = ref<'main-table' | 'kanban'>('main-table')

function handleActive(key: typeof activeTab.value) {
    activeTab.value = key
}

</script>

<template>
    <main class="w-[1900px] mx-auto min-h-screen flex items-center justify-center bg-background">
        <div class="w-full px-10">
            <header class="border-b gap-4 border-gray-700 flex">
                <button @click="handleActive('main-table')"
                    class="flex items-start text-white text-sm gap-1 pb-3 px-4"
                    :class="{ 'border-b border-blue-600': activeTab === 'main-table' }"
                    >
                    <House class="size-5" />
                    <span>Main Table</span>
                </button>
                <button @click="handleActive('kanban')" class="inline-flex items-start text-white text-sm gap-1 pb-3 px-4"
                    :class="{ 'border-b border-blue-600': activeTab === 'kanban' }">
                    Kanban
                </button>
            </header>
            <Table />
        </div>
    </main>
</template>