export const initialData = {
    tasks: {

        'task-1': { id: 'task-1', content: "Take out the garbage" },
        'task-2': { id: 'task-2', content: "Take out the Trash" },
        'task-3': { id: 'task-3', content: "Make Dinner for all" },
        'task-4': { id: 'task-4', content: "Make Lunch for Mom" },
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        }
    },

    // Faclitate ordering of columns
    columnOrder: ['column-1']
}