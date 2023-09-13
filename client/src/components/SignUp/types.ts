export interface SignUpMutationOutput {
  signup: {
    id: string;
    token: string;
  };
}

export interface GoogleAuthLogin {
  loginWithGoogle: {
    id: string;
    token: string;
    name: string;
  };
}

export interface SignUpMutationInput {
  name: string;
  email: string;
  password: string;
}

export interface ErrorMessage {
  response: {
    errors: [
      {
        message: string;
        extensions: {
          code: number;
        };
      }
    ];
  };
}
