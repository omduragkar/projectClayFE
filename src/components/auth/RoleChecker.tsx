import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { RoleEnum } from "@/constants/enum/role";

function RoleChecker({
  userType,
  setUserType,
}: {
  userType: RoleEnum;
  setUserType: Dispatch<SetStateAction<RoleEnum>>;
}) {
  return (
    <div className="flex flex-col gap-3">
      {Object.values(RoleEnum).filter(
        role => role !== RoleEnum.ADMIN
      ).map((role) => (
        <Button
          key={role}
          variant={userType === role ? "secondary" : "outline"}
          onClick={() => setUserType(role as RoleEnum)}
          className="w-full"
        >
          {role[0] + role.slice(1).toLowerCase()}
        </Button>
      ))}
    </div>
  );
}

export default RoleChecker;
