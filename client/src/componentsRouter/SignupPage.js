import React from 'react';
import SignupForm from '../auth/SignupForm';

function SignupPage({ signup }) {
  return (
    <div>
      <h1>Signup</h1>
      <SignupForm signup={signup}/>
    </div>
  );
}

export default SignupPage;