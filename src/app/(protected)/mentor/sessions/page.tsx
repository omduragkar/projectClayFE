"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import SessionCard from "@/components/sessions/Sessioncard";
import PastSessionsTable from "@/components/sessions/SessionTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample Data
const upcomingSessions = [
  {
    id: 1,
    user: "John Doe",
    type: "Mentoring",
    date: "2025-03-05",
    time: "10:00 AM",
  },
  {
    id: 2,
    user: "Jane Smith",
    type: "Exploration Project",
    date: "2025-03-05",
    time: "2:00 PM",
  },
  {
    id: 3,
    user: "Alice Johnson",
    type: "Mentoring",
    date: "2025-03-06",
    time: "11:30 AM",
  },
];

const pastSessions = [
  {
    id: 4,
    user: "Bob Martin",
    type: "Exploration Project",
    date: "2025-02-28",
    time: "4:00 PM",
    status: "completed",
  },
  {
    id: 5,
    user: "Emily Davis",
    type: "Mentoring",
    date: "2025-02-25",
    time: "3:00 PM",
    status: "missed",
  },
  {
    id: 6,
    user: "Michael Scott",
    type: "Exploration Project",
    date: "2025-02-20",
    time: "1:00 PM",
    status: "pending",
  },
  {
    id: 7,
    user: "Dwight Schrute",
    type: "Mentoring",
    date: "2025-02-18",
    time: "5:30 PM",
    status: "completed",
  },
];

function MentorSessions() {
  const [showAllPast, setShowAllPast] = useState(false);

  return (
    <ScrollArea className="p-4 w-full pb-10">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="border rounded-lg mb-4">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="p-4 pb-12 h-full">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Upcoming Sessions</h1>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-5 w-5" /> View in Calendar
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {upcomingSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="past" className="p-4 pb-12  h-full">
          <div>
            <div className="flex justify-start items-center gap-4 py-4">
              {showAllPast && (
                <ArrowLeft
                  className="cursor-pointer"
                  onClick={() => {
                    setShowAllPast(false);
                  }}
                />
              )}
              <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold">Past Sessions</h1>
                {!showAllPast && (
                  <Button className="mt-4" onClick={() => setShowAllPast(true)}>
                    View All
                  </Button>
                )}
              </div>
            </div>

            {!showAllPast ? (
              <>
                {/* Show only top 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {pastSessions.slice(0, 3).map((session) => (
                    <SessionCard key={session.id} session={session} isPast />
                  ))}
                </div>
              </>
            ) : (
              <PastSessionsTable sessions={pastSessions} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </ScrollArea>
  );
}

export default MentorSessions;
