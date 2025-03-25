
import { Outlet } from "react-router-dom";
import { useAuth } from "@/App";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
