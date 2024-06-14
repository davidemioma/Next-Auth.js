import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/auth";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import LoginBtn from "@/components/auth/LoginBtn";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default async function Home() {
  //Check if there is a current user
  const { user } = await currentUser();

  if (user) {
    return redirect("/settings");
  }

  return (
    <main className="h-full w-full bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-4 sm:p-6 space-y-6 text-center border shadow-md rounded-md">
        <h1
          className={cn(
            "text-6xl font-semibold drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>

        <p className="text-lg">A simple authentication service.</p>

        <div>
          {!user && (
            <LoginBtn mode="modal" asChild>
              <Button size="lg" variant="default">
                Sign In
              </Button>
            </LoginBtn>
          )}
        </div>
      </div>
    </main>
  );
}
