interface User {
  id: string;
  email: string;
}

export interface SignInResponse {
  signIn: {
    user: User;
    token: string;
    errors?: string[];
  };
}

export interface SignOutResponse {
  signOut: {
    success: boolean;
    errors?: string[];
  };
}

export interface SignUpResponse {
  signUp: {
    user: User;
    token: string;
    errors?: string[];
  };
}