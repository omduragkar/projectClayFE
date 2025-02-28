import { Card, CardContent } from "@/components/ui/card";
import React from "react";

function RightSection() {
  return (
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
  );
}

export default RightSection;
