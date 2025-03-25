
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock certificates data
const mockCertificates = [
  {
    id: 1,
    courseName: "Introduction to React",
    instructor: "John Smith",
    issueDate: "March 15, 2023",
    validUntil: "No expiration",
  },
];

const CertificatesPage = () => {
  const [certificates] = useState(mockCertificates);
  const { toast } = useToast();

  const handleDownload = (id: number) => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  const handleShare = (id: number) => {
    toast({
      title: "Certificate Shared",
      description: "A shareable link has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
        <p className="text-muted-foreground">
          View and download your course completion certificates
        </p>
      </div>

      {certificates.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full p-4 bg-primary/10">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-lg font-medium">No Certificates Yet</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Complete a course to earn your first certificate. Certificates demonstrate your commitment to learning and can be shared with employers.
              </p>
              <Button variant="outline" className="mt-2">Browse Courses</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden card-hover">
              <CardHeader className="pb-2 relative">
                <div className="absolute top-4 right-4 text-primary">
                  <Award className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{certificate.courseName}</CardTitle>
                <CardDescription>{certificate.instructor}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Issue Date: {certificate.issueDate}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2" />
                    <span>Valid Until: {certificate.validUntil}</span>
                  </div>
                </div>
              </CardContent>
              <div className="p-4 bg-certificate-pattern bg-cover bg-center h-40 flex items-center justify-center mx-4 my-2 border rounded-md">
                <div className="text-center">
                  <h3 className="font-serif text-lg font-bold">Certificate of Completion</h3>
                  <p className="text-sm font-medium mt-1">awarded to</p>
                  <p className="font-serif text-base font-bold mt-1">John Doe</p>
                  <p className="text-xs mt-2">for successfully completing the course</p>
                </div>
              </div>
              <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="w-full sm:flex-1"
                  onClick={() => handleShare(certificate.id)}
                >
                  Share
                </Button>
                <Button 
                  className="w-full sm:flex-1"
                  onClick={() => handleDownload(certificate.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesPage;
