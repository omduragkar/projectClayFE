import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface PastSessionsTableProps {
  sessions: {
    id: number;
    user: string;
    type: string;
    date: string;
    time: string;
    status: "completed" | "missed" | "pending";
  }[];
}

export const handleSessionClick = (
  router: AppRouterInstance,
  sessionId: string
) => {
  router.push(`/mentor/sessions/${sessionId}`);
};

const PastSessionsTable: React.FC<PastSessionsTableProps> = ({ sessions }) => {
  const router = useRouter();

  return (
    <div className="p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>{session.user}</TableCell>
              <TableCell>{session.type}</TableCell>
              <TableCell>{session.date}</TableCell>
              <TableCell>{session.time}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-sm rounded-md ${
                    session.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : session.status === "missed"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {session.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSessionClick(router, session?.id)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PastSessionsTable;
