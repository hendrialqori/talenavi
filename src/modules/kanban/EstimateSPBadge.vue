<script setup lang="ts">
const props = defineProps<{ data: number | undefined }>()
</script>

<template>
    <div class="w-max p-1 rounded-md bg-[#373750] text-white text-sm inline-flex gap-1">
        <div class="bg-background size-5 rounded-md text-[0.7rem] font-medium grid place-items-center">
            {{ props.data }}
        </div>
        <p class="px-1">SP</p>
    </div>
</template>