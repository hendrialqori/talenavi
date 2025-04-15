<script setup lang="ts">
import type { Status } from '@/models/interfaces/todo';

const props = defineProps<{ title: Status, count: number, color: string }>()
</script>

<template>
    <header class="rounded-t-lg p-2" :style="{ backgroundColor: props.color }">
        <p class="text-white font-medium text-sm">{{ props.title }} <span class="font-light ml-2">{{ props.count }}</span>
        </p>
    </header>
</template>