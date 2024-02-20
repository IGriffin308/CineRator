import React from 'react';
import LoginForm from '../auth/LoginForm';

function LoginSignupPage({ login }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );
  return (
    <div>
      <h1>LoginSignupPage</h1>
      <LoginForm login={login}/>
    </div>
  );
}

export default LoginSignupPage;