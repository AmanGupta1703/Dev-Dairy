import { useState } from "react";

import { useDispatch } from "react-redux";

import { logout } from "../../store/authSlice";
import { authService } from "../../services/appwrite/auth";
import { Button } from "../";

function LogoutBtn() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  async function onLogout() {
    setIsLoading(true);
    try {
      const isLogout = await authService.logout();

      if (isLogout) dispatch(logout());
    } catch (error) {
      console.log("LogoutBtn :: error ::", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      buttonType="danger"
      className="rounded-xl bg-red-500 px-4"
      onClick={onLogout}
      disabled={isLoading}
      style={{ cursor: isLoading ? "not-allowed" : "" }}>
      {!isLoading ? "Logout" : "Logging out..."}
    </Button>
  );
}

export default LogoutBtn;
