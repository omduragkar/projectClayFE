import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

function RoleChecker({
  userType,
  setUserType,
}: {
  userType: "STUDENT" | "MENTOR" | "PARENT";
  setUserType: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col gap-3">
      {["STUDENT", "MENTOR", "PARENT"].map((role) => (
        <Button
          key={role}
          variant={userType === role ? "default" : "outline"}
          onClick={() => setUserType(role as "STUDENT" | "MENTOR" | "PARENT")}
          className="w-full"
        >
          {
            role[0] + role.slice(1).toLowerCase()
          }
        </Button>
      ))}
    </div>
  );
}

export default RoleChecker;
