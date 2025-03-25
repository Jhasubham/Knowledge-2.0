
import { useAuth } from "@/App";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award } from "lucide-react";

// Mock data for the dashboard
const mockCourses = [
  { id: 1, title: "Introduction to React", progress: 75, instructor: "John Smith" },
  { id: 2, title: "Advanced JavaScript", progress: 40, instructor: "Sarah Johnson" },
  { id: 3, title: "UX Design Fundamentals", progress: 20, instructor: "Michael Chen" },
];

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

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">
          Here's an overview of your learning progress
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <DashboardCard 
          title="Enrolled Courses" 
          value="3" 
          description="Total courses you're taking" 
          icon={BookOpen} 
        />
        <DashboardCard 
          title="Learning Hours" 
          value="12.5" 
          description="Total hours spent learning" 
          icon={Clock} 
        />
        <DashboardCard 
          title="Certificates" 
          value="1" 
          description="Certificates earned" 
          icon={Award} 
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <div className="grid gap-4">
          {mockCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{course.progress}%</div>
                </div>
                <Progress value={course.progress} className="h-2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
