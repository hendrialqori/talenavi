import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todo, Status, Priority, Type, Developer, Order } from '@/models/interfaces/todo'

type Field = keyof Todo

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<Todo[]>([])
    const searchTask = ref('')
    const searchDeveloperId = ref('')
    const sortField = ref<Field | ''>('')
    const sortOrder = ref<Order | ''>('')

    function addNewTodo() {
        const newTodo: Todo = {
            id: Date.now() + Math.random(),
            date: Date.now().toString(),
            title: 'New Task',
            developer: [],
            status: undefined,
            priority: undefined,
            type: undefined,
            "Actual SP": 0,
            "Estimated SP": 0
        }

        todos.value = [newTodo, ...todos.value]
    }

    async function fetchTodoFromAPI() {
        try {
            const req = await fetch('https://mocki.io/v1/9d9895f9-70eb-49d2-99f7-cb3dacca8a94')
            const todosRes = (await req.json()).data as Todo[]

            todos.value = todosRes.map((todo, i) => ({ ...todo, id: Date.now() + i + 1, date: Date.now().toString(), developer: [] }))
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

    function updateDate(id: number, newDate: string) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo.date = newDate
        }
    }

    function updateEstimate(id: number, newEstimated: number) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo['Estimated SP'] = newEstimated
        }
    }

    function updateActual(id: number, newActual: number) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            todo['Actual SP'] = newActual
        }
    }

    function addDeveloper(id: number, assignDeveloper: Developer) {
        const todo = todos.value.find(t => t.id === id)
        if (todo) {
            const [findDuplicateDeveloper] = todo.developer.filter((dev) => dev.id === assignDeveloper.id)
            const removeduplicateDeveloper = todo.developer.filter((dev) => dev.id !== assignDeveloper.id)

            if (findDuplicateDeveloper) {
                todo.developer = removeduplicateDeveloper
            } else {
                todo.developer = [...todo.developer, assignDeveloper]
            }
        }
    }

    const todoList = computed(() => {

        // sort by task & developer
        const filterTodos =
            todos.value.filter((todo) => {

                const task = searchTask.value.toLowerCase()
                const devId = searchDeveloperId.value

                const matchesTitle = todo.title.toLowerCase().includes(task)
                const matchesDev = devId === '' || todo.developer.some(dev =>
                    dev.id.toString().includes(devId)
                )

                return matchesTitle && matchesDev
            })

        // sort todos
        const sortTodos = filterTodos.sort((a, b) => {
            const valA = a[sortField.value as Field]?.toString()
            const valB = b[sortField.value as Field]?.toString()

            if (typeof valA === 'string' && typeof valB === 'string') {
                return sortOrder.value === 'asc'
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA)
            }

            return 0
        })

        return sortTodos
    })

    const sumOfActualSP = computed(() => {
        const total = todos.value.reduce((prev, curr) => prev + (Number(curr['Actual SP']) ?? 0), 0)
        return total
    })

    const sumOfEstimatedSP = computed(() => {
        const total = todos.value.reduce((prev, curr) => prev + (Number(curr['Estimated SP']) ?? 0), 0)
        return total
    })

    function developersById(id: number) {
        const todo = todos.value.find(t => t.id === id)
        return todo?.developer
    }

    const isSort = computed(() => sortField.value && sortOrder.value)

    function sortTodo(field: Field, order: Order) {
        sortField.value = field
        sortOrder.value = order
    }

    function clearSortTodo() {
        sortField.value = ''
        sortOrder.value = ''
    }


    function searchDeveloper(id: string) {
        searchDeveloperId.value = id
    }

    function clearSearchDeveloper() {
        searchDeveloperId.value = ''
    }

    return {
        todos,
        todoList,
        searchTask,
        addNewTodo,
        updateTask,
        updateStatus,
        updatePriority,
        updateType,
        updateDate,
        updateEstimate,
        updateActual,
        sumOfActualSP,
        sumOfEstimatedSP,
        fetchTodoFromAPI,
        addDeveloper,
        developersById,
        isSort,
        sortTodo,
        clearSortTodo,
        searchDeveloper,
        clearSearchDeveloper
    }

})