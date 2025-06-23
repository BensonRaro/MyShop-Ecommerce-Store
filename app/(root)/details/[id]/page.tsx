import ItemDetails from "@/components/details";
import { db } from "@/drizzle";

import { redirect } from "next/navigation";

const DetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.id, id),
  });

  if (!product) {
    redirect("/");
  }
  return (
    <div className="py-6 p-5 border mt-6 mb-10 rounded-md shadow-xl">
      <div className="mt-6 rounded-lg mb-4 md:mb-12 flex">
        <ItemDetails product={product} />
      </div>
    </div>
  );
};

export default DetailsPage;
