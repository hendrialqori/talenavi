<script setup lang="ts">
import { CircleUserRound, Check } from 'lucide-vue-next';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
import { ref, computed } from 'vue';
import { DEVELOPERS } from '@/models/constant/developer'
import type { Developer } from '@/models/interfaces/todo'
import { useTodoStore } from '@/stores/todo';

const props = defineProps<{ id: number, developer: Developer[] }>()

const todoStore = useTodoStore()

const isOpen = ref(false)

const selectedDevelopers = computed(() => todoStore.developersById(props.id))

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}

function addDeveloper(developer: Developer) {
    todoStore.addDeveloper(
        props.id,
        developer
    )
}

function matchDeveloper(id: number) {
    return selectedDevelopers.value?.find((selectDev) => selectDev.id === id)
}

</script>

<template>
    <td class="relative border border-table-border py-3 text-[#A0A5B0] text-sm font-medium w-[150px]">
        <button
            class="absolute inset-0 flex items-center justify-center hover:outline-2 hover:outline-blue-500 hover:rounded-md"
            @click="openModal" type="button">
            <div v-if="props.developer.length" class="-space-x-2">
                <img v-for="developer of props.developer" :src="developer.avatar"
                    class="size-7 rounded-full object-cover inline-flex" />
            </div>
            <CircleUserRound v-else class="size-6" />

        </button>
    </td>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                Assign Developers
                            </DialogTitle>
                            <div class="mt-1">
                                <p class="text-sm text-gray-500">
                                    Assign developers into tasks
                                </p>
                            </div>

                            <div class="space-y-1 mt-5">
                                <figure v-for="developer of  DEVELOPERS " :key="developer.id"
                                    :class="{ 'bg-gray-200': matchDeveloper(developer.id) }"
                                    @click="addDeveloper(developer)"
                                    class="flex items-center gap-3 rounded-lg active:bg-gray-200 px-1 py-2 cursor-pointer">
                                    <img :src="developer.avatar" class="size-10 rounded-full object-cover" />
                                    <figcaption class="w-full flex justify-between items-center pr-2">
                                        <div>
                                            <h3 class="font-medium text-sm">{{ developer.name }}</h3>
                                            <p class="text-xs text-gray-500">{{ developer.role }}</p>
                                        </div>
                                        <Check v-if="matchDeveloper(developer.id)" class="size-4 text-gray-500" />
                                    </figcaption>
                                </figure>
                            </div>

                            <div class="mt-4 flex justify-end">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Oke, close it!
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>