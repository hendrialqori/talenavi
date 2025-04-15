<script setup lang="ts">
import { ref, watchEffect, computed, watch } from 'vue';
import { VueDraggable, type DraggableEvent } from 'vue-draggable-plus'
import NewTaskButton from '@/components/NewTaskButton.vue';
import SearchDeveloper from '@/components/SearchDeveloper.vue';
import SearchTask from '@/components/SearchTask.vue';
import BoardHeader from './BoardHeader.vue';
import BoardCard from './BoardCard.vue';

import { useTodoStore } from '@/stores/todo';
import type { Status, Todo } from '@/models/interfaces/todo';
import { storeToRefs } from 'pinia';

const TODO_STATUS = computed(() => ({
    readytoStart: 'Ready to start',
    inProgress: 'In Progress',
    waitingForReview: 'Waiting for review',
    pendingDeploy: 'Pending Deploy',
    stuck: 'Stuck',
    done: 'Done'
}))

const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

const readyToStart = ref<Todo[]>([])
const inProgress = ref<Todo[]>([])
const waitingForReview = ref<Todo[]>([])
const pendingDeploy = ref<Todo[]>([])
const stuck = ref<Todo[]>([])
const done = ref<Todo[]>([])

watchEffect(() => {
    // always watching todos store changes

    const readyToStartFilter = todoStore.todoList.filter((todo) => todo.status === 'Ready to start')
    readyToStart.value = readyToStartFilter

    const inProgressFilter = todoStore.todoList.filter((todo) => todo.status === 'In Progress')
    inProgress.value = inProgressFilter

    const waitingForReviewFilter = todoStore.todoList.filter((todo) => todo.status === 'Waiting for review')
    waitingForReview.value = waitingForReviewFilter

    const pendingDeployFilter = todoStore.todoList.filter((todo) => todo.status === 'Pending Deploy')
    pendingDeploy.value = pendingDeployFilter

    const stuckFilter = todoStore.todoList.filter((todo) => todo.status === 'Stuck')
    stuck.value = stuckFilter

    const doneFilter = todoStore.todoList.filter((todo) => todo.status === 'Done')
    done.value = doneFilter
})

function updateStore(e: unknown) {
    const event = e as DraggableEvent

    setTimeout(() => {
        const clonedData = event.clonedData as Todo
        const currentStatus = event.to.dataset.title as Status

        const todo = todos.value.find(t => t.id === clonedData.id)
        console.log(todo?.title)
        if (todo) {
            todo.status = currentStatus
        }
    }, 500)
}

</script>

<template>
    <section class="mt-5 space-y-10">
        <div class="inline-flex items-center gap-5">
            <NewTaskButton />
            <SearchTask />
            <SearchDeveloper />
        </div>
        <div id="kanban-container" class="w-full overflow-auto rounded-md pt-2 pb-10">
            <div class="min-w-[1800px] w-full grid grid-cols-6 gap-5">
                <div class="shrink-0">
                    <BoardHeader title="Ready to start" :count="readyToStart.length" color="#1E6EDC" />
                    <VueDraggable class="px-2 py-4 bg-[#373750] space-y-1 rounded-b-lg" v-model="readyToStart"
                        :data-title="TODO_STATUS.readytoStart" @add="updateStore" ghostClass="ghost" group="kanban"
                        :animation="150">
                        <BoardCard v-for="todo of readyToStart" :key="todo.id" v-bind="todo" />
                    </VueDraggable>
                </div>
                <div class="shrink-0">
                    <BoardHeader title="In Progress" :count="inProgress.length" color="#FAB964" />
                    <VueDraggable class="px-2 py-4 bg-[#373750] space-y-1 rounded-b-lg" v-model="inProgress"
                        :data-title="TODO_STATUS.inProgress" @add="updateStore" group="kanban" ghostClass="ghost"
                        :animation="150">
                        <BoardCard v-for="todo of inProgress" :key="todo.id" v-bind="todo" />
                    </VueDraggable>
                </div>
                <div class="shrink-0">
                    <BoardHeader title="Waiting for review" :count="waitingForReview.length" color="#A0E1F5" />
                    <VueDraggable class="px-2 py-4 bg-[#373750] space-y-1 rounded-b-lg" v-model="waitingForReview"
                        group="kanban" :data-title="TODO_STATUS.waitingForReview" @add="updateStore" ghostClass="ghost"
                        :animation="150">
                        <BoardCard v-for="todo of waitingForReview" :key="todo.id" v-bind="todo" />
                    </VueDraggable>
                </div>
                <div class="shrink-0">
                    <BoardHeader title="Pending Deploy" :count="pendingDeploy.length" color="#D2DC1E" />
                    <VueDraggable class="px-2 py-4 bg-[#373750] space-y-1 rounded-b-lg" v-model="pendingDeploy"
                        group="kanban" :data-title="TODO_STATUS.pendingDeploy" @add="updateStore" ghostClass="ghost"
                        :animation="150">
                        <BoardCard v-for="todo of pendingDeploy" :key="todo.id" v-bind="todo" />
                    </VueDraggable>
                </div>
                <div class="shrink-0">
                    <BoardHeader title="Stuck" :count="stuck.length" color="#EC3D3D" />
                    <VueDraggable class="px-2 py-4 bg-[#373750] space-y-1 rounded-b-lg" v-model="stuck" group="kanban"
                        :data-title="TODO_STATUS.stuck" @add="updateStore" ghostClass="ghost" :animation="150">
                        <BoardCard v-for="todo of stuck" :key="todo.id" v-bind="todo" />
                    </VueDraggable>
                </div>
                <div class="shrink-0">
                    <BoardHeader title="Done" :count="done.length" color="#32D291" />
                    <VueDraggable class="px-2 py-4 bg-[#373750] space-y-1 rounded-b-lg" v-model="done" group="kanban"
                        :data-title="TODO_STATUS.done" @add="updateStore" ghostClass="ghost" :animation="150">
                        <BoardCard v-for="todo of done" :key="todo.id" v-bind="todo" />
                    </VueDraggable>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.ghost {
    transform: scale(105%);
    background: red;
}

#kanban-container::-webkit-scrollbar {
    height: 7px;
    /* Width of the scrollbar */
}

#kanban-container::-webkit-scrollbar-track {
    background: #c6c6c6;
    /* Track color */
}

#kanban-container::-webkit-scrollbar-thumb {
    background: #888;
    /* Thumb color */
    border-radius: 2px;
    /* Rounded corners */
}

#kanban-container::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* Thumb hover color */
}
</style>
  