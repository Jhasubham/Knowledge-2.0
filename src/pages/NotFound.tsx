
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/App";

const NotFound = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const homePath = user 
    ? user.role === "admin" 
      ? "/admin" 
      : "/dashboard" 
    : "/login";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="text-center space-y-6 max-w-md animate-fade-in">
        <h1 className="text-9xl font-bold text-primary/30">404</h1>
        <h2 className="text-2xl font-semibold">Page not found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button asChild className="mt-4">
          <Link to={homePath}>Return to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
