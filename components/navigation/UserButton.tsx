import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdDashboard, MdLogout } from "react-icons/md";

const UserButton = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();
  const session = authClient.useSession();
  const user = session.data?.user;

  const handleLogout = async () => {
    router.push("/");
    await authClient.signOut();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-10 items-center rounded-xl cursor-pointer">
          <AvatarImage src={user?.image || ""} alt="avatar" />
          <AvatarFallback className="rounded-xl">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 bg-card z-[70] border-none">
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => router.push(`/admin/${session.data?.user?.id}`)}
            className="cursor-pointer"
          >
            <MdDashboard className="size-6 mr-2" />
            <span className="font-bold">Admin Dashboard</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => router.push(`/user/${session.data?.user?.id}`)}
          className="cursor-pointer"
        >
          <MdDashboard className="size-6 mr-2" />
          <span className="font-bold">User Dashboard</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => router.push("/orders")}
          className="cursor-pointer"
        >
          <BsFillCartCheckFill className="size-6 mr-2" />
          <span className="font-bold">View Orders</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <MdLogout className="size-6 mr-2" />
          <span className="font-bold">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
