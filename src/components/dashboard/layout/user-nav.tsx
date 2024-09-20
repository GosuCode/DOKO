"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
export function UserNav() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
            />
            <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </>
    );
  }
}
