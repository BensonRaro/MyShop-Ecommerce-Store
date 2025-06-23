import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getUser } from "@/actions/getUser";

import { useEffect, useState } from "react";
import Image from "next/image";

const UserDetails = ({ userId }: { userId: string }) => {
  const [profile, setProfile] = useState<user | undefined>();

  useEffect(() => {
    const user = async () => {
      if (!userId) return;
      const userData = await getUser(userId);
      if (userData.ok) {
        setProfile(userData.user);
      }
    };
    user();
  }, [userId]);

  return (
    <Dialog>
      <DialogTrigger>
        <Button>User Details</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              width={200}
              height={200}
              src={profile?.image || ""}
              alt={profile?.name || ""}
              className="size-12 rounded-md"
            />
            <h2 className="text-2xl font-bold tracking-wide">
              {profile?.name}
            </h2>
            <h2 className="text-xl font-semibold tracking-tight">
              {profile?.email}
            </h2>
            {/* <h2>{profile?.}</h2> */}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;
