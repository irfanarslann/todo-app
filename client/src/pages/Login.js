import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/Auth/AuthContext';

const Login = (props) => {
  const { user, isAuthenticated, login, register, error, clearError } =
    useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const registerHandler = (e) => {
    e.preventDefault();
    register(email, password, name);
  };
  const loginHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    clearError();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, props.history, user]);

  if (isAuthenticated) return <Navigate to='/' />;

  return (
    <div className='login-main'>
      <div class='main'>
        <input type='checkbox' id='chk' aria-hidden='true'></input>
        <div class='signup'>
          <form onSubmit={(e) => registerHandler(e)}>
            <label for='chk' aria-hidden='true'>
              Sign up
            </label>
            <input
              type='text'
              name='txt'
              placeholder='User name'
              required='true'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              required='true'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              name='pswd'
              placeholder='Password'
              required='true'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Register</button>
          </form>
          {error}
        </div>

        <div class='login'>
          <form onSubmit={(e) => loginHandler(e)}>
            <label for='chk' aria-hidden='true'>
              Login
            </label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              required='true'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              name='pswd'
              placeholder='Password'
              required='true'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
            {error}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
