export const PRIORITES = ['Critical', 'High', 'Medium', 'Low', 'Best Effort'] as const

export const PRIORITY_COLOR: Record<typeof PRIORITES[number], string> = {
    'Low': '#969696',
    'Medium': '#78AFFA',
    'High': '#7378E1',
    'Critical': '#E17373',
    'Best Effort': '#FFA50E'
}