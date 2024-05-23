import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";

function Header() {
  const { loggedInUser }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const router = useRouter();
  return (
    <div className="p-5 bg-primary flex justify-between items-center">
      <div>
        <h1 className="font-bold text-white text-3xl cursor-pointer"
          onClick={() => router.push("/")}
        >MONEY MANAGER</h1>
      </div>

      <div className="flex items-center gap-5 bg-white py-2 px-5 rounded-sm">
        <span
          className="text-primary underline cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          {loggedInUser?.name}
        </span>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
}

export default Header;