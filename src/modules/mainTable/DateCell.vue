<script setup lang="ts">
import dayjs from 'dayjs'
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

import { ref } from 'vue';

const date = ref(new Date());

const format = (date: Date) => dayjs(date).format('DD MMM, YYYY')

</script>

<template>
    <td
        class="relative border border-table-border py-3 text-white text-sm font-medium focus-within:outline-2 focus-within:outline-blue-500 focus-within:rounded-md">
        <VueDatePicker v-model="date" :format="format"/>
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

.dp__input_icon{
    display: none !important;
}
</style>
