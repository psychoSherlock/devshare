import React from "react";
import { getAuth } from "firebase/auth";

function Navbar() {
  const auth = getAuth();
  const user = auth.currentUser;
  return (
    <div>
      <h1>It Works!!</h1>

      <h2>Hello {user ? user.displayName : "World"}</h2>
    </div>
  );
}

export default Navbar;
