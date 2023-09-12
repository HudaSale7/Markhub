import { useMutation } from '@tanstack/react-query';
import { googleAuth, userLogin } from './LoginApi.js';
import { LoginMutationOutput, ErrorMessage } from './types.js';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data: LoginMutationOutput) => {
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('userId', data.login.id);
      navigate('/project');
    },
    onError: (error: ErrorMessage) => {
      if (error.response.errors[0].extensions.code === 422) {
        setError(error.response.errors[0].message);
      } else {
        setError('Network Error');
      }
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: googleAuth,
    onSuccess: (data) => {
      localStorage.setItem('token', data.loginWithGoogle.token);
      localStorage.setItem('userId', data.loginWithGoogle.id);
      navigate('/project');
    },
    onError: (error: ErrorMessage) => {
      if (error.response.errors[0].extensions.code === 422) {
        setError(error.response.errors[0].message);
      } else {
        setError('Network Error');
      }
    },
  });

  return (
    <>
      <div className='container'>
        <Form
          onSubmit={(e) => {
            setValidated(true);
            e.preventDefault();
            mutation.mutate({ email: email, password: password });
          }}
          noValidate
          validated={validated}
        >
          <p>{mutation.isError ? error : ' '}</p>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Form.Group>
          <Button variant='primary' type='submit' disabled={mutation.isLoading}>
            Submit
          </Button>
          <GoogleLogin
            onSuccess={(response) => {
              const token = response.credential || '';
              googleLoginMutation.mutate(token);
            }}
          ></GoogleLogin>
        </Form>
      </div>
    </>
  );
};

export default Login;
