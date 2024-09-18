import { Button } from "./ui/button";
import { signInWithGoogle } from "@/app/actions/auth";
export default function SignIn() {
  return (
    <form action={signInWithGoogle}>
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}
