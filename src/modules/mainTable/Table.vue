<script setup lang="ts">
import { STATUS_COLOR } from '@/models/constant/status';
import { PRIORITY_COLOR } from '@/models/constant/priority';
import { TYPE_COLOR } from '@/models/constant/type';
import { MessageCirclePlus, Plus } from 'lucide-vue-next';
import NewTaskButton from '@/components/NewTaskButton.vue';
import SearchTask from '@/components/SearchTask.vue';

import TaskCell from './TaskCell.vue';
import StatusCell from './StatusCell.vue';
import PriorityCell from './PriorityCell.vue';
import TypeCell from './TypeCell.vue';
import DateCell from './DateCell.vue';
import EstimateCell from './EstimateCell.vue';
import ActualCell from './ActualCell.vue';
import DeveloperCell from './DeveloperCell.vue';

import { useTodoStore } from '@/stores/todo'
import TaskHeaderCell from './TaskHeaderCell.vue';
import StatusHeaderCell from './StatusHeaderCell.vue'
import PriorityHeaderCell from './PriorityHeaderCell.vue'
import TypeHeaderCell from './TypeHeaderCell.vue'
import DateHeaderCell from './DateHeaderCell.vue';
import EstimateHeaderCell from './EstimateHeaderCell.vue';
import ActualHeaderCell from './ActualHeaderCell.vue'
import SearchDeveloper from '@/components/SearchDeveloper.vue';
import ClearSortTable from '@/components/ClearSortTable.vue';

const todoStore = useTodoStore()

</script>

<template>
    <section class="mt-5 space-y-10">
        <div class="inline-flex items-center gap-5">
            <NewTaskButton />
            <SearchTask />
            <SearchDeveloper />
            <ClearSortTable />
        </div>

        <div id="table-container" class="w-full overflow-auto rounded-md pt-2 pb-40">
            <table class="min-w-[1800px] w-full border-collapse table-auto text-white bg-background-mute">
                <thead>
                    <tr>
                        <TaskHeaderCell />
                        <th class="border border-table-border py-3 text-[#A0A5B0] text-sm font-medium w-[150px]">
                            Developer
                        </th>
                        <StatusHeaderCell />
                        <PriorityHeaderCell />
                        <TypeHeaderCell />
                        <DateHeaderCell />
                        <EstimateHeaderCell />
                        <ActualHeaderCell />
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="todo of todoStore.todoList" :key="todo.id">
                        <TaskCell :id="todo.id" :task="todo.title" />
                        <td class="border border-table-border py-3 text-white text-sm font-medium w-[80px]">
                            <MessageCirclePlus class="size-5 mx-auto" />
                        </td>
                        <DeveloperCell :id="todo.id" :developer="todo.developer" />
                        <StatusCell :id="todo.id" :status="todo.status" />
                        <PriorityCell :id="todo.id" :priority="todo.priority" />
                        <TypeCell :id="todo.id" :type="todo.type" />
                        <DateCell :id="todo.id" :date="todo.date" />
                        <EstimateCell :id="todo.id" :estimate="todo['Estimated SP']" />
                        <ActualCell :id="todo.id" :actual="todo['Actual SP']" />
                    </tr>
                    <tr>
                        <td class="border border-table-border py-3 text-white text-sm font-medium" colspan="8">
                            <button @click="todoStore.addNewTodo" class="inline-flex items-center gap-1 pl-5">
                                <Plus class="size-4" />
                                Add new task
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="border border-background py-3 text-background text-sm font-medium w-[500px] bg-background"
                            colspan="2">
                            Task
                        </td>
                        <th class="border border-table-border py-3 text-background-mute text-sm font-medium w-[150px]">
                            Developer
                        </th>
                        <th class="border border-table-border py-3 text-[#A0A5B0] text-sm font-medium w-[200px]">
                            <div class="flex px-3">
                                <div class="grow h-5" v-for="[_, color] of Object.entries(STATUS_COLOR)" :key="color"
                                    :style="{ backgroundColor: color }"></div>
                            </div>
                        </th>
                        <th class="border border-table-border py-3 text-[#A0A5B0] text-sm font-medium w-[200px]">
                            <div class="flex px-3">
                                <div class="grow h-5" v-for="[_, color] of Object.entries(PRIORITY_COLOR)" :key="color"
                                    :style="{ backgroundColor: color }"></div>
                            </div>
                        </th>
                        <th class="border border-table-border py-3 text-[#A0A5B0] text-sm font-medium w-[200px]">
                            <div class="flex px-3">
                                <div class="grow h-5" v-for="[_, color] of Object.entries(TYPE_COLOR)" :key="color"
                                    :style="{ backgroundColor: color }"></div>
                            </div>
                        </th>
                        <th class="border border-table-border p-3 text-background-mute text-sm font-medium w-[200px]">
                            <div class="w-full rounded-full px-2 py-1 text-white bg-gray-400">
                                -
                            </div>
                        </th>
                        <th class="border border-table-border text-[#A0A5B0] text-sm font-medium w-[200px]">
                            <div class="flex flex-col justify-center">
                                <h2>{{ todoStore.sumOfEstimatedSP }} SP</h2>
                                <p class="text-xs font-light">sum</p>
                            </div>
                        </th>
                        <th class="border border-table-border text-[#A0A5B0] text-sm font-medium w-[200px]">
                            <div class="flex flex-col justify-center">
                                <h2>{{ todoStore.sumOfActualSP }} SP</h2>
                                <p class="text-xs font-light">sum</p>
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </section>
</template>

<style scoped>
#table-container::-webkit-scrollbar {
    height: 7px;
    /* Width of the scrollbar */
}

#table-container::-webkit-scrollbar-track {
    background: #c6c6c6;
    /* Track color */
}

#table-container::-webkit-scrollbar-thumb {
    background: #888;
    /* Thumb color */
    border-radius: 2px;
    /* Rounded corners */
}

#table-container::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* Thumb hover color */
}
</style>