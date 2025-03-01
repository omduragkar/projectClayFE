"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const FeedbackForm = ({ sessionCompleted }) => {
  const [feedback, setFeedback] = useState("");

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Session Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {sessionCompleted ? (
          <>
            <Textarea placeholder="Write your feedback..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
            <Button className="mt-2">Submit</Button>
          </>
        ) : (
          <p>🔒 Feedback will be unlocked after the session.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
