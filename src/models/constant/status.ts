export const STATUS = ['Ready to start', 'In Progress', 'Waiting for review', 'Pending Deploy', 'Done', 'Stuck'] as const

export const STATUS_COLOR: Record<typeof STATUS[number], string> = {
    "Ready to start": "#1E6EDC",
    "In Progress": "#FAB964",
    "Waiting for review": "#A0E1F5",
    "Pending Deploy": "#D2DC1E",
    "Stuck": "#EC3D3D",
    "Done": "#32D291"
}