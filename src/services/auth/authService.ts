import { mutation } from '../graphql';
import { SignInResponse, SignOutResponse, SignUpResponse } from '../../model/auth_model';

export const login = async (email: string, password: string): Promise<void> => {
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
    const data = await mutation<SignInResponse>(LOGIN_MUTATION, variables);
    const signIn = data?.signIn;

    if (signIn.errors?.length) throw new Error(signIn.errors[0]);
    if (signIn.token) localStorage.setItem('token', signIn.token);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


export const logout = async (): Promise<void> => {
  const LOGOUT_MUTATION = `
    mutation {
	    signOut {
		    success
        errors
      }
    }
  `;
  try {
    const data = await mutation<SignOutResponse>(LOGOUT_MUTATION);
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


export const register = async (email: string, password: string, passwordConfirmation: string): Promise<void> => {
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
    const data = await mutation<SignUpResponse>(REGISTER_MUTATION, variables);
    const signUp = data?.signUp;

    if (signUp.errors?.length) throw new Error(signUp.errors[0]);
    if (signUp.token) localStorage.setItem('token', signUp.token);
  } catch (error) {
    console.error('signup failed:', error);
    throw error;
  }
};
