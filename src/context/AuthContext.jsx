"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { EDITOR_USER } from "@/lib/posts";
import {
  STORAGE_KEYS,
  readJson,
  writeJson,
  setTokenCookie,
  clearTokenCookie,
} from "@/lib/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([EDITOR_USER]);
  const [currentUser, setCurrentUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedUsers = readJson(STORAGE_KEYS.users, null);
    const nextUsers =
      Array.isArray(storedUsers) && storedUsers.length
        ? storedUsers
        : [EDITOR_USER];
    if (!nextUsers.some((u) => u.email === EDITOR_USER.email)) {
      nextUsers.unshift(EDITOR_USER);
    }
    setUsers(nextUsers);
    writeJson(STORAGE_KEYS.users, nextUsers);

    const sessionId = readJson(STORAGE_KEYS.session, null);
    const user = nextUsers.find((u) => u.id === sessionId) || null;
    setCurrentUser(user);
    if (user) setTokenCookie();
    setReady(true);
  }, []);

  const persistUsers = (next) => {
    setUsers(next);
    const result = writeJson(STORAGE_KEYS.users, next);
    return result;
  };

  const login = (email, password) => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === String(email).trim().toLowerCase() &&
        u.password === password
    );
    if (!user) return { ok: false, error: "Invalid email or password." };
    setCurrentUser(user);
    writeJson(STORAGE_KEYS.session, user.id);
    setTokenCookie();
    return { ok: true, user };
  };

  const register = ({ name, email, password }) => {
    const cleanEmail = String(email).trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { ok: false, error: "An account with that email already exists." };
    }
    const user = {
      id: `user-${Date.now()}`,
      name: String(name).trim() || "Writer",
      email: cleanEmail,
      password,
    };
    const next = [...users, user];
    const saved = persistUsers(next);
    if (!saved.ok) {
      return { ok: false, error: "Could not save account in this browser." };
    }
    setCurrentUser(user);
    writeJson(STORAGE_KEYS.session, user.id);
    setTokenCookie();
    return { ok: true, user };
  };

  const logout = () => {
    setCurrentUser(null);
    writeJson(STORAGE_KEYS.session, null);
    clearTokenCookie();
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, users, ready, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
