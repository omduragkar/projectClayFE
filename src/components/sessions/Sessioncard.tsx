import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleSessionClick } from "./SessionTable";

interface SessionProps {
  session: {
    id: number;
    user: string;
    type: string;
    date: string;
    time: string;
    status?: "completed" | "missed" | "pending"; // Only for past sessions
  };
  isPast?: boolean;
}

const SessionCard: React.FC<SessionProps> = ({ session, isPast }) => {
  const router = useRouter();
  const statusIcon =
    session.status === "completed" ? (
      <CheckCircle className="text-green-500 w-5 h-5" />
    ) : session.status === "missed" ? (
      <XCircle className="text-red-500 w-5 h-5" />
    ) : (
      <AlertTriangle className="text-yellow-500 w-5 h-5" />
    );

  return (
    <Card
      key={session.id}
      className="shadow-lg hover:shadow-xl transition p-4 cursor-pointer"
      onClick={() => handleSessionClick(router, session.id)}
    >
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{session.user}</CardTitle>
        {isPast && statusIcon} {/* Show status icon only for past sessions */}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{session.type} Session</p>
        <p className="text-gray-500">{session.time}</p>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
