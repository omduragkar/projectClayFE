export const COUNTRIES: ICountry[] = [
  {
    name: "India",
    code: "IN",
    callCode: "+91",
  },
  {
    name: "Nepal",
    code: "NP",
    callCode: "+977",
  },
  {
    name: "United Kingdom",
    callCode: "+44",
    code: "GB",
  },
  {
    name: "United States",
    callCode: "+1",
    code: "US",
  },
  {
    name: "Afghanistan",
    code: "AF",
    callCode: "+93",
  },
  {
    name: "Bangladesh",
    code: "BD",
    callCode: "+880",
  },
  {
    name: "Pakistan",
    callCode: "+92",
    code: "PK",
  },
];

export type ICountry = { callCode: string; code: string; name: string };

import { z } from "zod";

export const mentorFormSchema = z.object({
  name: z.string().min(2).max(100),
  currentCountry: z.string().min(2).max(100),
  bio: z.string().min(100).max(1000),
  education: z.array(
    z.object({
      university: z.string().min(2).max(100),
      degree: z.string().min(2).max(100),
      major: z.string().min(2).max(100),
      fromYear: z.string().min(4).max(4),
      toYear: z.string().min(4).max(4),
    })
  ),
  experience: z.array(
    z.object({
      company: z.string().min(2).max(100),
      position: z.string().min(2).max(100),
      fromYear: z.string().min(4).max(4),
      toYear: z.string().min(4).max(4),
    })
  ),
  linkedin: z.string().min(2).max(100),
  ytVideo: z.string().min(2).max(100),
  extraCurricular: z.array(z.string().min(2).max(100)),
});

export const MENTOR_SIGNUP = {
  title: "Mentor Signup",
  description: "Sign up to become a mentor",
  form: {
    fields: {
      name: {
        label: "Name",
        type: "text",
        placeholder: "John Doe",
        required: true,
        key: "name",
      },
      currentCountry: {
        label: "Current Country",
        type: "select",
        placeholder: "India",
        required: true,
        typeValues: COUNTRIES.map((country) => ({
          label: country?.name,
          value: country?.name,
        })),
        key: "currentCountry",
      },
      bio: {
        label: "Bio",
        type: "textarea",
        placeholder: "Tell us about yourself",
        required: true,
        validation: {
          minLength: 100,
          maxLength: 1000,
        },
        key: "bio",
      },
      education: {
        label: "Add Education",
        type: "array",
        placeholder: "University of Toronto",
        required: true,
        typeValues: [
          {
            label: "University",
            type: "text",
            placeholder: "University of Toronto",
            required: true,
            key: "university",
          },
          {
            label: "Degree",
            type: "text",
            placeholder: "Bachelors",
            required: true,
            key: "degree",
          },
          {
            label: "Major",
            type: "text",
            placeholder: "Computer Science",
            required: true,
            key: "major",
          },
          {
            label: "From Year",
            type: "text",
            placeholder: "2020",
            required: true,
            key: "fromYear",
          },
          {
            label: "To Year",
            type: "text",
            placeholder: "2024",
            required: true,
            key: "toYear",
          },
        ],
      },
      experience: {
        label: "Experience",
        type: "array",
        placeholder: "5 years",
        required: true,
        typeValues: [
          {
            label: "Company",
            type: "text",
            placeholder: "Google",
            required: true,
            key: "company",
          },
          {
            label: "Position",
            type: "text",
            placeholder: "Software Engineer",
            required: true,
            key: "position",
          },
          {
            label: "From Year",
            type: "select",
            placeholder: "2020",
            required: true,
            key: "fromYear",
          },
          {
            label: "To Year",
            type: "select",
            placeholder: "2024",
            required: true,
            key: "toYear",
          },
        ],
      },
      linkedin: {
        label: "LinkedIn",
        type: "text",
        placeholder: "https://linkedin.com/in/username",
        required: true,
        key: "linkedin",
      },
      ytVideo: {
        label: "YouTube Video(Upload a video introducing yourself)",
        type: "text",
        placeholder: "https://youtube.com/watch?v=videoId",
        required: true,
        key: "ytVideo",
      },
      extraCurricular: {
        label: "Extra Curricular",
        type: "array",
        placeholder: "Chess",
        required: true,
        typeValues: [
          {
            label: "",
            type: "text",
            placeholder: "Chess",
            required: true,
            key: "extraCurricular",
          },
        ],
        key: "extraCurricular",
      },
    },
    actions: {
      submit: {
        label: "Sign Up",
        variant: "primary",
      },
    },
  },
};
