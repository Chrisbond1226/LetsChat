import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = (props) => {
  const[formState, setFormState] = useState({ email: '', password: '' });
  const[login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main>
      <div>
        <div className='card'>
          <h4 className='card-header'>Login</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Password'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn' type='submit'>
                Submit
              </button>
            </form>
            {error && <div>Login unsuccessful</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;