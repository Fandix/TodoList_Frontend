import { mutation, query } from '../graphql';
import { TaskInput, TaskResponse, TasksResponse } from '../../model/task_model';


export const get_tasks = async (input: TaskInput): Promise<TasksResponse> => {
    const TASKS_QUERY = `
        query Missions($input: MissionsQueryInput) {
            missions(input: $input) {
                id
                title
                priority
                completed
                category
                description
                dueDate
            }
        } 
    `;

    try {
        const data = await query(TASKS_QUERY, input);
        return { list: data?.missions }
    } catch (error) {
        console.error('Fetch Tasks failed:', error);
        throw error;
    }
}

export const get_task = async (id: number): Promise<TaskResponse> => {
    const TASK_QUERY = `
        query Mission($id: ID!) {
            mission(id: $id) {
                id
                title
                description
                completed
                dueDate
                priority
                category
            }
        }
    `;

    try {
        const data = await query<{ mission: TaskResponse }>(TASK_QUERY, { id });
        return data.mission;
    } catch (error) {
        console.error('Fetch Task failed:', error);
        throw error;
    }
}
