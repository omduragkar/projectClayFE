"use client";
import React, { ReactNode, useState } from "react";
import FieldMapper from "@/components/common/FieldMapper";
import { Button } from "@/components/ui/button";

function FieldForm({
  fieldName,
  field,
  register,
}: {
  fieldName: string;
  field: any;
  register: any;
}) {
  const [formArray, setFormArray] = useState([]);
  return (
    <div className="space-y-2 p-2" key={fieldName}>
      <div className="flex w-100 item text-md font-semibold">
        <p className="text-md font-semibold flex-1">{field.label}</p>
        {field?.type === "array" && (
          <Button
            type="button"
            onClick={() => setFormArray([...formArray, {}])}
          >
            Add
          </Button>
        )}
      </div>
      <FieldMapper
        fieldName={fieldName}
        field={field}
        register={register}
        formArray={formArray}
        setFormArray={setFormArray}
      />
    </div>
  );
}

export default FieldForm;

interface AuthButtonProps {
  children: ReactNode;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ children }) => {
  return (
    <Button
      variant={"outline"}
      onClick={() => (window.location.href = "/auth")}
    >
      {children}
    </Button>
  );
};
