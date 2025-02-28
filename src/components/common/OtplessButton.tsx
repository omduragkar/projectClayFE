import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { getEmailPhoneNumber } from "@/constants";

function OtplessButton({
  signupCallback,
  userType,
  setLoading,
}: {
  signupCallback: (userInfo: any, otplessUser: any) => void;
  userType: string;
  setLoading: (loading: boolean) => void;
}) {
  useEffect(() => {
    window.otpless = (otplessUser) => {
      setLoading(true);
      const userInfo = getEmailPhoneNumber(otplessUser);
      signupCallback(
        {
          email: userInfo.email,
          mobileNumber: userInfo.mobileNumber,
          role: userType,
        },
        otplessUser
      );
    };
  }, [signupCallback, userType, setLoading]);
  return (
    <div id="otpless" data-type="SIDE_CURTAIN">
      <Button className="flex-1 justify-between w-full">
        <p className="text-md font-bold">Continue</p>
        <ArrowRight size={20} />
      </Button>
    </div>
  );
}

export default OtplessButton;
