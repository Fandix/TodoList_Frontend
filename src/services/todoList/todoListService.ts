import { mutation, query } from '../graphql';
import { QueryTaskInput, CreateTaskInput, UpdateTaskInput, TaskResponse, TasksResponse } from '../../model/task_model';
import {
  GET_TASKS_QUERY,
  GET_TASK_QUERY,
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
  DELETE_TASK_MUTATION
} from '../../graphql';

export const getTasks = async (input: QueryTaskInput): Promise<TasksResponse> => {
    try {
        const data = await query(GET_TASKS_QUERY, { input });
        return { list: data?.missions }
    } catch (error) {
        console.error('Fetch Tasks failed:', error);
        throw error;
    }
}

export const getTask = async (input: { id: number }): Promise<TaskResponse> => {
    try {
        const data = await query<{ mission: TaskResponse }>(GET_TASK_QUERY, input);
        return data.mission;
    } catch (error) {
        console.error('Fetch Task failed:', error);
        throw error;
    }
}

export const createTask = async (input: CreateTaskInput): Promise<TaskResponse> => {
    try {
        const data = await mutation(CREATE_TASK_MUTATION, { input });
        if (data.errors?.length) throw new Error(data.errors[0]);
        return data.mission;
    } catch (error) {
        console.error('Create Task failed:', error);
        throw error;
    }
}

export const updateTask = async (input: UpdateTaskInput): Promise<TaskResponse> => {
    try {
        const data = await mutation(UPDATE_TASK_MUTATION, { input });
        if (data.errors?.length) throw new Error(data.errors[0]);
        return data.mission;
    } catch (error) {
        console.error('Update Task failed:', error);
        throw error;
    }
}

export const deleteTask = async (input: { id: string }): Promise<void> => {
    try {
        const data = await mutation(DELETE_TASK_MUTATION, input);
        if (data.errors?.length) throw new Error(data.errors[0]);
        return;
    } catch (error) {
        console.error('Delete Task failed:', error);
        throw error;
    }
}
