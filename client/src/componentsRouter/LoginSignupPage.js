import React from 'react';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';

function LoginSignupPage({ login, signup }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );
  return (
    <div>
      <h1>LoginSignupPage</h1>
      <LoginForm login={login}/>
      <SignupForm signup={signup}/>
    </div>
  );
}

export default LoginSignupPage;