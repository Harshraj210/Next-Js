import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// persist -->saves the counter state in localStorage. Refreshing the page won’t reset it
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models } from "node-appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
  reputation: number;
}

interface Iauthstore {
  // holds the current Appwrite session
  sessions: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  sethydrated(): void;
  // holds the current Appwrite session
  verifySession(): Promise<void>;
  login(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; errror?: AppwriteException | null }>;
  logout():Promise<void>
}

export const useAuthstore=create<Iauthstore>()
