
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem 
} from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Users, BookmarkCheck, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { title: "Manage Courses", path: "/admin/courses", icon: BookOpen },
    { title: "Manage Users", path: "/admin/users", icon: Users },
    { title: "Enrollments", path: "/admin/enrollments", icon: BookmarkCheck },
    { title: "Reports", path: "/admin/reports", icon: BarChart },
  ];

  return (
    <Sidebar>
      <div className="py-6 px-4 flex flex-col h-full">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-semibold text-foreground">Admin Portal</h1>
        </div>
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
              ADMINISTRATION
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive(item.path) 
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
