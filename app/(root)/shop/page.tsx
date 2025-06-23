import { getProducts } from "@/actions/GetProducts";
import ProductCard from "@/components/global/ProductCard";
import Filters from "@/components/shop/Filters";
import Pagination from "@/components/shop/Pagination";
import ShopHeader from "@/components/shop/ShopHeader";
import { db } from "@/drizzle";

import { Suspense } from "react";

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    sort: string;
    category: string;
    color: string;
    size: string;
    q: string;
    page: number;
  }>;
}) => {
  const params = await searchParams;
  const pageSize = 12;
  const { category, color, page, q, size, sort } = params;
  const products = await getProducts(
    page,
    pageSize,
    category,
    size,
    color,
    q,
    sort
  );
  const allProducts = await db.query.products.findMany();
  return (
    <div className="space-y-4 mb-4">
      <Suspense>
        <ShopHeader products={products} />
      </Suspense>
      {/* filters */}
      <div>
        <div className="md:w-[250px] lg:w-[280px] xl:w-[300px] hidden md:block fixed overflow-x-auto">
          <Filters products={products} />
        </div>
        {products.length === 0 ? (
          <h1 className="text-primary text-2xl font-bold flex justify-center items-center">
            No Products Found!
          </h1>
        ) : (
          <div className="shop-grid">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
      {/* pagination */}
      {allProducts.length > 12 && (
        <Pagination noOfProducts={allProducts.length} pageSize={pageSize} />
      )}
    </div>
  );
};

export default ShopPage;
