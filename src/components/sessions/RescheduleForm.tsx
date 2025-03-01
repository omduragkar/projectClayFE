"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RescheduleForm = ({ onClose }) => {
  const [newDate, setNewDate] = useState("");

  const handleReschedule = () => {
    alert(`Session rescheduled to ${newDate}`);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
        </DialogHeader>
        <Input type="datetime-local" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        <Button onClick={handleReschedule} className="mt-2">Confirm</Button>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleForm;
