
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Clock, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock course data
const mockCourses = [
  {
    id: 1,
    title: "Introduction to React",
    instructor: "John Smith",
    description: "Learn the fundamentals of React, including components, state, and props.",
    duration: "6 hours",
    level: "Beginner",
    category: "Web Development",
    enrolled: false,
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    instructor: "Sarah Johnson",
    description: "Deep dive into JavaScript concepts like closures, promises, and ES6+ features.",
    duration: "8 hours",
    level: "Intermediate",
    category: "Programming",
    enrolled: true,
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    instructor: "Michael Chen",
    description: "Learn user experience design principles and practices for creating intuitive interfaces.",
    duration: "5 hours",
    level: "Beginner",
    category: "Design",
    enrolled: false,
  },
  {
    id: 4,
    title: "Data Science with Python",
    instructor: "Lisa Wang",
    description: "Introduction to data analysis and visualization using Python libraries.",
    duration: "10 hours",
    level: "Intermediate",
    category: "Data Science",
    enrolled: false,
  },
];

const CoursesPage = () => {
  const [courses, setCourses] = useState(mockCourses);
  const { toast } = useToast();

  // Handle course enrollment
  const handleEnroll = (courseId: number) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, enrolled: true } : course
      )
    );
    
    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in this course.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Courses</h1>
          <p className="text-muted-foreground">
            Browse and enroll in our catalog of courses
          </p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filter Courses
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden card-hover">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <Badge variant={course.level === "Beginner" ? "secondary" : "outline"}>
                  {course.level}
                </Badge>
              </div>
              <CardDescription className="text-sm">{course.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" /> {course.duration}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <BookOpen className="h-4 w-4 mr-1" /> {course.category}
              </div>
            </CardContent>
            <CardFooter>
              {course.enrolled ? (
                <Button variant="secondary" className="w-full" disabled>
                  Already Enrolled
                </Button>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={() => handleEnroll(course.id)}
                >
                  Enroll Now
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
