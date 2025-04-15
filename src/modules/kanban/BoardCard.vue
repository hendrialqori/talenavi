<script setup lang="ts">
import PriorityBadge from './PriorityBadge.vue';
import TypeBadge from './TypeBadge.vue';
import EstimateSPBadge from './EstimateSPBadge.vue';

import type { Todo } from '@/models/interfaces/todo';

const props = defineProps<Todo>()
</script>

<template>
    <div class="rounded-md p-2 border border-[#464662] bg-background space-y-3 cursor-grab select-none">
        <h1 class="text-white text-sm font-medium">{{ props.title }}</h1>
        <div class="flex flex-wrap gap-2">
            <PriorityBadge :data="props.priority" />
            <EstimateSPBadge :data="props['Estimated SP']" />
            <TypeBadge :data="props.type" />
        </div>
        <div v-if="props.developer.length" class="-space-x-2">
            <img v-for="developer of props.developer" :src="developer.avatar"
                class="size-6 rounded-full object-cover inline-flex" />
        </div>
    </div>
</template>