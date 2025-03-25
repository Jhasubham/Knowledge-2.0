
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Clock, Edit, MoreHorizontal, Plus, Search, Trash, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock courses data
const mockCourses = [
  {
    id: 1,
    title: "Introduction to React",
    instructor: "John Smith",
    description: "Learn the fundamentals of React, including components, state, and props.",
    duration: "6 hours",
    level: "Beginner",
    category: "Web Development",
    status: "Published",
    students: 245,
    created: "Jan 15, 2023",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    instructor: "Sarah Johnson",
    description: "Deep dive into JavaScript concepts like closures, promises, and ES6+ features.",
    duration: "8 hours",
    level: "Intermediate",
    category: "Programming",
    status: "Published",
    students: 189,
    created: "Feb 3, 2023",
  },
  {
    id: 3,
    title: "UX Design Fundamentals",
    instructor: "Michael Chen",
    description: "Learn user experience design principles and practices for creating intuitive interfaces.",
    duration: "5 hours",
    level: "Beginner",
    category: "Design",
    status: "Draft",
    students: 0,
    created: "Mar 10, 2023",
  },
];

const ManageCourses = () => {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || course.category === selectedCategory;
    const matchesStatus = !selectedStatus || course.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would submit the form data to the server
    toast({
      title: "Course Created",
      description: "The new course has been created successfully.",
    });
    
    setIsAddDialogOpen(false);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    
    toast({
      title: "Course Deleted",
      description: "The course has been deleted successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage your educational content
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Fill in the details below to create a new course
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCourse}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" placeholder="Enter course title" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter course description" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Web Development">Web Development</SelectItem>
                        <SelectItem value="Programming">Programming</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="level">Level</Label>
                    <Select>
                      <SelectTrigger id="level">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <Input id="duration" type="number" min="1" placeholder="Enter duration in hours" required />
                </div>
                <div className="grid gap-2">
                  <Label>Course Content</Label>
                  <Button type="button" variant="outline" className="w-full h-32 border-dashed">
                    <Upload className="h-5 w-5 mr-2" />
                    Click to upload course materials
                  </Button>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Courses</CardTitle>
          <CardDescription>Manage your existing courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search courses..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Programming">Programming</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Status</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No courses found. Try a different search term or filter.</p>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <Card key={course.id} className="card-hover">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center">
                          {course.title}
                          <Badge variant={course.status === "Published" ? "secondary" : "outline"} className="ml-2">
                            {course.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{course.instructor}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-destructive" onClick={() => handleDeleteCourse(course.id)}>
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" /> {course.duration}
                      </div>
                      <div className="text-muted-foreground">•</div>
                      <div className="text-muted-foreground">{course.level}</div>
                      <div className="text-muted-foreground">•</div>
                      <div className="text-muted-foreground">{course.category}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex justify-between items-center w-full">
                      <div className="text-sm text-muted-foreground">
                        Created: {course.created}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Students: {course.students}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCourses;
