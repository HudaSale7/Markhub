export interface LoginMutationOutput {
  login: {
    id: string;
    token: string;
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
