import { useMutation } from '@tanstack/react-query';
import { SignUpMutationOutput, ErrorMessage } from './types.js';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleAuth, userSignUp } from './SignUpApi.js';
import { GoogleLogin } from '@react-oauth/google';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data: SignUpMutationOutput) => {
      localStorage.setItem('token', data.signup.token);
      localStorage.setItem('userId', data.signup.id);
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
            mutation.mutate({ name: name, email: email, password: password });
          }}
          noValidate
          validated={validated}
        >
          <p>{mutation.isError ? error : ' '}</p>
          <Form.Group className='mb-3' controlId='formBasicText'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type='text'
              placeholder='Enter your name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              type='email'
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type='password'
              placeholder='Enter your password'
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

export default SignUp;
