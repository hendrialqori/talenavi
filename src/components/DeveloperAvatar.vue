<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const props = defineProps<{ avatar: () => Promise<any> }>()

const Avatar = defineAsyncComponent({
    loader: props.avatar
})


</script>

<template>
    <img :src="Avatar" alt="Developer avatar" loading="lazy" />
</template>