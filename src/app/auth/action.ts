"use server";
import { createClient } from "@/constants/utils/supabase/server";

export async function login(userId: string) {
  const supabase = await createClient();
  const { error, data } = await supabase
    .from("users")
    .select()
    .eq("authUserId", userId);
  if (error) {
    return {
      success: false,
      error: "Error fetching user",
    };
  }
  return {
    success: true,
    data: data,
  };
}

export async function signup({
  email,
  mobileNumber,
  userId,
  role,
}: {
  email: string;
  mobileNumber: string;
  userId: string;
  role: string;
}) {
  const supabase = await createClient();

  console.log({ email, mobileNumber, userId, role });

  if (userId) {
    await supabase.from("users").insert([
      {
        email,
        mobileNumber,
        authUserId: userId,
        role,
      },
    ]);

    const checkLogin = await login(userId);
    if (checkLogin.success) {
      return {
        success: true,
        data: checkLogin.data?.at(0),
      };
    } else {
      return {
        success: false,
        error: "Error fetching user",
      };
    }
  } else {
    return {
      success: false,
      error: "User Error Pl try again",
    };
  }
}

export async function getSessionDetails({
  sessionToken,
}: {
  sessionToken: string;
}) {
  const clientId = "SPKOYZRAJ3FB6H62KVAQSX9ILDPVSIIB";
  const clientSecret = "us0tvce70c7m9gm3psiikz7i9n87i3v5";
  const options = {
    method: "POST",
    headers: { clientId, clientSecret, "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionToken,
    }),
  };
  fetch(
    "https://user-auth.otpless.app/v1/sessions/get-session-details",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

export const validateSession = async ({
  sessionToken,
}: {
  sessionToken: string;
}) => {
  const clientId = "SPKOYZRAJ3FB6H62KVAQSX9ILDPVSIIB";
  const clientSecret = "us0tvce70c7m9gm3psiikz7i9n87i3v5";
  const options = {
    method: "POST",
    headers: { clientId, clientSecret, "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionToken,
    }),
  };
  try {
    const response = await (
      await fetch(
        "https://user-auth.otpless.app/v1/sessions/validate-session",
        options
      )
    ).json();
    console.log(response);
    return {
      success: true,
      login: true,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      login: false,
    };
  }
};
