import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container items-center justify-center flex h-screen">
      <Link href="/auth">
        <Button>
          <p className="text-2xl font-semibold p-3 ">Go to Auth</p>
        </Button>
      </Link>
    </div>
  );
}
