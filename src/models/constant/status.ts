export const STATUS = ['Ready to start', 'In Progress', 'Waiting for review', 'Pending Deploy', 'Done', 'Stuck'] as const

export const STATUS_COLOR: Record<typeof STATUS[number], string> = {
    "In Progress": "#FAB964",
    "Done": "#32D291",
    "Pending Deploy": "#D2DC1E",
    "Ready to start": "#1E6EDC",
    "Stuck": "#EC3D3D",
    "Waiting for review": "#A0E1F5"
}