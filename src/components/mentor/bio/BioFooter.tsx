import { Button } from "@/components/ui/button";
import React from "react";

function BioFooter() {
  return (
    <div className="col-span-12 fixed bottom-0 left-0 right-0 p-4 bg-white shadow-md px-24">
      <div className="flex items-center justify-end">
        <Button>Book a Session</Button>
      </div>
    </div>
  );
}

export default BioFooter;
