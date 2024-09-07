import { createContext, ReactNode, useState } from "react";
import { AuthContextType, User, Team } from "../@types/context";

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser: (newUser: User) => {
          setUser(newUser);
        },
        team,
        setTeam: (newTeam: Team) => {
          setTeam(newTeam);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
