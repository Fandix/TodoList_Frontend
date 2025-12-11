import { API_CONFIG, STORAGE_KEYS } from '../constants';

const GRAPHQL_ENDPOINT = API_CONFIG.GRAPHQL_ENDPOINT;

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface GraphQLRequestOptions {
  headers?: Record<string, string>;
}

export const graphqlRequest = async <T = any>(
  query: string,
  variables: Record<string, any> = {},
  options: GraphQLRequestOptions = {}
): Promise<T> => {
  try {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result: GraphQLResponse<T> = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(result.errors[0]?.message);
    }

    return result.data as T;
  } catch (error) {
    console.error('GraphQL Request Error:', error);
    throw error;
  }
};


export const query = <T = any>(query: string, variables?: Record<string, any>): Promise<T> => {
  return graphqlRequest<T>(query, variables);
};

export const mutation = <T = any>(mutation: string, variables?: Record<string, any>): Promise<T> => {
  return graphqlRequest<T>(mutation, variables);
};

const graphqlClient = {
  query,
  mutation,
  graphqlRequest,
};

export default graphqlClient;
