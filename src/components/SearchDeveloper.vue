<script setup lang="ts">
import { useTodoStore } from '@/stores/todo';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import { CircleUserRound, XCircle} from 'lucide-vue-next';
import { DEVELOPERS } from '@/models/constant/developer';

const todoStore = useTodoStore()

function findDeveloper(id: string) {
    todoStore.searchDeveloper(id)
}

function clearSearch() {
    todoStore.clearSearchDeveloper()
}

</script>

<template>
    <Menu as="div" class="relative text-sm font-medium">
        <MenuButton as="template">
            <button
                class="h-9 rounded-md bg-background text-white text-sm inline-flex items-center gap-3 px-3 hover:outline-2 hover:outline-blue-500">
                <CircleUserRound class="size-5" />
                <span>Person</span>
            </button>
        </MenuButton>
        <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 mt-2 w-52 z-10 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }" v-for="developer of DEVELOPERS">
                    <button :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm gap-3',
                    ]" @click="findDeveloper(String(developer.id))">
                        <img :src="developer.avatar" class="size-6 rounded-full object-cover" />
                        <div class="text-left">
                            <p class="text-sm">{{ developer.name }}</p>
                            <p class="text-[0.65rem]">{{ developer.role }}</p>
                        </div>
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]" @click="clearSearch">
                        <XCircle :active="active" class="mr-2 size-4" aria-hidden="true" />
                        Clear
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Transition>
    </Menu>
</template>