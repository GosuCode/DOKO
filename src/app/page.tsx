import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  // if (!session) return <div>No user sign in </div>;
  return (
    <div>
      <Button>Click Me!</Button>
      {session ? <SignOut /> : <SignIn />}
      {session?.user?.name} <br />
    </div>
  );
}
