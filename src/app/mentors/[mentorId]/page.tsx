import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LeftSection from "@/components/mentor/bio/LeftSection";
import RightSection from "@/components/mentor/bio/RightSection";
import BioFooter from "@/components/mentor/bio/BioFooter";

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
      <LeftSection mentorId={mentorId} />
      {/* Right Section */}
      <RightSection />
      <BioFooter />
      <div className="h-24"></div>
    </div>
  );
}
