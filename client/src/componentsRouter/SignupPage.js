import React from 'react';
import SignupForm from '../auth/SignupForm';

function SignupPage({ signup }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`,
  );
  return (
    <div>
      <h1>SignupPage</h1>
      <SignupForm signup={signup}/>
    </div>
  );
}

export default SignupPage;