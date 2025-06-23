import { Priority, TypeTask } from '@/generated/graphql'

export interface TaskItem {
    id: string
    name: string
    description: string
    priority: Priority
    typeTask: TypeTask
    state: boolean
    fCreation: string
    fExpiration: string
    reminder?: string | null
}