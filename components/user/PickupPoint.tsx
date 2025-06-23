"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upateUser } from "@/actions/updateUser";

const PickupPoint = ({ pickupPoint }: { pickupPoint: string }) => {
  const [pending, startTranstion] = useTransition();

  const onChange = (value: string) => {
    if (!value) return;
    startTranstion(async () => {
      const updatedUser = await upateUser(value);
      if (updatedUser?.ok) {
        toast.success("User Pickup Point Updated");
      }
    });
  };
  return (
    <>
      <p className="font-semibold text-lg">Pickup Point</p>
      <Select
        disabled={pending}
        defaultValue={pickupPoint}
        required
        onValueChange={(value) => onChange(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Please Select a Pickup Point" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="City Center Pickup">City Center Pickup</SelectItem>
          <SelectItem value="Suburban Hub">Suburban Hub</SelectItem>
          <SelectItem value="Campus Locker">Campus Locker</SelectItem>
          <SelectItem value="Warehouse Collection">
            Warehouse Collection
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default PickupPoint;
