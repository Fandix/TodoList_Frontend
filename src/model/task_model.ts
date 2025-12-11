import { SortOrder } from './common_model';

export enum TaskCategories {
    work = 'work',
    personal = 'personal',
    shopping = 'shopping',
    health = 'health',
    other = 'other'
}

export enum TaskPriority {
    low = 1,
    medium = 2,
    high = 3
}

export type CategoryFilter = 'all' | TaskCategories;
export type PriorityFilter = 'all' | TaskPriority;
export type CompletionFilter = 'all' | 'completed' | 'uncompleted';

enum TaskSortBy {
    created_at = 'CREATED_AT',
    updated_at = 'UPDATE_AT',
    due_date = 'DUE_DATE',
    priority = 'PRIORITY',
    title = 'TITLE'
}


export interface QueryTaskInput {
    completed?: boolean;
    category?: TaskCategories;
    priority?: TaskPriority;
    search?: string;
    sortBy?: TaskSortBy;
    sortOrder?: SortOrder;
    limit?: number;
    offset?: number;
}

export interface CreateTaskInput {
    title: string;
    priority: number;
    category: string;
    description?: string;
    dueDate?: string;
}

export interface UpdateTaskInput {
    id: string;
    title?: string;
    priority?: number;
    category?: string;
    completed?: boolean;
    description?: string;
    dueDate?: string;
}

export interface TaskResponse {
    id: string;
    title: string;
    priority: number;
    completed: boolean;
    category: string;
    description: string;
    dueDate: string;
}

export interface TasksResponse {
    list: [TaskResponse]
}
