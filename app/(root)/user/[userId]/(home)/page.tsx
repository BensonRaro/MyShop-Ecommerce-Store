import { getUser } from "@/actions/getUser";
import { Input } from "@/components/ui/input";
import CreatedAt from "@/components/user/CreatedAt";
import PickupPoint from "@/components/user/PickupPoint";

import Image from "next/image";
import { redirect } from "next/navigation";

const HomePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const id = (await params).userId;
  if (!id) {
    redirect("/");
  }
  const user = await getUser(id);
  if (!user.ok) {
    redirect("/");
  }
  return (
    <div className="block lg:flex lg:gap-20">
      <div className="flex lg:flex-col justify-center items-center">
        <div className="p-1.5 border-4 rounded-full size-32">
          <Image
            src={user.user?.image || ""}
            height={100}
            width={100}
            alt={user.user?.name || ""}
            className="rounded-full size-full"
          />
        </div>
      </div>
      <div className="space-y-4 w-full mt-16">
        <h1 className="font-bold text-xl">Your Profile</h1>
        <div className="flex justify-between gap-4">
          <span className="w-full">
            <p className="font-semibold text-lg">Name</p>
            <Input disabled value={user.user?.name} />
          </span>
          <span className="w-full">
            <p className="font-semibold text-lg">Role</p>
            <Input disabled value={user.user?.role} />
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="w-full">
            <p className="font-semibold text-lg">Email</p>
            <Input disabled value={user.user?.email || ""} />
          </span>
          <span className="w-full">
            <p className="font-semibold text-lg">Created At</p>
            <CreatedAt createdAt={user.user?.createdAt} />
          </span>
        </div>
        <PickupPoint pickupPoint={user.user?.pickupPoint || ""} />
      </div>
    </div>
  );
};

export default HomePage;
