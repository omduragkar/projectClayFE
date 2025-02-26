import React, { useState } from "react";
import FieldMapper from "./FieldMapper";
import { Button } from "../ui/button";

function FieldForm({ fieldName, field, register }) {
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
