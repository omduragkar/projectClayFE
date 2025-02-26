"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import VerifyPhone from "@/components/auth/VerifyPhone";
import RoleChecker from "@/components/auth/RoleChecker";

export default function AuthPage() {
  const [userType, setUserType] = useState("STUDENT");
  const link = useRouter();
  const [journeyIndex, setJourneyIndex] = useState(0);

  const onSignIn = async () => {
    //sign in logic
    console.log("Sign In", userType);
    if (userType.toLowerCase() === "student") {
      //redirect to mentor dashboard
      link.push("/user/data");
    } else {
      link.push("/questionnare");
    }
  };

  const JOURNEY = [
    {
      id: 1,
      title: "Student, parent or Mentor",
      action: ({ onclick }) => (
        <>
          <Button onClick={onclick} className="w-full justify-center">
            <p className="text-md font-bold">Continue with Google</p>
            <FcGoogle width={24} height={24} />
          </Button>
          <div className="flex gap-1 items-center justify-center">
            <p className="text-center text-black text-lg font-semibold">
              to Start
            </p>
            <p className="text-center text-yellow-400 text-lg font-semibold">
              your Journey
            </p>
          </div>
          <p className="text-center text-gray-500 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </>
      ),
      component: <></>,
    },
    {
      id: 2,
      title: "Choose your Journey",
      component: <RoleChecker userType={userType} setUserType={setUserType} />,
      action: "Continue",
    },
    {
      id: 3,
      title: "Verify Phone Number",
      action: "",
      component: <VerifyPhone onSignIn={onSignIn} />,
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white">
        <div
          className={`flex items-center gap-2 ${
            journeyIndex == 0 ? "justify-center" : "justify-start"
          }`}
        >
          {journeyIndex != 0 && (
            <button
              onClick={() => setJourneyIndex(journeyIndex - 1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft />
            </button>
          )}
          <p className="flex text-2xl font-semibold py-5">
            {JOURNEY[journeyIndex].title}
          </p>
        </div>
        <CardContent className="p-6">
          <div className="space-y-4 flex flex-col gap-4">
            {JOURNEY[journeyIndex].component}
            {!!JOURNEY[journeyIndex]?.action &&
              JOURNEY[journeyIndex]?.action !== "" &&
              (typeof JOURNEY[journeyIndex].action === "string" ? (
                <Button
                  onClick={() => setJourneyIndex(journeyIndex + 1)}
                  className="w-full justify-between"
                >
                  <p className="text-md font-semibold">
                    {JOURNEY[journeyIndex].action}
                  </p>
                  <ArrowRight />
                </Button>
              ) : (
                JOURNEY[journeyIndex].action({
                  onclick: () => setJourneyIndex(journeyIndex + 1),
                })
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
