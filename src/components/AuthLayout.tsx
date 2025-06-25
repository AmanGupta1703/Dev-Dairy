import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IAuthLayoutProps {
  authentication?: boolean;
  children: React.ReactNode;
}

function AuthLayout({ authentication = true, children }: IAuthLayoutProps) {
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state: any) => state.auth.status);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (authentication && authStatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authStatus !== authentication) {
        navigate("/");
      }
      setLoader(false);
    },
    [authStatus, navigate, authentication],
  );

  return loader ? <p>Loading...</p> : <>{children}</>;
}

export default AuthLayout;
