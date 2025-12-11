export const SIGN_IN_MUTATION = `
  mutation SignIn ($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user { id email }
      token
      errors
    }
  }
`;

export const SIGN_UP_MUTATION = `
  mutation SignUp($email: String!, $password: String!, $passwordConfirmation: String!) {
    signUp(email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
      user { id email }
      token
      errors
    }
  }
`;

export const SIGN_OUT_MUTATION = `
  mutation {
    signOut {
      success
      errors
    }
  }
`;
