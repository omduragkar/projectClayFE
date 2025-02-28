import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { getEmailPhoneNumber } from "@/constants";
import { DrawerTitle } from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import DrawerAuthTestContent from "../auth/DrawerContent";
interface OtplessUser {
  // Define the properties of OtplessUser based on the expected structure
}

interface UserInfo {
  email: string;
  mobileNumber: string;
}

interface OtplessButtonProps {
  signupCallback: (userInfo: UserInfo, otplessUser: OtplessUser) => void;
  userType: RoleEnum;
  setLoading: (loading: boolean) => void;
  searchProjectClay: boolean;
  testData: any;
  setTestData: (data: any) => void;
}
import { RoleEnum } from "@/constants/enum/role";
import { initOTPless } from "@/utils/initOtpless";

const OtplessButton: React.FC<OtplessButtonProps> = ({
  signupCallback,
  userType,
  setLoading,
  searchProjectClay,
  testData,
  setTestData,
}) => {
  function otplessCallback(otplessUser: OtplessUser) {
    setLoading(true);
    const userInfo: UserInfo = getEmailPhoneNumber(otplessUser);
    signupCallback(
      {
        email: userInfo.email,
        mobileNumber: userInfo.mobileNumber,
        role: userType as RoleEnum,
      },
      otplessUser
    );
  }
  useEffect(() => {
    (window as any).otpless = otplessCallback;
    initOTPless(otplessCallback);
  }, []);
  console.log({ searchProjectClay });

  return (
    <div id="otpless" data-type="SIDE_CURTAIN">
      <Dialog defaultOpen={false} modal>
        {searchProjectClay ? (
          <></>
        ) : (
          <Button>
            <p className="text-md font-bold">Continue</p>
            <ArrowRight size={20} />
          </Button>
        )}
        <DialogContent>
          <DialogHeader>
            <DrawerTitle></DrawerTitle>
          </DialogHeader>
          {!!searchProjectClay ? (
            <DrawerAuthTestContent
              setTestData={setTestData}
              signupCallback={signupCallback}
              testData={testData}
              userType={userType}
            />
          ) : (
            <></>
          )}
        </DialogContent>
        {searchProjectClay && (
          <DialogTrigger
            className="flex justify-between w-full"
            onClick={() => {
              document.getElementById("otplessBtn")?.click();
            }}
          >
            Continue
          </DialogTrigger>
        )}
      </Dialog>
    </div>
  );
};

export default OtplessButton;
