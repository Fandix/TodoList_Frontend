import { SortOrder } from './common_model';

enum TaskCategories {
    work = 'work',
    personal = 'personal',
    shopping = 'shopping',
    health = 'health',
    other = 'other'
}

enum TaskSortBy {
    created_at = 'CREATED_AT',
    updated_at = 'UPDATE_AT',
    due_date = 'DUE_DATE',
    priority = 'PRIORITY',
    title = 'TITLE'
}


export interface TaskInput {
    completed: boolean;
    category: TaskCategories;
    search: string;
    sortBy: TaskSortBy;
    sortOrder: SortOrder;
    limit: number;
    offset: number;
}

export interface TaskResponse {
    id: number;
    title: string;
    priority: string;
    completed: boolean;
    category: string;
    description: string;
    dueDay: string;
}

export interface TasksResponse {
    list: [TaskResponse]
}