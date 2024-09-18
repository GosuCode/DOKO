import { accountSignOut } from "@/app/actions/auth";

export function SignOut() {
  return (
    <form action={accountSignOut}>
      <button type="submit">Sign Out</button>
    </form>
  );
}
