import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserMode, User } from '../types';

interface UserModeContextProps {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  user: User;
  isAuthenticated: boolean;
}

const UserModeContext = createContext<UserModeContextProps | undefined>(undefined);

export const UserModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userMode, setUserMode] = useState<UserMode>('owner');
  const [user] = useState<User>({
    name: 'Alex Mercer',
    email: 'alex.mercer@aquakeeper.com',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    role: 'Aquarium Hobbyist',
  });

  return (
    <UserModeContext.Provider value={{ userMode, setUserMode, user, isAuthenticated: true }}>
      {children}
    </UserModeContext.Provider>
  );
};

export const useUserMode = () => {
  const context = useContext(UserModeContext);
  if (!context) {
    throw new Error('useUserMode must be used within a UserModeProvider');
  }
  return context;
};
