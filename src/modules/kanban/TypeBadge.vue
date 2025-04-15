<script setup lang="ts">
import { TYPE_COLOR } from '@/models/constant/type'
import type { Type } from '@/models/interfaces/todo';

const props = defineProps<{ data: Type | undefined }>()

</script>

<template>
    <div class="w-max p-1 border-l-4 rounded-md bg-[#373750]" :style="{ borderColor: TYPE_COLOR[props.data!] }">
        <p class="text-sm text-white px-1">{{ props.data }}</p>
    </div>
</template>