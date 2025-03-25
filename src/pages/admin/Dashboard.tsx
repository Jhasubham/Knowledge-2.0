
import { useAuth } from "@/App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, BookmarkCheck, Layers } from "lucide-react";

const DashboardCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ElementType; 
}) => (
  <Card className="card-hover">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for the admin dashboard
  const mockData = {
    totalUsers: 128,
    totalCourses: 12,
    activeEnrollments: 267,
    completionRate: 73,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin panel, {user?.name}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Total Users" 
          value={mockData.totalUsers.toString()} 
          description="Active registered accounts" 
          icon={Users} 
        />
        <DashboardCard 
          title="Courses" 
          value={mockData.totalCourses.toString()} 
          description="Published learning materials" 
          icon={BookOpen} 
        />
        <DashboardCard 
          title="Enrollments" 
          value={mockData.activeEnrollments.toString()} 
          description="Total active enrollments" 
          icon={BookmarkCheck} 
        />
        <DashboardCard 
          title="Completion Rate" 
          value={`${mockData.completionRate}%`} 
          description="Average course completion" 
          icon={Layers} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
            <CardDescription>New users in the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Chart visualization placeholder</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Course Enrollments</CardTitle>
            <CardDescription>Top courses by enrollment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Chart visualization placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
