import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import useAppSelector from "~/hooks/useAppSelector";
import { authSelect } from "~/store/slices/authSlice";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(authSelect);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
