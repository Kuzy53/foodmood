import React, {useEffect} from 'react';
import useAuth from "@/utils/hooks/useAuth";

function Logout(props) {
  const {signOut} = useAuth()

  useEffect(() => {
    signOut()
  }, []);

  return (
    <div></div>
  );
}

export default Logout;