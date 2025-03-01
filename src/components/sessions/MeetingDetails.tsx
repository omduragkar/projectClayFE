"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RescheduleForm from "./RescheduleForm";

const MeetingDetails = ({ date, time, meetingCode }) => {
  const [showReschedule, setShowReschedule] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>📅 <b>Date:</b> {date}</p>
        <p>⏰ <b>Time:</b> {time}</p>
        <p>🔑 <b>Meeting Code:</b> <span className="text-blue-500">{meetingCode}</span></p>
        <button onClick={() => setShowReschedule(true)} className="mt-4 bg-black text-white px-4 py-2 rounded">
          Reschedule
        </button>
        {showReschedule && <RescheduleForm
         onClose={() => setShowReschedule(false)} />}
      </CardContent>
    </Card>
  );
};

export default MeetingDetails;
