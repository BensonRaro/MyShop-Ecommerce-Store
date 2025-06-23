import { Button } from "@/components/ui/button";
import { db } from "@/drizzle";
import Link from "next/link";
import ProductCard from "@/components/global/ProductCard";

import { MdArrowRightAlt } from "react-icons/md";

const Latest = async () => {
  const AllProducts = await db.query.products.findMany({
    orderBy: (products, { asc }) => asc(products.createdAt),
    limit: 12,
  });

  const latestProducts = AllProducts.filter(
    (product) => product?.available > 0 && product?.isArchived === "true"
  );

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl md:text-3xl font-bold text-primary font-serif">
          Latest Additions
        </h1>
        <Button variant={"ghost"} size={"icon"} asChild>
          <Link href={"/shop"}>
            <MdArrowRightAlt className="size-8" />
          </Link>
        </Button>
      </div>
      {latestProducts.length > 0 ? (
        <div className="div-grid">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // <div className="flex justify-center items-center h-64">
        //   <img
        //     src="/images/empty-cart.png"
        //     alt="Empty Cart"
        //     className="w-1/2 h-auto"
        //   />
        // </div>
        <h2 className="flex justify-center items-center text-2xl text-primary italic font-extrabold">
          No Items Available
        </h2>
      )}
    </div>
  );
};

export default Latest;
