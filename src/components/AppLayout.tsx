import { useEffect } from "react";

import { Outlet } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { authService } from "../services/appwrite/auth";
import { login, logout } from "../store/authSlice";
import { Footer, Header } from "../components";

function AppLayout() {
  const authStatus = useSelector((state: any) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(
    function () {
      authService
        .getLoggedInUserDetails()
        .then((userData) => {
          if (userData) return dispatch(login({ userData }));
          dispatch(logout());
        })
        .catch((error) => console.log("AppLayout :: error", error));
    },
    [authStatus],
  );

  return (
    <div className="h-screen">
      <div className="font-lato mx-auto flex h-full max-w-7xl flex-col">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default AppLayout;
