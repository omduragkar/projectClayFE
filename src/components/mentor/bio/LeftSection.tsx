import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function LeftSection({mentorId}: {mentorId: string}) {
  return (
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
  );
}

export default LeftSection;
