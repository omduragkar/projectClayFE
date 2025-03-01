"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface TimeSlot {
  from: string;
  to: string;
}

interface DayAvailability {
  day: string;
  value: string;
  slots: TimeSlot[];
  isHoliday: boolean;
}

// Weekday list
const daysOfWeek = [
  { day: "Sunday", value: "sunday" },
  { day: "Monday", value: "monday" },
  { day: "Tuesday", value: "tuesday" },
  { day: "Wednesday", value: "wednesday" },
  { day: "Thursday", value: "thursday" },
  { day: "Friday", value: "friday" },
  { day: "Saturday", value: "saturday" },
];

export default function MentorAvailability() {
  const [availability, setAvailability] = useState<DayAvailability[]>(
    daysOfWeek.map(({ day, value }) => ({
      day,
      value,
      slots: [],
      isHoliday: false,
    }))
  );

  const [inputTimes, setInputTimes] = useState<{
    [key: string]: { from: string; to: string };
  }>(
    daysOfWeek.reduce((acc, day) => {
      acc[day.value] = { from: "", to: "" };
      return acc;
    }, {} as { [key: string]: { from: string; to: string } })
  );

  // Function to convert time string to minutes for validation
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Helper: Check if a new slot overlaps with existing slots
  const isOverlapping = (dayValue: string, newFrom: string, newTo: string) => {
    const day = availability.find((d) => d.value === dayValue);
    if (!day) return false;

    return day.slots.some((slot) => {
      return (
        (newFrom >= slot.from && newFrom < slot.to) || // New slot starts inside an existing slot
        (newTo > slot.from && newTo <= slot.to) || // New slot ends inside an existing slot
        (newFrom <= slot.from && newTo >= slot.to) // New slot fully covers an existing slot
      );
    });
  };

  // Function: Add a new slot
  const addSlot = (dayValue: string) => {
    const { from, to } = inputTimes[dayValue];
    if (!from || !to) return;

    const fromMinutes = timeToMinutes(from);
    const toMinutes = timeToMinutes(to);

    if (from >= to) {
      alert("End time must be after start time.");
      return;
    }

    if (toMinutes - fromMinutes < 120) {
      // Ensure at least 2 hours (120 minutes)
      alert("Time slot must be at least 2 hours.");
      return;
    }

    if (isOverlapping(dayValue, from, to)) {
      alert("Time slot overlaps with an existing one.");
      return;
    }

    setAvailability((prev) =>
      prev.map((day) =>
        day.value === dayValue
          ? {
              ...day,
              slots: [...day.slots, { from, to }].sort((a, b) =>
                a.from > b.from ? 1 : -1
              ),
            }
          : day
      )
    );

    // Reset input field for the specific day
    setInputTimes((prev) => ({
      ...prev,
      [dayValue]: { from: "", to: "" },
    }));
  };

  // Function: Remove a slot
  const removeSlot = (dayValue: string, index: number) => {
    setAvailability((prev) =>
      prev.map((day) =>
        day.value === dayValue
          ? { ...day, slots: day.slots.filter((_, i) => i !== index) }
          : day
      )
    );
  };

  // Function: Mark entire day as holiday
  const toggleHoliday = (dayValue: string) => {
    setAvailability((prev) =>
      prev.map((day) =>
        day.value === dayValue
          ? { ...day, isHoliday: !day.isHoliday, slots: [] }
          : day
      )
    );
  };

  return (
    <div className="p-4 border rounded-lg w-full">
      <h2 className="text-lg font-semibold mb-4">Availability Status</h2>
      <div className="flex flex-wrap gap-4 justify-around flex-col items-start md:flex-row md:items-start">
        {availability.map((day) => (
          <div key={day.value} className="mb-6 border-b pb-4 w-full lg:w-1/3">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">{day.day}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm">Holiday</span>
                <Switch
                  checked={day.isHoliday}
                  onCheckedChange={() => toggleHoliday(day.value)}
                />
              </div>
            </div>

            {day.isHoliday ? (
              <p className="text-red-500 text-sm mt-2">Marked as a holiday</p>
            ) : (
              <div className="mt-3">
                {/* Time Slot Inputs */}
                <div className="flex flex-wrap gap-2 items-center">
                  <Input
                    type="time"
                    value={inputTimes[day.value].from}
                    className="w-28"
                    onChange={(e) =>
                      setInputTimes((prev) => ({
                        ...prev,
                        [day.value]: {
                          ...prev[day.value],
                          from: e.target.value,
                        },
                      }))
                    }
                  />
                  <span>to</span>
                  <Input
                    type="time"
                    value={inputTimes[day.value].to}
                    className="w-28"
                    onChange={(e) =>
                      setInputTimes((prev) => ({
                        ...prev,
                        [day.value]: { ...prev[day.value], to: e.target.value },
                      }))
                    }
                  />
                  <Button onClick={() => addSlot(day.value)}>Add Slot</Button>
                </div>

                {/* Display Slots */}
                <ul className="mt-3 space-y-2">
                  {day.slots.map((slot, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-100 rounded"
                    >
                      <span>
                        {slot.from} - {slot.to}
                      </span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeSlot(day.value, index)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
