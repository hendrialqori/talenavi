import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todo, Status, Priority, Type } from '@/models/interfaces/todo'


export const useTodoStore = defineStore('todo', () => {

    const todos = ref<Todo[]>([])

    const searchTask = ref('')

    function addNewTodo() {
        const newTodo: Todo = {
            id: Date.now() + Math.random(),
            date: undefined,
            title: 'New Task',
            developer: [],
            status: undefined,
            priority: undefined,
            type: undefined,
            actual: undefined,
            estimated: undefined
        }

        todos.value = [newTodo, ...todos.value]
    }

    async function fetchTodoFromAPI() {
        try {
            const req = await fetch('https://mocki.io/v1/9d9895f9-70eb-49d2-99f7-cb3dacca8a94')
            const todosRes = (await req.json()).data as Todo[]

            todos.value = todosRes.map((todo, i) => ({ ...todo, id: Date.now() + i + 1, developer: [] }))


        } catch (error) {
            throw error
        }
    }

    function updateTask(id: number, newTask: string) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.title = newTask
        }
    }

    function updateStatus(id: number, newStatus: Status) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.status = newStatus
        }
    }

    function updatePriority(id: number, newPriority: Priority) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.priority = newPriority
        }
    }

    function updateType(id: number, newType: Type) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.type = newType
        }
    }

    function updateEstimate(id: number, newEstimated: number) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.estimated = newEstimated
        }
    }

    function updateActual(id: number, newActual: number) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.actual = newActual
        }
    }


    const sumOfActualSP = computed(() => {
        const total = todos.value.reduce((prev, curr) => prev + (curr.actual ?? 0), 0)
        return total
    })


    const sumOfEstimatedSP = computed(() => {
        const total = todos.value.reduce((prev, curr) => prev + (curr.estimated ?? 0), 0)
        return total
    })

    function searchByTask() {
        return todos.value.filter((todo) => todo.title.toLowerCase().includes(searchTask.value.toLowerCase()))
    }

    return {
        todos,
        searchTask,
        addNewTodo,
        updateTask,
        updateStatus,
        updatePriority,
        updateType,
        updateEstimate,
        updateActual,
        sumOfActualSP,
        sumOfEstimatedSP,
        searchByTask,
        fetchTodoFromAPI
    }

})