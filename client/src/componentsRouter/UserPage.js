import { React, useContext } from 'react';
import UserContext from "../auth/UserContext";

function UserPage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Userpage", "currentUser=", currentUser);

  return (
    <div 
      className="container border border-dark rounded"
      style={{margin: '10px, 20px, 10px, 10px', 
      padding: '10px', 
      background: 'rgba(255,255,255,0.5)'}}
    >
      <div className="container row">
        <img src="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg"
          alt="profile" 
          style={{width: '95px', height: '70px', borderRadius: '50%'}}
          className="custom-avatar"
        ></img>
        <h1 className="col" style={{marginTop: "10px"}}>{currentUser.username}</h1>
      </div>
      <hr />
      <h3>
        This is your user page!
      </h3>
      <p>
        We're still working on giving you the best user experience possible.
        Please check back later for more features!
      </p>
    </div>
  );
}

export default UserPage;