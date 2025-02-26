"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { MENTOR_SIGNUP, mentorFormSchema } from "@/constants";
import FieldForm from "../common/FieldForm";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function MentorSignUpForm() {
  const link = useRouter();
  const form = useForm<z.infer<typeof mentorFormSchema>>({
    resolver: zodResolver(mentorFormSchema),
    defaultValues: {
      name: "",
      currentCountry: "",
      bio: "",
    },
  });
  const register = form.register;
  const onsubmit = (data: z.infer<typeof mentorFormSchema>) => {
    console.log(data);
  };

  const onClick = () => {
    link.push("/mentor/data/waiting");
  };

  return (
    <div className="container mx-auto p-4 py-8">
      <Form {...form}>
        <p className="text-2xl font-semibold py-5">{MENTOR_SIGNUP.title}</p>
        <p className="text-gray-500 py-2">{MENTOR_SIGNUP.description}</p>
        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
          {Object.entries(MENTOR_SIGNUP.form.fields).map(
            ([fieldName, field]) => (
              <FieldForm
                key={fieldName}
                fieldName={fieldName}
                field={field}
                register={register}
              />
            )
          )}
        </form>
      </Form>
      <div className="flex  justify-end items-end">
        <Button className="my-4" onClick={onClick}>
          <p className="text-md font-bold">Become a Mentor</p>
          <ArrowRight size={24} />
        </Button>
      </div>
    </div>
  );
}

export default MentorSignUpForm;
