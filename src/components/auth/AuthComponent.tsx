"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RoleEnum } from "@/constants/enum/role";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import RoleChecker from "@/components/auth/RoleChecker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import userStore, { IUserStore } from "@/store/user";
import { signup } from "@/app/auth/action";
import OtplessButton from "../common/OtplessButton";

export default function AuthBasedComponent() {
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
  const signupCallback = useCallback(
    async (
      userInfo: {
        email: string;
        mobileNumber?: string;
        role: RoleEnum;
      },
      otplessUser: { sessionInfo: string }
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
        toast((error as Error)?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [link, user]
  );

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Loader size="50" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="p-6 shadow-lg bg-white min-w-[300px] overflow-y-auto">
          <h1 className="text-2xl font-bold text-center py-5">Project Clay</h1>
          <Tabs
            defaultValue="login"
            className="flex flex-col gap-4 items-center justify-center"
          >
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
                  <RoleChecker userType={userType} setUserType={setUserType} />
                </div>

                <p className="text-xs text-gray-600 mt-5">
                  By Clicking Continue, you agree to our Terms and Conditions
                </p>
              </CardContent>
            </TabsContent>
            <div className="mt-4">
              <OtplessButton
                setLoading={setLoading}
                userType={userType}
                signupCallback={signupCallback}
                searchProjectClay={searchProjectClay}
                testData={testData}
                setTestData={setTestData}
              />
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
