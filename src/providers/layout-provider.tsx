"use client";
import React, { useEffect } from "react";
import Header from "./header";
import { message } from "antd";
import { GetLoggedInUserFromMongoDB } from "@/server-actions/users";
import { UserType } from "@/interfaces";
import { usePathname } from "next/navigation";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users";
import Loader from "@/components/loader";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { loggedInUser, SetLoggedInUser }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const pathname = usePathname();

  let isPublicRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");

  const getLoggedInUser = async () => {
    try {
      const response = await GetLoggedInUserFromMongoDB();
      if (response.error) throw new Error(response.error);
      SetLoggedInUser(response as UserType);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!loggedInUser && !isPublicRoute) {
      getLoggedInUser();
    }
  }, [pathname]);

  if (isPublicRoute) {
    return children;
  }

  if (!loggedInUser) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }

  return (
    loggedInUser && (
      <div>
        <Header />
        <div className="p-5">{children}</div>
      </div>
    )
  );
}

export default LayoutProvider;