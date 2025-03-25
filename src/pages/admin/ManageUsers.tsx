
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, MoreHorizontal, Search, UserPlus, Check, X, UserCheck, UserX, Calendar, Mail, GraduationCap, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "student",
    status: "active",
    enrolledCourses: 3,
    joinDate: "Jan 12, 2023",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    role: "student",
    status: "active",
    enrolledCourses: 2,
    joinDate: "Feb 5, 2023",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    role: "instructor",
    status: "active",
    enrolledCourses: 0,
    joinDate: "Dec 10, 2022",
    lastActive: "5 minutes ago",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "student",
    status: "inactive",
    enrolledCourses: 1,
    joinDate: "Mar 18, 2023",
    lastActive: "2 weeks ago",
  },
];

type User = typeof mockUsers[0];

const ManageUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isViewUserDialogOpen, setIsViewUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !selectedRole || user.role === selectedRole;
    const matchesStatus = !selectedStatus || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would submit the form data to the server
    toast({
      title: "User Added",
      description: "The new user has been added successfully.",
    });
    
    setIsAddUserDialogOpen(false);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewUserDialogOpen(true);
  };

  const handleToggleUserStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "active" ? "inactive" : "active";
        return { ...user, status: newStatus };
      }
      return user;
    }));
    
    const userToUpdate = users.find(user => user.id === userId);
    const newStatus = userToUpdate?.status === "active" ? "inactive" : "active";
    
    toast({
      title: `User ${newStatus === "active" ? "Activated" : "Deactivated"}`,
      description: `${userToUpdate?.name}'s account has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-muted-foreground">
            Manage student and instructor accounts
          </p>
        </div>
        <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter email address" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="instructor">Instructor</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input id="password" type="password" placeholder="Enter temporary password" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add User</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or email..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Roles</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="instructor">Instructor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={undefined}>All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No users found</AlertTitle>
              <AlertDescription>
                Try adjusting your search or filter criteria.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.status === "active" ? "secondary" : "outline"}>
                          {user.status === "active" ? 
                            <Check className="h-3 w-3 mr-1" /> : 
                            <X className="h-3 w-3 mr-1" />
                          }
                          {user.status}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleViewUser(user)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => handleToggleUserStatus(user.id)}>
                              {user.status === "active" ? (
                                <>
                                  <UserX className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined: {user.joinDate}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        Courses: {user.enrolledCourses}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Active: {user.lastActive}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedUser && (
        <Dialog open={isViewUserDialogOpen} onOpenChange={setIsViewUserDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                View detailed information about this user
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg" alt={selectedUser.name} />
                  <AvatarFallback className="text-lg">{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <p>{selectedUser.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p className="font-medium capitalize">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center">
                    <Badge variant={selectedUser.status === "active" ? "secondary" : "outline"}>
                      {selectedUser.status === "active" ? 
                        <Check className="h-3 w-3 mr-1" /> : 
                        <X className="h-3 w-3 mr-1" />
                      }
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Active</p>
                  <p className="font-medium">{selectedUser.lastActive}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  <p className="font-medium">{selectedUser.enrolledCourses}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-muted-foreground">Activity Log</p>
                <div className="text-sm">
                  <div className="bg-muted p-2 rounded">
                    <span className="font-medium">Course completed</span>: Introduction to React (2 days ago)
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsViewUserDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ManageUsers;
