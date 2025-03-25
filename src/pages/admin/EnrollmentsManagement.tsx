
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, MoreHorizontal, Plus, Search, Trash, UserPlus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock enrollments data
const mockEnrollments = [
  {
    id: 1,
    student: {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
    },
    course: {
      id: 1,
      title: "Introduction to React",
      instructor: "David Rodriguez",
    },
    enrollmentDate: "Jan 18, 2023",
    progress: 75,
    status: "In Progress",
    lastActivity: "2 days ago",
  },
  {
    id: 2,
    student: {
      id: 2,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
    },
    course: {
      id: 1,
      title: "Introduction to React",
      instructor: "David Rodriguez",
    },
    enrollmentDate: "Feb 10, 2023",
    progress: 45,
    status: "In Progress",
    lastActivity: "1 week ago",
  },
  {
    id: 3,
    student: {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
    },
    course: {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Sarah Peterson",
    },
    enrollmentDate: "Mar 5, 2023",
    progress: 20,
    status: "In Progress",
    lastActivity: "3 days ago",
  },
  {
    id: 4,
    student: {
      id: 3,
      name: "Michael Williams",
      email: "michael.williams@example.com",
    },
    course: {
      id: 3,
      title: "UX Design Fundamentals",
      instructor: "Lisa Chen",
    },
    enrollmentDate: "Jan 5, 2023",
    progress: 100,
    status: "Completed",
    lastActivity: "1 month ago",
  },
];

// Mock users for add enrollment
const mockAllUsers = [
  { id: 1, name: "John Smith", email: "john.smith@example.com" },
  { id: 2, name: "Emily Johnson", email: "emily.johnson@example.com" },
  { id: 3, name: "Michael Williams", email: "michael.williams@example.com" },
  { id: 4, name: "Sarah Garcia", email: "sarah.garcia@example.com" },
];

// Mock courses for add enrollment
const mockAllCourses = [
  { id: 1, title: "Introduction to React", instructor: "David Rodriguez" },
  { id: 2, title: "Advanced JavaScript", instructor: "Sarah Peterson" },
  { id: 3, title: "UX Design Fundamentals", instructor: "Lisa Chen" },
  { id: 4, title: "Data Science with Python", instructor: "James Wilson" },
];

const EnrollmentsManagement = () => {
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [isAddEnrollmentDialogOpen, setIsAddEnrollmentDialogOpen] = useState(false);
  const [newEnrollment, setNewEnrollment] = useState({
    userId: "",
    courseId: "",
  });
  const { toast } = useToast();

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch = 
      enrollment.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = !selectedCourse || enrollment.course.id.toString() === selectedCourse;
    const matchesStatus = !selectedStatus || enrollment.status === selectedStatus;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleAddEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would submit the form data to the server
    toast({
      title: "Enrollment Added",
      description: "The user has been enrolled in the course successfully.",
    });
    
    setIsAddEnrollmentDialogOpen(false);
    setNewEnrollment({ userId: "", courseId: "" });
  };

  const handleDeleteEnrollment = (id: number) => {
    setEnrollments(enrollments.filter((enrollment) => enrollment.id !== id));
    
    toast({
      title: "Enrollment Removed",
      description: "The enrollment has been removed successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Enrollments</h1>
          <p className="text-muted-foreground">
            Manage course enrollments and student progress
          </p>
        </div>
        <Dialog open={isAddEnrollmentDialogOpen} onOpenChange={setIsAddEnrollmentDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Enrollment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Enrollment</DialogTitle>
              <DialogDescription>
                Enroll a user in a course
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddEnrollment}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="user">Select User</Label>
                  <Select value={newEnrollment.userId} onValueChange={(value) => setNewEnrollment({ ...newEnrollment, userId: value })}>
                    <SelectTrigger id="user">
                      <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAllUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course">Select Course</Label>
                  <Select value={newEnrollment.courseId} onValueChange={(value) => setNewEnrollment({ ...newEnrollment, courseId: value })}>
                    <SelectTrigger id="course">
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockAllCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.title} by {course.instructor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddEnrollmentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!newEnrollment.userId || !newEnrollment.courseId}>
                  Enroll User
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Active Enrollments</CardTitle>
          <CardDescription>Manage student course enrollments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by student or course..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Courses</SelectItem>
                  {mockAllCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Status</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredEnrollments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No enrollments found. Try a different search term or filter.</p>
              </div>
            ) : (
              filteredEnrollments.map((enrollment) => (
                <Card key={enrollment.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt={enrollment.student.name} />
                          <AvatarFallback>{enrollment.student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{enrollment.student.name}</h3>
                          <p className="text-sm text-muted-foreground">{enrollment.student.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{enrollment.course.title}</h4>
                            <p className="text-sm text-muted-foreground">Instructor: {enrollment.course.instructor}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center md:justify-end">
                        <div className="flex flex-col mr-4">
                          <Badge variant={enrollment.status === "Completed" ? "secondary" : "outline"} className="mb-1">
                            {enrollment.status}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            {enrollment.lastActivity}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              View Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              Send Reminder
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer text-destructive" 
                              onClick={() => handleDeleteEnrollment(enrollment.id)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Unenroll
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="text-muted-foreground">
                        Enrolled: {enrollment.enrollmentDate}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">Progress:</span>
                        <div className="bg-muted h-2 w-24 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>
                        <span className="ml-2">{enrollment.progress}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentsManagement;
