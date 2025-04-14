export const TYPES = ['Feature Enhancements', 'Other', 'Bug'] as const

export const TYPE_COLOR: Record<typeof TYPES[number], string> = {
    'Feature Enhancements': '#FFB9B9',
    'Bug': '#FFCFB9',
    'Other': '#B9A5F5'
}