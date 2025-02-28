import { AuthButton } from "@/components/common/FieldForm";

export default function Home() {
  return (
    <div className="container items-center justify-center flex h-screen mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold">ProjectClay</h1>
        <div className="mt-4">
          <AuthButton>
            Get Started
          </AuthButton>
        </div>
      </div>
    </div>
  );
}
