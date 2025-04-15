<script setup lang="ts">
import { PRIORITY_COLOR } from '@/models/constant/priority';
import type { Priority } from '@/models/interfaces/todo';

const props = defineProps<{ data: Priority | undefined }>()

</script>

<template>
    <div class="w-max p-1 border-l-4 rounded-md bg-[#373750]" :style="{ borderColor: PRIORITY_COLOR[props.data!] }">
        <p class="text-sm text-white px-1">{{ props.data }}</p>
    </div>
</template>