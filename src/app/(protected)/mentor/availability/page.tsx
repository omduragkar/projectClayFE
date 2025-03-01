import CalendarAvailability from "@/components/availability/Calendar";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import MentorAvailability from "@/components/availability/TimeOff";

function page() {
  return (
    <ScrollArea className="p-4 w-full">
      <Tabs defaultValue="availability" className="w-full">
        <TabsList className="border rounded-lg mb-4">
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="Time off">Time off</TabsTrigger>
        </TabsList>
        <TabsContent value="availability">
          <CalendarAvailability />
        </TabsContent>
        <TabsContent value="Time off">
          <MentorAvailability />
        </TabsContent>
      </Tabs>
    </ScrollArea>
  );
}

export default page;
