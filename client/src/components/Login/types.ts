export interface LoginMutationOutput {
  login: {
    id: string;
    token: string;
    name: string;
  };
}

export interface GoogleAuthLogin {
  loginWithGoogle: {
    id: string;
    token: string;
    name: string;
  };
}

export interface LoginMutationInput {
  email: string;
  password: string;
}

export interface ErrorMessage {
  response: {
    errors: [
      {
        message: string,
        extensions: {
          code: number;
        };
      }
    ];
  };
}
