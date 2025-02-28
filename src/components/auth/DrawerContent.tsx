import React from "react";
import { DrawerClose, DrawerFooter } from "../ui/drawer";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function DrawerAuthTestContent({
    testData,
    setTestData,
    signupCallback,
    userType,
    }: {
    testData: {
        userId: string;
        email: string;
        mobileNumber?: string;
    };
    setTestData: (data: any) => void;
    signupCallback: (userInfo: any, otplessUser: any) => void;
    userType: string;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 gap-5">
        <Input
          placeholder="Type Email"
          value={testData?.email}
          onChange={(e) => {
            setTestData({
              ...testData,
              email: e.target.value,
              userId: testData?.userId || "",
            });
          }}
        />
        <Input
          placeholder="Type Id"
          value={testData?.userId}
          onChange={(e) => {
            setTestData({
              ...testData,
              userId: e.target.value,
              email: testData?.email || "",
            });
          }}
        />
        <Input
          placeholder="Type Number"
          value={testData?.mobileNumber}
          onChange={(e) => {
            setTestData({
              ...testData,
              mobileNumber: e.target.value,
              userId: testData?.userId || "",
              email: testData?.email || "",
            });
          }}
        />
      </div>
      <DrawerFooter>
        <Button
          onClick={() => {
            console.log(testData);
            signupCallback(
              {
                email: testData?.email || "",
                mobileNumber: testData?.mobileNumber || "",
                role: userType,
              },
              {
                userId: testData?.userId || "",
              }
            );
          }}
        >
          Submit
        </Button>
        <DrawerClose>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}

export default DrawerAuthTestContent;
