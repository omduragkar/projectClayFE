"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  format,
  parseISO,
  isValid,
  differenceInHours,
  differenceInDays,
} from "date-fns";
import { Button } from "../ui/button";

interface TimeOff {
  startDateTime: string;
  endDateTime: string;
}

export default function TimeOffComponent() {
  const [timeOff, setTimeOff] = useState<TimeOff>({
    startDateTime: "",
    endDateTime: "",
  });

  const [timeOffHistory, setTimeOffHistory] = useState<TimeOff[]>([]);

  const [warning, setWarning] = useState<string | null>(null);

  const handleTimeOffChange = (field: keyof TimeOff, value: string) => {
    setTimeOff((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (timeOff.startDateTime && timeOff.endDateTime) {
      const start = parseISO(timeOff.startDateTime);
      const end = parseISO(timeOff.endDateTime);

      if (isValid(start) && isValid(end) && end > start) {
        const days = differenceInDays(end, start);
        const hours = differenceInHours(end, start) % 24;
        setWarning(
          `You are agreeing to remove all slots from ${format(
            start,
            "PPpp"
          )} to ${format(end, "PPpp")} (${days} days and ${hours} hours).`
        );
      } else {
        setWarning(null);
      }
    } else {
      setWarning(null);
    }
  }, [timeOff.startDateTime, timeOff.endDateTime]);

  return (
    <div className="p-6 flex flex-col gap-5 ">
      <div className="p-6 border rounded-xl shadow-lg w-full max-w-md bg-white">
        <h3 className="text-xl font-semibold text-gray-800">📅 Set Time Off</h3>

        <div className="flex flex-col gap-4 mt-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              Start Date & Time:
            </span>
            <Input
              type="datetime-local"
              value={timeOff.startDateTime}
              onChange={(e) =>
                handleTimeOffChange("startDateTime", e.target.value)
              }
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium text-gray-700">
              End Date & Time:
            </span>
            <Input
              type="datetime-local"
              value={timeOff.endDateTime}
              onChange={(e) =>
                handleTimeOffChange("endDateTime", e.target.value)
              }
            />
          </label>
        </div>

        {warning && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>⚠️ Important Notice</AlertTitle>
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        )}
        <Button className="mt-4" disabled={!warning}>
          Set Time Off
        </Button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">
          📅 Time Off History
        </h3>
       {
            timeOffHistory.length === 0 ? (
            <p className="text-gray-500">No time off history</p>
            ) : (
            <ul className="mt-4 space-y-2">
                {timeOffHistory.map((timeOff, index) => (
                <li key={index} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                    <span>
                    {format(parseISO(timeOff.startDateTime), "PPpp")} - {format(parseISO(timeOff.endDateTime), "PPpp")}
                    </span>
                    <Button size="sm" variant="destructive">
                    Remove
                    </Button>
                </li>
                ))}
            </ul>
            )
       }
      </div>
    </div>
  );
}
