import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

function VerifyPhone({onSignIn}) {
  const [showOTP, setShowOTP] = React.useState(false);
  const onClickSendOTP = () => {
    console.log("Send OTP");
    setShowOTP(true);
  };
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Country Code"
            required
            className="w-[90px]"
            disabled={showOTP}
          />
          <Input
            type="number"
            placeholder="Enter Phone Number"
            required
            className="w-full"
            disabled={showOTP}
          />
        </div>
        <Button onClick={onClickSendOTP} disabled={showOTP}>
          Send OTP
        </Button>
      </div>
      {showOTP && (
        <div className="flex items-center justify-center py-5">
          <InputOTP maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <Button variant={"link"}>resend OTP</Button>
        </div>
      )}
      {
        showOTP && (
          <Button onClick={onSignIn} className="w-full">
            Verify Phone
          </Button>
        )
      }
    </div>
  );
}

export default VerifyPhone;
