import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
// persist --> saves the counter state in localStorage. Refreshing the page won’t reset it
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
  verifySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException | null }>;
  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: AppwriteException | null }>;
  logout(): Promise<void>;
}

export const useAuthstore = create<Iauthstore>()(
  persist(
    immer((set) => ({
      sessions: null,
      jwt: null,
      user: null,
      hydrated: false,

      sethydrated() {
        set({ hydrated: true });
      },

      async verifySession() {
        try {
          const sessions = await account.getSession("current");
          set({ sessions });
        } catch (error) {
          console.error(error);
        }
      },

      async login(email: string, password: string) {
        try {
          const sessions = await account.createEmailPasswordSession(
            email,
            password
          );

          const [user, jwtRes] = await Promise.all([
            account.get() as Promise<Models.User<UserPrefs>>,
            account.createJWT(),
          ]);

          if (!user.prefs?.reputation) {
            await account.updatePrefs<UserPrefs>({
              reputation: 0,
            });
          }

          set({ sessions, user, jwt: jwtRes.jwt });
          return { success: true };
        } catch (error) {
          console.error(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async createAccount(name: string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name);
          return { success: true };
        } catch (error) {
          console.error(error);
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          };
        }
      },

      async logout() {
        try {
          await account.deleteSession("current");
          set({ sessions: null, user: null, jwt: null });
        } catch (error) {
          console.error(error);
        }
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.sethydrated();
        };
      },
    }
  )
);
