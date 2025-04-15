<script setup lang="ts">
import { ArrowDownUp, ArrowDownAZ, ArrowUpZA } from 'lucide-vue-next';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import type { Order } from '@/models/interfaces/todo';
import { useTodoStore } from '@/stores/todo';

const FIELD = 'priority';

const orders = [
    {
        key: 'asc',
        icon: ArrowDownAZ
    },
    {
        key: 'desc',
        icon: ArrowUpZA
    }
]

const todoStore = useTodoStore()

function handleSort(order: Order) {
    todoStore.sortTodo(FIELD, order)
}

</script>

<template>
    <Menu as="th"
        class="relative border border-table-border py-3 text-[#A0A5B0] text-sm font-medium w-[200px] focus-within:outline-2 focus-within:outline-blue-500 focus-within:rounded-md">
        <MenuButton class="absolute inset-0 flex items-center justify-center">
            Priority
            <ArrowDownUp class="size-3 translate-x-1" />
        </MenuButton>
        <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }" v-for="order of orders">
                    <button :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-xs',
                    ]" @click="handleSort(order.key as Order)">
                        <component :is="order.icon" :active="active" class="mr-2 size-4 text-blue-400" aria-hidden="true" />
                        {{ order.key.toUpperCase() }}
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Transition>
    </Menu>
</template>