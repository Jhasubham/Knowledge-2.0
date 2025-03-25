
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
import { Home, BookOpen, Bookmark, Award, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: Home },
    { title: "Browse Courses", path: "/courses", icon: BookOpen },
    { title: "My Courses", path: "/my-courses", icon: Bookmark },
    { title: "Certificates", path: "/certificates", icon: Award },
    { title: "Profile", path: "/profile", icon: User },
  ];

  return (
    <Sidebar>
      <div className="py-6 px-4 flex flex-col h-full">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-semibold text-foreground">EduLearn LMS</h1>
        </div>
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-muted-foreground">
              MAIN NAVIGATION
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
