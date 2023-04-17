import {createContext, useState} from 'react';
import {SignedInStack, SignedOutStack} from './NavigationStack';

export const UserContext = createContext();

const AuthNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={setIsLoggedIn}>
      {isLoggedIn ? <SignedInStack /> : <SignedOutStack />}
    </UserContext.Provider>
  );
};

export default AuthNavigation;
