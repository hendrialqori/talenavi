<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';

const props = defineProps<{ id: number; task: string }>()

const todoStore = useTodoStore()

function updateTask(e: Event) {
    todoStore.updateTask(
        props.id,
        (e.target as HTMLInputElement).value
    )
}

</script>

<template>
    <td
        class="relative border border-table-border py-3 text-white text-sm font-medium focus-within:outline-2 focus-within:outline-blue-500 focus-within:rounded-md">
        <input type="text" :value="props.task" @input="updateTask"
            class="absolute inset-0 rounded-md focus:outline-none px-4">
    </td>
</template>