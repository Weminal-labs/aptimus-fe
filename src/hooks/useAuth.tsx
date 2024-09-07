import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Message context is null.");

  return context;
}
