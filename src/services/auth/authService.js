import { mutation } from '../graphql';

export const login = async (email, password) => {
  const LOGIN_MUTATION = `
    mutation SignIn ($email: String!, $password: String!) {
	    signIn(email: $email, password: $password) {
	      user { id email }
        token
        errors
      } 
    }
  `;

  const variables = {
    email,
    password,
  };

  try {
    const data = await mutation(LOGIN_MUTATION, variables);
    const signIn = data?.signIn;
    console.log(signIn)

    if (signIn.errors?.length) throw new Error(signIn.errors[0]);
    if (signIn.token) localStorage.setItem('token', signIn.token);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


export const logout = async () => {
  const LOGOUT_MUTATION = `
    mutation {
	    signOut {
		    success
        errors
      }
    }
  `;
  try {
    const data = await mutation(LOGOUT_MUTATION);
    const signOut = data.signOut;

    if (signOut.errors?.length) throw new Error(signOut.errors[0]);
    if (signOut.success) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  } catch (error) {
    console.error('logout failed:', error);
    throw error;
  }
};


export const register = async (email, password, passwordConfirmation) => {
  const REGISTER_MUTATION = `
    mutation SignUp($email: String!, $password: String!, $passwordConfirmation: String!) {
	    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
	      user { id email }
        token
        errors
      }
    }
  `;

  const variables = {
    email,
    password,
    passwordConfirmation
  };

  try {
    const data = await mutation(REGISTER_MUTATION, variables);
    const signUp = data?.signUp;

    if (signUp.errors?.length) throw new Error(signUp.errors[0]);
    if (signUp.token) localStorage.setItem('token', signUp.token);
  } catch (error) {
    console.error('signup failed:', error);
    throw error;
  }
};
