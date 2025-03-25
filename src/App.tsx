
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// User Pages
import UserDashboard from "./pages/user/Dashboard";
import CoursesPage from "./pages/user/Courses";
import MyCoursesPage from "./pages/user/MyCourses";
import CourseDetailPage from "./pages/user/CourseDetail";
import UserProfilePage from "./pages/user/Profile";
import CertificatesPage from "./pages/user/Certificates";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageCourses from "./pages/admin/ManageCourses";
import ManageUsers from "./pages/admin/ManageUsers";
import EnrollmentsManagement from "./pages/admin/EnrollmentsManagement";
import ReportsPage from "./pages/admin/Reports";

// Layouts
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import AuthLayout from "./components/layouts/AuthLayout";

// Not Found
import NotFound from "./pages/NotFound";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "user" | "admin") => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
  loading: boolean;
}

// Auth Context
export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock users for demonstration
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Test User",
    email: "user@example.com",
    password: "user123",
    role: "user" as const,
  },
];

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("lms_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Auth functions
  const login = (email: string, password: string, role: "user" | "admin") => {
    setLoading(true);
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("lms_user", JSON.stringify(userWithoutPassword));
    }
    setLoading(false);
    return !!foundUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
  };

  const register = (name: string, email: string, password: string) => {
    // In a real app, this would make an API call to create a user
    setLoading(true);
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role: "user" as const,
    };
    setUser(newUser);
    localStorage.setItem("lms_user", JSON.stringify(newUser));
    setLoading(false);
  };

  // Auth-protected route component
  const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: "user" | "admin" }) => {
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
    }

    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ user, login, logout, register, loading }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>

              {/* User Routes */}
              <Route element={
                <ProtectedRoute requiredRole="user">
                  <UserLayout />
                </ProtectedRoute>
              }>
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/my-courses" element={<MyCoursesPage />} />
                <Route path="/course/:id" element={<CourseDetailPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/certificates" element={<CertificatesPage />} />
              </Route>

              {/* Admin Routes */}
              <Route element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/courses" element={<ManageCourses />} />
                <Route path="/admin/users" element={<ManageUsers />} />
                <Route path="/admin/enrollments" element={<EnrollmentsManagement />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
