
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock enrolled courses data
const mockEnrolledCourses = [
  {
    id: 1,
    title: "Introduction to React",
    instructor: "John Smith",
    progress: 75,
    lastAccessed: "2 days ago",
    duration: "6 hours",
    nextLesson: "React Router",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    instructor: "Sarah Johnson",
    progress: 40,
    lastAccessed: "Yesterday",
    duration: "8 hours",
    nextLesson: "Promises and Async/Await",
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    instructor: "Michael Chen",
    progress: 20,
    lastAccessed: "1 week ago",
    duration: "5 hours",
    nextLesson: "User Personas",
  },
];

const MyCoursesPage = () => {
  const [enrolledCourses] = useState(mockEnrolledCourses);
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">
          Continue learning where you left off
        </p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-lg font-medium mb-2">You haven't enrolled in any courses yet</h2>
          <p className="text-muted-foreground mb-6">Browse our course catalog and enroll to start learning</p>
          <Button onClick={() => navigate("/courses")}>Browse Courses</Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription className="text-sm">{course.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Last accessed</p>
                    <p>{course.lastAccessed}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total duration</p>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <p>{course.duration}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Next lesson</p>
                  <p className="text-sm font-medium">{course.nextLesson}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Continue Learning
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
