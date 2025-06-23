import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartCard from "@/components/cart/CartCard";
const OrderedItems = ({ items }: { items: cart[] }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>View Ordered Items</Button>
      </DialogTrigger>
      <DialogContent className="min-w-2xl lg:min-w-4xl">
        <DialogHeader>
          <DialogTitle>Items Ordered</DialogTitle>
          <ScrollArea className="max-h-[70vh] w-full">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-lg w-full justify-between my-3 p-4 shadow-md sm:flex block"
              >
                <CartCard item={item} use="order" />
              </div>
            ))}
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderedItems;
