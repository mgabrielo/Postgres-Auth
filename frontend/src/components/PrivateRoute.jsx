import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { userId } = useSelector((state) => state.user);

  return userId ? <Outlet /> : <Navigate to={"/login"} />;
}
