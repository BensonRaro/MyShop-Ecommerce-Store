import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Filters from "@/components/shop/Filters";
import { Button } from "@/components/ui/button";

import { RiFlaskFill } from "react-icons/ri";

const MobileFilter = ({ products }: { products: product[] }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon">
          <RiFlaskFill className="mr-2" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Filters products={products} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilter;
