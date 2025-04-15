<script setup lang="ts">
import { ref } from 'vue';
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useTodoStore } from '@/stores/todo';
import { watch } from 'vue';
import { onMounted } from 'vue';

//@ts-ignore
import dayjs from 'dayjs'

const props = defineProps<{ id: number; date: string | undefined }>()

const todoStore = useTodoStore()

const date = ref(new Date());

const format = (date: Date) => dayjs(date).format('DD MMM, YYYY')

onMounted(() => date.value = new Date(props.date!))

watch((date), (currentDate) => {
    todoStore.updateDate(
        props.id,
        new Date(currentDate).getTime().toString()
    )
})

</script>

<template>
    <td
        class="relative border border-table-border py-3 text-white text-sm font-medium focus-within:outline-2 focus-within:outline-blue-500 focus-within:rounded-md">
        <VueDatePicker v-model="date" :format="format" />
    </td>
</template>

<style scoped>
.dp__theme_light {
    --dp-background-color: #2D324B;
    --dp-text-color: #FFFFFF;
    --dp-border-color: none;

    /*Font sizes*/
    --dp-font-size: 0.8rem;
    /*Default font-size*/
}

.dp__input_icon {
    display: none !important;
}
</style>
