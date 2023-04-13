import {useEffect, useState} from 'react';
import {SignedInStack, SignedOutStack} from './NavigationStack';

const AuthNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userHandler = user =>
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);

  useEffect(() => {
    /* const func = onAuthStateChanged(auth, user => userHandler(user)); */
    /* return func; */
  }, []);

  return <>{isLoggedIn ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
