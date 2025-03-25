
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Check, Download, FileText, MessageSquare, Play, Video } from "lucide-react";

// Mock course data
const mockCourseDetail = {
  id: 1,
  title: "Introduction to React",
  instructor: "John Smith",
  instructorTitle: "Senior Frontend Developer",
  description: "Learn the fundamentals of React, including components, state, and props. This comprehensive course will take you from beginner to proficient in React development.",
  duration: "6 hours",
  level: "Beginner",
  category: "Web Development",
  enrolled: true,
  progress: 75,
  rating: 4.8,
  students: 1245,
  lastUpdated: "March 2023",
  lectures: [
    { id: 1, title: "Introduction to React", duration: "10:30", completed: true },
    { id: 2, title: "Setting Up Your Environment", duration: "15:45", completed: true },
    { id: 3, title: "Components and Props", duration: "20:15", completed: true },
    { id: 4, title: "State and Lifecycle", duration: "25:10", completed: false },
    { id: 5, title: "Handling Events", duration: "18:30", completed: false },
    { id: 6, title: "Conditional Rendering", duration: "22:15", completed: false },
    { id: 7, title: "Lists and Keys", duration: "17:45", completed: false },
    { id: 8, title: "Forms", duration: "23:20", completed: false },
    { id: 9, title: "React Router", duration: "28:15", completed: false },
    { id: 10, title: "Hooks Overview", duration: "30:00", completed: false },
  ],
  resources: [
    { id: 1, title: "React Cheat Sheet", type: "PDF", size: "1.2 MB" },
    { id: 2, title: "Project Starter Files", type: "ZIP", size: "4.5 MB" },
    { id: 3, title: "Component Reference Guide", type: "PDF", size: "2.8 MB" },
  ],
  comments: [
    { id: 1, user: "Alex Johnson", avatar: "", content: "Great course! The explanations are clear and concise.", date: "2 weeks ago" },
    { id: 2, user: "Maria Garcia", avatar: "", content: "I was struggling with React concepts, but this course made everything click.", date: "1 month ago" },
  ]
};

const CourseDetailPage = () => {
  const { id } = useParams();
  const [course] = useState(mockCourseDetail);
  const [activeTab, setActiveTab] = useState("content");
  const [comment, setComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    setComment("");
    // In a real app, you would submit the comment to the server
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <h1 className="text-3xl font-bold tracking-tight mr-2">{course.title}</h1>
              <Badge variant="outline">{course.level}</Badge>
            </div>
            <p className="text-muted-foreground mb-4">{course.description}</p>
            
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt={course.instructor} />
                <AvatarFallback>{course.instructor[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{course.instructor}</p>
                <p className="text-sm text-muted-foreground">{course.instructorTitle}</p>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Lectures</CardTitle>
                  <CardDescription>
                    {course.lectures.length} lectures • Total {course.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {course.lectures.map((lecture) => (
                        <div key={lecture.id} className="flex items-start hover:bg-muted/30 p-2 rounded-md transition-colors">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                            {lecture.completed ? <Check className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className={`font-medium ${lecture.completed ? "text-muted-foreground line-through" : ""}`}>
                                  {lecture.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  <Video className="inline h-3 w-3 mr-1" /> {lecture.duration}
                                </p>
                              </div>
                              {!lecture.completed && (
                                <Button size="sm" variant="secondary">
                                  Play
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Downloadable Resources</CardTitle>
                  <CardDescription>
                    {course.resources.length} supplementary materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.resources.map((resource) => (
                      <div key={resource.id} className="flex items-center justify-between hover:bg-muted/30 p-2 rounded-md transition-colors">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {resource.type} • {resource.size}
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussion" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Discussion</CardTitle>
                  <CardDescription>
                    Join the conversation about this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                      <textarea 
                        className="w-full p-3 rounded-md border border-input bg-background resize-none min-h-[100px]"
                        placeholder="Add your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <Button type="submit" disabled={!comment.trim()}>
                        <MessageSquare className="h-4 w-4 mr-2" /> Post Comment
                      </Button>
                    </form>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      {course.comments.map((comment) => (
                        <div key={comment.id} className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.user} />
                              <AvatarFallback>{comment.user[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{comment.user}</p>
                              <p className="text-xs text-muted-foreground">{comment.date}</p>
                            </div>
                          </div>
                          <p className="text-sm pl-10">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                Continue where you left off
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Overall Progress</span>
                  <span className="text-sm font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Next Lecture</p>
                <p className="font-medium">State and Lifecycle</p>
                <Button className="w-full mt-2">
                  <Play className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Duration</p>
                  <p>{course.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Level</p>
                  <p>{course.level}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Students</p>
                  <p>{course.students.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Update</p>
                  <p>{course.lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
