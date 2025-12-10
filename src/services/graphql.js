// Prefer env variable; fall back to local dev endpoint to avoid undefined fetch target
const GRAPHQL_ENDPOINT =
  process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';

export const graphqlRequest = async (query, variables = {}, options = {}) => {
  try {
    const token = localStorage.getItem('token');

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

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error(result.errors[0]?.message);
    }

    return result.data;
  } catch (error) {
    console.error('GraphQL Request Error:', error);
    throw error;
  }
};


export const query = (query, variables) => {
  return graphqlRequest(query, variables);
};

export const mutation = (mutation, variables) => {
  return graphqlRequest(mutation, variables);
};

export default {
  query,
  mutation,
  graphqlRequest,
};
