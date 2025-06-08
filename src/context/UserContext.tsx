import { createContext, useContext, useState, useEffect } from 'react';
import { getUser as loadUser, setUser as persistUser } from '../utils/auth/user';

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState(loadUser());

  const setUser = (user: any) => {
    setUserState(user);
    persistUser(user);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setUserState(loadUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};