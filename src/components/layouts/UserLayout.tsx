
import { Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user/UserSidebar";
import { UserNavbar } from "@/components/user/UserNavbar";

const UserLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <UserSidebar />
        <div className="flex-1 flex flex-col">
          <UserNavbar />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default UserLayout;
