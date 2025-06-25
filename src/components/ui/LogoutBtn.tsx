import { useDispatch } from "react-redux";

import { logout } from "../../store/authSlice";
import { authService } from "../../services/appwrite/auth";
import { Button } from "../";

function LogoutBtn() {
  const dispatch = useDispatch();

  async function onLogout() {
    const isLogout = await authService.logout();

    if (isLogout) dispatch(logout());
  }

  return (
    <Button
      buttonType="danger"
      className="rounded-xl bg-red-500 px-4"
      onClick={onLogout}>
      Logoutn
    </Button>
  );
}

export default LogoutBtn;
