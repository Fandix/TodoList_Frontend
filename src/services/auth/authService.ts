import { mutation } from '../graphql';
import { SignInResponse, SignOutResponse, SignUpResponse } from '../../model/auth_model';
import { SIGN_IN_MUTATION, SIGN_OUT_MUTATION, SIGN_UP_MUTATION } from '../../graphql';
import { STORAGE_KEYS } from '../../constants';

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const data = await mutation<SignInResponse>(SIGN_IN_MUTATION, { email, password });
    const signIn = data?.signIn;

    if (signIn?.errors?.length) throw new Error(signIn.errors[0]);
    if (signIn?.token) localStorage.setItem(STORAGE_KEYS.TOKEN, signIn.token);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};


export const logout = async (): Promise<void> => {
  try {
    const data = await mutation<SignOutResponse>(SIGN_OUT_MUTATION);
    const signOut = data?.signOut;

    if (signOut?.errors?.length) throw new Error(signOut.errors[0]);
    if (signOut?.success) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (error) {
    console.error('logout failed:', error);
    throw error;
  }
};


export const register = async (email: string, password: string, passwordConfirmation: string): Promise<void> => {
  try {
    const data = await mutation<SignUpResponse>(SIGN_UP_MUTATION, {
      email,
      password,
      passwordConfirmation
    });
    const signUp = data?.signUp;

    if (signUp?.errors?.length) throw new Error(signUp.errors[0]);
    if (signUp?.token) localStorage.setItem(STORAGE_KEYS.TOKEN, signUp.token);
  } catch (error) {
    console.error('signup failed:', error);
    throw error;
  }
};
