import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function getProjects() {
  const res = await fetch(`https://api.github.com/users/omduragkar/repos`);
  const projects = await res.json();

  return projects;
}

export default async function MentorProfile({
  params,
}: {
  params: Promise<{ mentorId: string }>;
}) {
  const { mentorId } = await params;
  const projects = await getProjects();
  console.log(projects);
  return (
    <div className="container mx-auto p-6 grid grid-cols-12 gap-6">
      {/* Left Section */}
      <div className="col-span-8 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Bio {mentorId}</h2>
            <p>Education & Experience details...</p>
            <div className="mt-4">
              {/* Carousel Placeholder */}
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                Carousel / Reviews
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            {/* YouTube Video Placeholder */}
            <div className="w-full h-60 bg-gray-200 flex items-center justify-center">
              YouTube Video
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            {/* Blog / Q&A Forum Placeholder */}
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
              Blog Level QnA Forum
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section */}
      <div className="col-span-4 space-y-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              Photo
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="font-semibold">Name</p>
            <p>College</p>
            <p>Major</p>
            <p>Year</p>
            <p>Passion</p>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-12 fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md px-24">
        <div className="flex items-center justify-end">
          <Button>Book a Session</Button>
        </div>
      </div>
      <div className="h-24"></div>
    </div>
  );
}
