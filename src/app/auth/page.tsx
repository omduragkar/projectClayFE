"use client";
import { useEffect, useState } from "react";
import { getEmailPhoneNumber } from "@/constants";
import { signup } from "./action";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { RoleEnum } from "@/constants/enum/role";
import userStore, { IUserStore } from "@/store/user";
import { Card, CardContent } from "@/components/ui/card";
import RoleChecker from "@/components/auth/RoleChecker";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<RoleEnum>(RoleEnum.STUDENT);
  const link = useRouter();
  const searchParams = useSearchParams();
  const searchProjectClay = searchParams.get("searchProjectClay");
  const [testData, setTestData] = useState<{
    userId: string;
    email: string;
    mobileNumber?: string;
  }>({
    userId: "",
    email: "",
    mobileNumber: "",
  });

  const user = userStore((state: IUserStore) => state);
  const signupCallback = async (
    userInfo: {
      email: string;
      mobileNumber?: string;
      role: RoleEnum;
    },
    otplessUser: any
  ) => {
    try {
      const userInfoMap = Object.assign(userInfo, otplessUser);
      console.log({ userInfoMap, otplessUser, userInfo });
      const res = await signup(userInfoMap);
      console.log({ res });
      if (res?.error) {
        throw new Error(res.error);
      }
      if (res?.success) {
        //redirect to dashboard

        console.log("redirect to dashboard");
        user?.setUserInfo(res.data);
        user?.setSessionInfo(otplessUser.sessionInfo);
        user.setRole(res.data?.role);
        if (user?.role == RoleEnum.MENTOR) {
          link.push("/mentor/dashboard");
        } else {
          link.push("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
      toast(error?.message, {
        action: "Dismiss",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user?.userInfo &&
      user?.sessionInfo &&
      Object.keys(user?.userInfo).length > 0 &&
      Object.keys(user?.sessionInfo).length > 0
    ) {
      if (user?.role === RoleEnum.MENTOR) {
        if (!user?.isOnboarded) {
          link.push("/mentor/profile");
        } else {
          link.push("/mentor/dashboard");
        }
      } else {
        link.push("/dashboard");
      }
    }
  }, [user?.userInfo, user?.sessionInfo]);

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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader size="50" />
      </div>
    );
  }

  return (
    <Drawer>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Card className="p-6 shadow-lg bg-white min-w-[300px] overflow-y-auto">
            <h1 className="text-2xl font-bold text-center py-5">Project Clay</h1>
            <Tabs defaultValue="login" className="flex flex-col gap-4 items-center justify-center">
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signUp">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <h2 className="text-xl font-bold"> Welcome Back </h2>
                <p className="text-md font-semibold mt-2">
                  Login to your account
                </p>
              </TabsContent>
              <TabsContent value="signUp">
                <CardContent>
                  <div className="text-center">
                    <h2 className="text-xl font-bold"> Select your Journey </h2>
                    <p className="text-md text-gray-600 mt-2">
                      This journey will determine the future with us.
                    </p>
                  </div>
                  <div className="mt-4">
                    <RoleChecker
                      userType={userType}
                      setUserType={setUserType}
                    />
                  </div>

                  <p className="text-xs text-gray-600 mt-5">
                    By Clicking Continue, you agree to our Terms and Conditions
                  </p>
                </CardContent>
              </TabsContent>
              <div className="mt-4">
                {searchProjectClay ? (
                  <DrawerTrigger>
                    <Button className="flex-1 justify-between w-full">
                      <p className="text-sm font-semibold">Continue</p>
                      <ArrowRight size={16} />
                    </Button>
                  </DrawerTrigger>
                ) : (
                  <div id="otpless" data-type="SIDE_CURTAIN">
                    <Button className="flex-1 justify-between w-full">
                      <p className="text-md font-bold">Continue</p>
                      <ArrowRight size={20} />
                    </Button>
                  </div>
                )}
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
      <DrawerContent className=" bg-gray-100">
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. :)
          </DrawerDescription>
        </DrawerHeader>
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
      </DrawerContent>
    </Drawer>
  );
}
