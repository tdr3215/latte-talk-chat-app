"use client";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

const AuthContext = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthContext;
