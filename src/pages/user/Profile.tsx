
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/App";
import { useToast } from "@/hooks/use-toast";

const UserProfilePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  
  // State for form fields
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "Learning enthusiast passionate about web development and design.",
    location: "San Francisco, CA",
    website: "https://example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    newCourses: true,
    promotions: false,
    accountAlerts: true,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    
    setProfileData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleSubmitNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and public profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProfile} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" alt={user?.name} />
                      <AvatarFallback className="text-2xl">{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Change Photo</Button>
                  </div>
                  
                  <div className="grid gap-4 flex-1">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={profileData.name}
                        onChange={handleProfileChange}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={profileData.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio"
                      name="bio"
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={profileData.bio}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Brief description for your profile. Maximum 200 characters.
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={profileData.location}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website" 
                      type="url"
                      value={profileData.website}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Update your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitPassword} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword" 
                      name="currentPassword" 
                      type="password"
                      value={profileData.currentPassword}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword" 
                      type="password"
                      value={profileData.newPassword}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by requiring a verification code.
                  </p>
                  <Button variant="outline">Setup Two-Factor Auth</Button>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Control which notifications you receive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitNotifications} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="courseUpdates">Course Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when a course you're enrolled in is updated
                      </p>
                    </div>
                    <Switch 
                      id="courseUpdates"
                      checked={notifications.courseUpdates}
                      onCheckedChange={() => handleNotificationChange("courseUpdates")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newCourses">New Courses</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new course releases
                      </p>
                    </div>
                    <Switch 
                      id="newCourses"
                      checked={notifications.newCourses}
                      onCheckedChange={() => handleNotificationChange("newCourses")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="promotions">Promotions</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about deals and promotions
                      </p>
                    </div>
                    <Switch 
                      id="promotions"
                      checked={notifications.promotions}
                      onCheckedChange={() => handleNotificationChange("promotions")}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="accountAlerts">Account Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get important notifications about your account
                      </p>
                    </div>
                    <Switch 
                      id="accountAlerts"
                      checked={notifications.accountAlerts}
                      onCheckedChange={() => handleNotificationChange("accountAlerts")}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Preferences</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfilePage;
