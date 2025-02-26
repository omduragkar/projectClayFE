import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES, ICountry } from "@/constants";

function VerifyPhone({ onSignIn }: { onSignIn: () => void }) {
  const [showOTP, setShowOTP] = React.useState(false);
  const onClickSendOTP = () => {
    console.log("Send OTP");
    setShowOTP(true);
  };
  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-28">
            <Select defaultValue="+91">
              <SelectTrigger className="p-2 border border-gray-300 rounded-md">
                <SelectValue placeholder="+91" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES?.map((option: ICountry, index: number) => (
                  <SelectItem
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    value={option?.callCode}
                  >
                    {option.callCode} {option?.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            type="number"
            placeholder="Enter Phone Number"
            required
            className="w-full"
            disabled={showOTP}
            maxLength={10}
            max={10}
            min={9}
            minLength={9}
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
      {showOTP && (
        <Button onClick={onSignIn} className="w-full">
          Verify Phone
        </Button>
      )}
    </div>
  );
}

export default VerifyPhone;
