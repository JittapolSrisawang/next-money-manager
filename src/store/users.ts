import { UserType } from "@/interfaces";
import { create } from "zustand";

const usersGlobalStore = create((set) => ({
  loggedInUser: null,
  SetLoggedInUser: (user: UserType) => set({ loggedInUser: user }),
}));

export default usersGlobalStore;

export interface UsersGlobalStoreType {
  loggedInUser: UserType | null;
  SetLoggedInUser: (user: UserType) => void;
}