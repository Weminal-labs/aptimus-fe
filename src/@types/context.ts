import { JwtPayload } from "jwt-decode";

export type User = {
  id: string;
  email: string;
  wallet_address: string;
};

export type Auth_Provider = {
  id: string;
  type: string;
  key: string;
  application_id: string;
};

export type Application = {
  id: string;
  name: string;
  description: string;
  team_id: string;
  image: string;
  public_key: string;
  private_key: string;
  providers: Auth_Provider[];
};

export type Team_user = {
  id: string;
  email: string;
  is_leader: number;
};

export type Team = {
  id: string;
  name: string;
};

export interface TeamExtended extends Team {
  applications: Application[];
}

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (newUser: User) => void;
  team: Team | null;
  setTeam: (newTeam: Team) => void;
};

export interface JwtPayloadExtend extends JwtPayload {
  email: string;
  name: string;
}
