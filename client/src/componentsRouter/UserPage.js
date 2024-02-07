import { React, useContext } from 'react';
import UserContext from "../auth/UserContext";

function UserPage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Userpage", "currentUser=", currentUser);

  return (
    <div>
      <h1>UserPage</h1>
      <h2>
        User page for {currentUser.username}
      </h2>
    </div>
  );
}

export default UserPage;