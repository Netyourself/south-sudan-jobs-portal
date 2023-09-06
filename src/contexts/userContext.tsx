import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usersData } from '@/data/data';
import { User } from '@/types/user';

interface UsersProviderProps {
  children: ReactNode;
}
// Define the shape of your context
interface UsersContextType {
  users: User[];
  addUser: (user: User) => void;
  editUser: (user: User[]) => void;
  deleteUser: (userId: string) => void;
  //setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);
// Define your context provider component (UsersProvider)
export const UsersProvider: React.FC<UsersProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(usersData);

  // Function to add a new user
  const addUser = (newUser: User) => {
    const newData = { ...newUser, id: uuidv4() }; // TODO remove temporary id in dev, ID to be generated on the server
    setUsers([...users, newData]);
  };
  // Function to update an existing user
  const editUser = (editedUser: User[]) => {
    setUsers(editedUser);
  };

  // Function to delete a user
  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        addUser,
        editUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
