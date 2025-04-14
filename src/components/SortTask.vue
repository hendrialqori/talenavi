<script setup lang="ts">
import { ArrowDownUp, ArrowDownAZ, ArrowUpZA } from 'lucide-vue-next';

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>

<template>
    <Menu as="div" class="relative text-sm font-medium">
        <MenuButton as="template">
            <button
                class="h-9 rounded-md bg-background text-white text-sm font-medium inline-flex items-center gap-3 px-3 hover:outline-2 hover:outline-blue-500">
                <ArrowDownUp class="size-5" />
                <span>Sort</span>
            </button>
        </MenuButton>
        <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <ArrowDownAZ :active="active" class="mr-2 h-5 w-5 text-blue-400" aria-hidden="true" />
                        ASC
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                    ]">
                        <ArrowUpZA :active="active" class="mr-2 h-5 w-5 text-blue-400" aria-hidden="true" />
                        DESC
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Transition>
    </Menu>
</template>