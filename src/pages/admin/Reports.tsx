
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "recharts";
import { GraduationCap, Calendar, Download, Users, Badge, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for charts
const mockCourseCompletionData = [
  { name: "Introduction to React", completed: 85, inProgress: 15 },
  { name: "Advanced JavaScript", completed: 65, inProgress: 35 },
  { name: "UX Design Fundamentals", completed: 45, inProgress: 55 },
  { name: "Data Science with Python", completed: 30, inProgress: 70 },
];

const mockEnrollmentTrendData = [
  { month: "Jan", enrollments: 24 },
  { month: "Feb", enrollments: 18 },
  { month: "Mar", enrollments: 36 },
  { month: "Apr", enrollments: 42 },
  { month: "May", enrollments: 30 },
  { month: "Jun", enrollments: 48 },
];

const mockCategoryDistributionData = [
  { name: "Web Development", value: 45 },
  { name: "Programming", value: 30 },
  { name: "Design", value: 15 },
  { name: "Data Science", value: 10 },
];

const mockTopStudentsData = [
  { id: 1, name: "John Smith", coursesCompleted: 5, averageScore: 92 },
  { id: 2, name: "Emily Johnson", coursesCompleted: 4, averageScore: 95 },
  { id: 3, name: "Michael Brown", coursesCompleted: 3, averageScore: 88 },
  { id: 4, name: "Sarah Davis", coursesCompleted: 3, averageScore: 91 },
  { id: 5, name: "David Wilson", coursesCompleted: 2, averageScore: 94 },
];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("course-completion");
  const [timeRange, setTimeRange] = useState("last-6-months");
  const { toast } = useToast();

  const handleDownloadReport = (reportType: string) => {
    toast({
      title: "Report Downloaded",
      description: `${reportType} report has been downloaded as CSV.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Analytics and insights about your learning platform
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => handleDownloadReport("Current")}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="course-completion">Course Completion</TabsTrigger>
          <TabsTrigger value="enrollment-trends">Enrollment Trends</TabsTrigger>
          <TabsTrigger value="category-distribution">Categories</TabsTrigger>
          <TabsTrigger value="student-performance">Student Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="course-completion" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Rates</CardTitle>
              <CardDescription>
                Percentage of students who completed each course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="flex justify-center items-center h-full bg-muted/20 rounded-md">
                  <div className="text-center p-6">
                    <GraduationCap className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Bar chart visualization would appear here showing course completion rates</p>
                    <p className="text-sm text-muted-foreground mt-2">Data shows "Introduction to React" with the highest completion rate at 85%</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Completion Details</h3>
                <div className="space-y-2">
                  {mockCourseCompletionData.map((course) => (
                    <div key={course.name} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{course.name}</p>
                        <div className="w-full bg-muted h-2 rounded-full mt-1">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${course.completed}%` }}
                          />
                        </div>
                      </div>
                      <span className="ml-4 font-medium">{course.completed}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="enrollment-trends" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trends</CardTitle>
              <CardDescription>
                Monthly course enrollment statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="flex justify-center items-center h-full bg-muted/20 rounded-md">
                  <div className="text-center p-6">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Line chart visualization would appear here showing enrollment trends over time</p>
                    <p className="text-sm text-muted-foreground mt-2">Data shows peak enrollments in June with 48 new students</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">198</h3>
                      <p className="text-sm text-muted-foreground">Total Enrollments</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">33</h3>
                      <p className="text-sm text-muted-foreground">Monthly Average</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">+12.5%</h3>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="category-distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Category Distribution</CardTitle>
              <CardDescription>
                Breakdown of courses by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <div className="flex justify-center items-center h-full bg-muted/20 rounded-md">
                  <div className="text-center p-6">
                    <Badge className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Pie chart visualization would appear here showing distribution of course categories</p>
                    <p className="text-sm text-muted-foreground mt-2">Web Development is the most popular category at 45%</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="font-semibold">Categories Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  {mockCategoryDistributionData.map((category) => (
                    <div key={category.name} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-primary`} />
                      <span>{category.name}</span>
                      <span className="font-medium">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="student-performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
              <CardDescription>
                Students with the highest course completion and scores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-4">Student</th>
                      <th className="text-left pb-4">Courses Completed</th>
                      <th className="text-left pb-4">Average Score</th>
                      <th className="text-left pb-4">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTopStudentsData.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="py-4">{student.name}</td>
                        <td className="py-4">{student.coursesCompleted}</td>
                        <td className="py-4">{student.averageScore}%</td>
                        <td className="py-4">
                          <div className="w-full bg-muted h-2 rounded-full">
                            <div 
                              className="bg-primary h-full rounded-full" 
                              style={{ width: `${student.averageScore}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full" onClick={() => handleDownloadReport("Student Performance")}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
