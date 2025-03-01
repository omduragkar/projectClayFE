"use client";
import MeetingDetails from "@/components/sessions/MeetingDetails";
import FeedbackForm from "@/components/sessions/SessionFeedbackForm";
import SessionRecording from "@/components/sessions/SessionRecording";
import UserProfile from "@/components/sessions/UserProfileCard";
import { useState } from "react";


const SessionDetails = () => {
  const [sessionCompleted, setSessionCompleted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Session Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UserProfile name="John Doe" email="john.doe@example.com" linkedin="https://linkedin.com/in/johndoe" />
        <MeetingDetails 
          date="March 2, 2025" 
          time="3:00 PM IST" 
          meetingCode="ABCD1234"
        />
      </div>

      <FeedbackForm sessionCompleted={sessionCompleted} />
      <SessionRecording amount="₹1500" recordingLink="/recording.mp4" />
    </div>
  );
};

export default SessionDetails;
