"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

function FieldMapper({
  fieldName,
  field,
  formArray,
  setFormArray,
  register,
}: {
  fieldName: string;
  field: any;
  register: any;
  formArray?: any[];
  setFormArray?: any;
}) {
  // Text
  if (field.type === "text") {
    return (
      <Input
        type="text"
        placeholder={field.placeholder}
        {...register(fieldName)}
        required={field.required}
      />
    );
  }

  // Select
  if (field.type === "select") {
    return (
      <Select>
        <SelectTrigger className="p-2 border border-gray-300 rounded-md">
          <SelectValue placeholder={field?.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {field?.typeValues?.map((option: any, index: number) => (
            <SelectItem
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // Textarea
  if (field.type === "textarea") {
    return (
      <Textarea
        placeholder={field.placeholder}
        {...register(fieldName)}
        required={field.required}
      />
    );
  }

  // Array (simple example)

  if (field.type === "array") {
    return (
      <div className="space-y-2">
        {formArray?.map((arrayData, index) => {
          return (
            <Card key={index} className="p-4">
              {field.typeValues.map((fieldValue, fieldIndex) => {
                return (
                  <div key={fieldIndex} className="space-y-2">
                    {fieldValue?.label && (
                      <p className="text-md font-semibold">
                        {fieldValue.label}
                      </p>
                    )}
                    <FieldMapper
                      fieldName={`${fieldName}.${index}.${fieldValue.key}`}
                      field={fieldValue}
                      register={register}
                    />
                  </div>
                );
              })}
            </Card>
          );
        })}
      </div>
    );
  }

  return <div>Unsupported field type: {field.type}</div>;
}

export default FieldMapper;
